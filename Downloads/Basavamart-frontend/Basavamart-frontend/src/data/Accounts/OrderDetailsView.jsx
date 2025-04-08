import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Printer, Mail } from "lucide-react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import converter from "number-to-words";
import axios from "axios";
import { getTokenFromCookie } from "../../utils/handleToken";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const token = getTokenFromCookie()

const OrderDetailsView = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const downloadInvoice = (order) => {
    const logoURL = "../img/logo1.png";
    const date = new Date().toLocaleDateString();
    const doc = new jsPDF();

    // Draw the border
    doc.rect(5, 5, 200, 287);
    doc.setLineWidth(0.5);

    // Add the logo
    doc.addImage(logoURL, "png", 15, 10, 30, 30);
    doc.setFontSize(16);
    doc.text("Invoice", 155, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${date}`, 155, 25);
    doc.text(`OL: ${order._id.slice(-5)}`, 155, 30);

    // Horizontal line after the header
    doc.line(10, 45, 200, 45);

    // Consignee (buyer) section
    // doc.setFontSize(12);
    doc.text("Consignee (Buyer)", 15, 55);
    doc.setFont("bold");
    doc.text(`${order.userid.firstname} ${order.userid.lastname}`, 15, 60);
    doc.text(`${order.userid.phone}`, 15, 65);
    doc.text(`${order.userid.email}`, 15, 70);
    doc.text(`GST No: `, 15, 75);
    doc.text(`${order.userid.gst || "N/A"}`, 15, 80);

    // Consignee (ship to) section
    doc.setFont("normal");
    doc.text("Consignee (Ship to)", 75, 55);
    doc.setFont("bold");
    doc.text(`${order.address.firstName} ${order.address.lastName}`, 75, 60);
    doc.text(`${order.address.addressLine1}`, 75, 65);
    doc.text(`${order.address.addressLine2 || ""}`, 75, 70);
    doc.text(`${order.address.city}, ${order.address.state}`, 75, 75);
    doc.text(`${order.address.zipCode}, ${order.address.country}`, 75, 80);

    // Payment details section
    doc.setFont("normal");
    doc.text("Payment Details", 135, 55);
    doc.setFont("bold");
    const orderDate = new Date(order.orderDate).toISOString().split("T")[0];
    doc.text(`Payment Terms: ${order.paymentTerm}`, 135, 60);
    doc.text(`Paid Through: ${order.type || "N/A"}`, 135, 65);
    doc.text(`Total: Rs.${order.price.toFixed(2)}`, 135, 70);
    doc.text(`Order Date: ${orderDate}`, 135, 75);

    // Vertical lines to separate the three sections
    doc.setLineWidth(0.5);
    doc.line(70, 50, 70, 82); // Between Consignee (buyer) and (ship to)
    doc.line(130, 50, 130, 82); // Between (ship to) and Payment Details

    // Horizontal line below sections
    doc.line(10, 83, 200, 83);

    // Table for order items
    const tableColumnHeaders = [
      "Sr.No",
      "Products",
      "Variants",
      "HSN",
      "Quantity",
      "Tax (%)",
      "Amount (INR)",
    ];
    const tableData = order.items.map((product, index) => [
      index + 1,
      product.productName,
      product.variant.name,
      product.variant.hsn,
      product.variant.qty,
      product.variant.tax,
      product.totalPrice.toFixed(2),
    ]);

    doc.autoTable({
      startX: 10,
      startY: 85,
      head: [tableColumnHeaders],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Total in words
    const totalAmountInWords = converter.toWords(order.price);
    doc.text(
      `Total (in words): ${totalAmountInWords} Only`,
      15,
      doc.lastAutoTable.finalY + 10
    );
    doc.setFontSize(14);
    doc.text(
      `Total Amount: Rs.${order.price.toFixed(2)}`,
      15,
      doc.lastAutoTable.finalY + 20
    );

    // Footer
    const footerStartY = 270;
    doc.line(10, footerStartY - 6, 200, footerStartY - 6);
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text("Remarks:", 10, footerStartY);
    doc.text("Thank you for your business!", 10, footerStartY + 5);
    doc.text(`${date}`, 10, footerStartY + 10);

    doc.text("Company Name", 140, footerStartY);
    doc.text("Address Line 1", 140, footerStartY + 5);
    doc.text("Address Line 2", 140, footerStartY + 10);
    doc.text("Contact: +91-1234567890", 140, footerStartY + 15);
    doc.text("Email: contact@company.com", 140, footerStartY + 20);

    // Save the PDF
    doc.save(`Invoice_${order._id}.pdf`);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/order/getOrderById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 mt-3" style={{border: "1px solid #e0e0e0", borderRadius:'9px'}}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">ORDER ID: {order._id}</span>
          <span className="text-gray-500">
            Placed on {new Date(order.orderDate).toISOString().split("T")[0]}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Status: </span>
          <span className="text-green-500">{order.status}</span>
          {/* <span className="text-gray-500">30 Jan '21</span> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Delivery Address */}
        <Card className="md:col-span-1" style={{border: "1px solid #e0e0e0", borderRadius:'18px'}}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">
              DELIVERY ADDRESS
            </h3>
            <div className="space-y-2">
              <div>
                <h6>
                  {order.address.firstName} {order.address.lastName}
                </h6>
              </div>
              <div className="text-gray-600">
                <p>
                  {order.address.addressLine1}, {order.address.addressLine2},
                  <br />
                  {order.address.city}, {order.address.state}
                  <br />
                  {order.address.zipCode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Delivery Details */}
        <Card className="md:col-span-1" style={{border: "1px solid #e0e0e0", borderRadius:'18px'}}>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-500 mb-4">
                  PAYMENT METHOD
                </h3>
                <p>{order.type}</p>
                <h3 className="text-lg font-semibold text-gray-500 mb-4">
                  PAYMENT TERMS
                </h3>
                <p>{order.paymentTerm}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    style={{ color: "white", backgroundColor: "#F27D02" }}
                    onClick={() => downloadInvoice(order)}
                  >
                    <Printer className="w-4 h-4" />
                    Print Invoice
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="md:col-span-1" style={{border: "1px solid #e0e0e0", borderRadius:'18px'}}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">
              ORDER SUMMARY
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Item(s) Quantity</span>
                <span>{order?.items.length}</span>
              </div>
              <div className="flex justify-between pt-4 border-t mt-4 font-semibold">
                <span>Grand Total</span>
                <span>₹{order?.price.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ordered Items */}
      <Card className="mt-6" style={{border: "2px solid #e0e0e0", borderRadius:'18px'}}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">ORDERED ITEMS</h3>
            <span className="text-gray-500">
              TOTAL ITEM(S): {order.items.length}{" "}
            </span>
          </div>
          {order.items.map((item) => {
            return (
              <div className="flex justify-between items-center mb-3 pb-3 border-b" style={{borderColor:'black',}}>
                <div className="flex items-center gap-4">
                  <LazyLoadImage
                    src={`http://localhost:3003

${item.productImg}`}
                    alt={item?.productName}
                    className="w-36 h-36 object-cover"
                    effect='blur'
                  />
                  <div>
                    <h4 className="font-semibold">{item?.productName}</h4>
                    <p className="text-gray-600">
                      Size: {item.variant.name} <br />
                      Quantity: {item.variant.qty}
                    </p>
                  </div>
                </div>
                <div className="text-right" >
                  <div className="font-semibold"style={{color:'black',fontSize:'18px'}}>₹{item?.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsView;
