const Order = require("../models/orders");
const Enquiry = require("../models/enquiry");
const Address = require("../models/address");
const { validateObjectId } = require("../utils/validation");
const mongoose = require("mongoose");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
// const jsPDF = require("jspdf");
// require("jspdf-autotable");
// const converter = require("number-to-words");
const PDFDocument = require("pdfkit");
exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userid")
      .populate({
        path: "items.productId",
        populate: [
          { path: "brand", model: "Brand" },
          { path: "category", model: "Category" },
        ],
      });
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    // console.log(orders)
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { selectedMonth, year } = req.query;
    const month = parseInt(selectedMonth, 10); // Month is passed as a number (1-12)
    const yearInt = parseInt(year, 10);

    // Validate inputs
    if (isNaN(month) || isNaN(yearInt)) {
      return res.status(400).json({ message: "Invalid Month or Year" });
    }

    // Calculate start and end of the month
    const startOfMonth = new Date(yearInt, month - 1, 1); // Start of the selected month
    const endOfMonth = new Date(yearInt, month, 0); // End of the selected month

    // Fetch orders for the selected month
    const orders = await Order.find({
      orderDate: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .populate("userid", "firstname email")
      .exec();

    // If no orders found, send a 405 status and stop execution
    if (orders.length === 0) {
      return res
        .status(405)
        .json({ message: "No orders found for the selected month/year" });
    }

    // Map orders into report data
    const reportData = orders.map((order) => ({
      orderId: order._id.toString(),
      CostomerName: order.userid ? order.userid.firstname : "Unknown",
      Email: order.userid ? order.userid.email : "Unknown",
      Total: order.price,
      type: order.type,
      paymentTerm: order.paymentTerm,
      status: order.status,
      items: order.items.length, // Count of items in the order
      orderDate: order.orderDate.toISOString().split("T")[0], // Format the date
    }));

    // Generate Excel file
    const ws = xlsx.utils.json_to_sheet(reportData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Monthly Report");
    const fileBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set response headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report_${selectedMonth}-${year}.xlsx`
    );
    res.send(fileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      userid: new mongoose.Types.ObjectId(userId),
    });
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id).populate("userid");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { items, address, type, paymentTerm, price } = req.body;
    const userId = req.user.id;

    // Validate input fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid or empty items array" });
    }
    if (!address || !type || !paymentTerm || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validPaymentTypes = ["UPI", "Card", "Cash"];
    if (!validPaymentTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid payment type" });
    }

    // Fetch address details by ID
    const addressData = await Address.findById(address);
    if (!addressData) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Create the order object with full address details
    const orderData = {
      userid: userId,
      price,
      address: {
        firstName: addressData.firstName,
        lastName: addressData.lastName,
        addressLine1: addressData.addressLine1,
        addressLine2: addressData.addressLine2,
        city: addressData.city,
        state: addressData.state,
        country: addressData.country,
        zipCode: addressData.zipCode,
      },
      type,
      paymentTerm,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productImg: item.productImg,
        variant: {
          hsn: item.variant.hsn,
          name: item.variant.name,
          price: item.variant.price,
          qty: item.variant.qty,
          tax: item.variant.tax,
        },
        totalPrice: item.totalPrice,
      })),
    };

    // Save the order
    const order = new Order(orderData);
    await order.save();

    // Handle payment type specific logic
    switch (type) {
      case "UPI":
        // UPI payment processing logic here
        break;
      case "Card":
        // Card payment processing logic here
        break;
      case "Cash":
        order.status = "Pending Payment";
        await order.save();
        break;
    }

    // Send response
    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

exports.addEnquiry = async (req, res) => {
  try {
    const { name, email, phone, productName, details } = req.body;
    const enquiry = new Enquiry({
      name,
      email,
      phone,
      productName,
      details,
    });
    await enquiry.save();
    res.status(200).json({ message: "Enquiry added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add enquiry" });
  }
};
exports.getEnquiry = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    console.log(id, status);
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to update enquiry" });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
};

exports.download = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("userid");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create PDF Document
    const doc = new PDFDocument();

    // Set Response Headers
    res.setHeader(
      "Content-disposition",
      `attachment; filename=Invoice_${orderId}.pdf`
    );
    res.setHeader("Content-type", "application/pdf");

    // Pipe PDF Document to Response
    doc.pipe(res);

    // Content of the PDF
    doc.rect(5, 5, 200, 287);
    doc.lineWidth(0.5);
    const logoPath = path.join(__dirname, "../img/logo1.png");
    doc.image(logoPath, 15, 10, { width: 30, height: 30 });
    doc.fontSize(16).text("Invoice", 155, 20);
    doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString()}`, 155, 25);
    doc.text(`OL: ${order._id.slice(-5)}`, 155, 30);
    doc.line(10, 45, 200, 45);
    doc.text("Consignee (Buyer)", 15, 55);
    doc
      .font("Helvetica-Bold")
      .text(`${order.userid.firstname} ${order.userid.lastname}`, 15, 60);
    doc.text(`${order.userid.phone}`, 15, 65);
    doc.text(`${order.userid.email}`, 15, 70);
    doc.text(`GST No: ${order.userid.gst || "N/A"}`, 15, 75);

    doc.font("Helvetica").text("Consignee (Ship to)", 75, 55);
    doc
      .font("Helvetica-Bold")
      .text(`${order.address.firstName} ${order.address.lastName}`, 75, 60);
    doc.text(`${order.address.addressLine1}`, 75, 65);
    doc.text(`${order.address.addressLine2 || ""}`, 75, 70);
    doc.text(`${order.address.city}, ${order.address.state}`, 75, 75);
    doc.text(`${order.address.zipCode}, ${order.address.country}`, 75, 80);

    doc.font("Helvetica").text("Payment Details", 135, 55);
    doc
      .font("Helvetica-Bold")
      .text(`Payment Terms: ${order.paymentTerm}`, 135, 60);
    doc.text(`Paid Through: ${order.type || "N/A"}`, 135, 65);
    doc.text(`Total: Rs.${order.price.toFixed(2)}`, 135, 70);
    doc.text(
      `Order Date: ${order.orderDate.toISOString().split("T")[0]}`,
      135,
      75
    );

    doc.lineWidth(0.5);
    doc.line(70, 50, 70, 82);
    doc.line(130, 50, 130, 82);
    doc.line(10, 83, 200, 83);

    // Table Headers and Data
    const tableHeaders = [
      "Sr.No",
      "Products",
      "Variants",
      "HSN",
      "Quantity",
      "Tax (%)",
      "Amount (INR)",
    ];
    const tableData = order.items.map((item, index) => [
      index + 1,
      item.productName,
      item.variant.name,
      item.variant.hsn,
      item.variant.qty,
      item.variant.tax,
      item.totalPrice.toFixed(2),
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 85,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });

    const totalAmountInWords = "One Thousand";
    doc
      .font("Helvetica")
      .text(
        `Total (in words): ${totalAmountInWords} Only`,
        15,
        doc.lastAutoTable.finalY + 10
      );
    doc
      .fontSize(14)
      .text(
        `Total Amount: Rs.${order.price.toFixed(2)}`,
        15,
        doc.lastAutoTable.finalY + 20
      );

    const footerY = 270;
    doc.line(10, footerY - 6, 200, footerY - 6);
    doc.fontSize(12).text("Remarks:", 10, footerY);
    doc.text("Thank you for your business!", 10, footerY + 5);
    doc.text(`${new Date().toLocaleDateString()}`, 10, footerY + 10);
    doc.text("Company Name", 140, footerY);
    doc.text("Address Line 1", 140, footerY + 5);
    doc.text("Address Line 2", 140, footerY + 10);
    doc.text("Contact: +91-1234567890", 140, footerY + 15);
    doc.text("Email: contact@company.com", 140, footerY + 20);

    // Finalize the PDF and Response
    doc.end();

    // Ensure no further writes after this
  } catch (error) {
    console.error("PDF Generation Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to download" });
    }
  }
};
