const Order = require("../models/orders");
const Enquiry = require("../models/enquiry");
const Address = require("../models/address");
const { validateObjectId } = require("../utils/validation");
const mongoose = require("mongoose");
const xlsx = require("xlsx");
exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { selectedMonth, year } = req.query;
    const month = parseInt(selectedMonth, 10); // Month is passed as a number (1-12)
    const yearInt = parseInt(year, 10);

    if (isNaN(month) || isNaN(yearInt)) {
      return res.status(400).json({ message: "Invalid Month or Year" });
    }
    const startOfMonth = new Date(year, selectedMonth - 1, 1); // Start of the selected month
    const endOfMonth = new Date(year, selectedMonth, 0); // End of the selected month

    const orders = await Order.find({
      orderDate: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .populate("userid", "firstname email")
      .exec();

    const reportData = orders.map((order) => ({
      orderId: order._id.toString(),
      CostomerName: order.userid ? order.userid.firstname : 'Unknown',
      Email: order.userid ? order.userid.email : 'Unknown',
      price: order.price,
      type: order.type,
      paymentTerm: order.paymentTerm,
      status: order.status,
      items: order.items.length, // Count of items in the order
      orderDate: order.orderDate.toISOString().split("T")[0], // Format the date
    }));
    const ws = xlsx.utils.json_to_sheet(reportData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Monthly Report");
    const fileBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
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
    console.log(error);
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
    const order = await Order.findById(id);
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
        productId: item._id,
        productName: item.productName,
        productImg: item.productImg,
        variant: {
          sku: item.variant.sku,
          size: item.variant.size,
          price: item.variant.price,
          quantity: item.variant.quantity,
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
    const { name, email, productName, details } = req.body;
    const enquiry = new Enquiry({
      name,
      email,
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
