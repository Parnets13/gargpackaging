import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  IconButton,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";
import converter from "number-to-words";
import axios from "axios";
import { monthNameToNumber } from "../../utils/monthToNumber";
import InfoIcon from "@mui/icons-material/Info"; // Info icon import
import { getTokenFromCookie } from "../../utils/handleToken";
import { message } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = getTokenFromCookie();

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const transformedOrderData = orders.map((order) => ({
    ...order,
    productNames: order.items.map((product) => product.productName).join(", "), // Joining names
  }));

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [reportModal, setReportModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [viewOrder, setViewOrder] = useState(null);
  const [year, setYear] = useState("");

  const showReportModal = () => {
    setReportModal(true);
  };

  const handleCloseReportModal = () => {
    setReportModal(false);
  };

  const handleCloseViewModal = () => {
    setViewModal(false);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const generateReport = async () => {
    if (!selectedMonth || !year) {
      toast.error("Please select both month and year");
      return;
    }
    const monthNumber = monthNameToNumber(selectedMonth);
    try {
      const response = await axios.get(
        `http://localhost:3003

/api/order/report`,
        {
          params: { selectedMonth: monthNumber, year },
          responseType: "arraybuffer",
        }
      );
      if (response.status === 405) {
        handleCloseReportModal();
        toast.error("No Orders found for the selected Month/Year");
      } else {
        const file = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = `report_${selectedMonth}-${year}.xlsx`; // File name for download
        link.click();
        toast.success(`Report for ${selectedMonth}-${year} Genarated`);
        handleCloseReportModal();
      }
    } catch (error) {
      toast.error("No Orders found for the selected Month/Year");
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleViewRecord = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3003

/api/order/getOrderById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setViewOrder(response.data);
      setViewModal(true);
    } catch (error) {
      console.error("Failed to view record", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3003

/api/order/updateOrderStatus/${selectedOrder._id}`,
        {
          status: newStatus,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: newStatus }
            : order
        )
      );

      handleClose();
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

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
    doc.text(`GST No.- ${order.userid.gst || "N/A"}`, 15, 75);

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

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit" placement="left" arrow>
            <IconButton
              size="small"
              sx={{ color: "#F07C06" }}
              onClick={() => handleEditClick(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Invoice" arrow>
            <IconButton
              color="success"
              size="small"
              onClick={() => downloadInvoice(params.row)}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Details" arrow>
            <IconButton
              sx={{ color: "#F17D01" }}
              aria-label="info"
              onClick={() => handleViewRecord(params.row._id)} // On click, call function to show user details
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placemet="right" arrow>
            <IconButton color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "userid",
      headerName: "User Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      valueGetter: (params, row) => row.userid?.firstname,
    },
    {
      field: "productNames",
      headerName: "Product Names",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    // {
    //   field: "brand",
    //   headerName: "Brand",
    //   flex: 1,
    //   align: "center",
    //   headerAlign: "center",
    //   headerClassName: "custom-header",
    // },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      valueGetter: (params, row) =>
        row.address
          ? `${row.address?.addressLine1}, ${row.address?.addressLine2}, ${row.address?.city}, ${row.address?.state}, ${row.address?.zipCode}`
          : "No Address",
    },
    {
      field: "type",
      headerName: "Payment Type",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "paymentTerm",
      headerName: "Payment Term",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "orderDate",
      headerName: "OrderDate",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      // valueGetter: (params, row) =>
      //   row.orderDate ? row.orderDate.toISOString().split("T")[0] : " No Date",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "_id",
      headerName: "Order ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
  ];

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/order/getorder"
      );
      const data = await response.data;
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Paper
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" color="black" gutterBottom>
        Orders
      </Typography>
      <Button
        onClick={showReportModal}
        sx={{ backgroundColor: "#DF611C", color: "white" }}
      >
        Generate Report
      </Button>
      <div style={{ height: 600, width: "100%", marginTop: "24px" }}>
        <DataGrid
          rows={transformedOrderData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ color: "black" }}
          getRowId={(row) => row._id}
          hideFooter
          disableRowSelectionOnClick
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <Select value={newStatus} onChange={handleStatusChange} fullWidth>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={reportModal}
        onClose={handleCloseReportModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Generate Monthly Report
        </DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            inputProps={{ "aria-label": "Select month" }}
          >
            <MenuItem value="" disabled>
              Select Month
            </MenuItem>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
          <Select
            fullWidth
            value={year}
            onChange={handleYearChange}
            displayEmpty
            inputProps={{ "aria-label": "Select month" }}
          >
            <MenuItem value="" disabled>
              Select Year
            </MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportModal}>Cancel</Button>
          <Button onClick={generateReport} autoFocus>
            Generate
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={viewModal} onClose={handleCloseViewModal}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <strong>Order ID:</strong>
            </Grid>
            <Grid item xs={6}>
              {viewOrder?._id}
            </Grid>
            <Grid item xs={6}>
              <strong>Customer Name:</strong>
            </Grid>
            <Grid item xs={6}>
              {`${viewOrder?.address.firstName} ${viewOrder?.address.lastName}`}
            </Grid>
            <Grid item xs={6}>
              <strong>Customer Contact:</strong>
            </Grid>
            <Grid item xs={6}>
              {`${viewOrder?.userid.phone}`}
            </Grid>
            <Grid item xs={6}>
              <strong>Total Amount:</strong>
            </Grid>
            <Grid item xs={6}>
              {viewOrder?.price}
            </Grid>
            <Grid item xs={6}>
              <strong>Payment Type: </strong>
            </Grid>
            <Grid item xs={6}>
              {viewOrder?.type}
            </Grid>
            <Grid item xs={6}>
              <strong>Payment Terms:</strong>
            </Grid>
            <Grid item xs={6}>
              {viewOrder?.paymentTerm}
            </Grid>
            <Grid item xs={6}>
              <strong>Status:</strong>
            </Grid>
            <Grid item xs={6}>
              {viewOrder?.status}
            </Grid>
            <Grid item xs={6}>
              <strong>Address:</strong>
            </Grid>
            <Grid item xs={6}>
              {`${viewOrder?.address.addressLine1}, ${viewOrder?.address.addressLine2} `}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              {`${viewOrder?.address.city}, ${viewOrder?.address.state} `}
            </Grid>
            <Grid item xs={12}>
              <strong>Products Details:</strong>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Product Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Variant</strong>
                    </TableCell>
                    <TableCell>
                      <strong>HSN Code</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Price</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {viewOrder?.items.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.variant.name}</TableCell>
                      <TableCell>{product.variant.hsn}</TableCell>
                      <TableCell>{product.variant.qty}</TableCell>
                      <TableCell>{product.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={6}>
              Order Date:
            </Grid>
            <Grid item xs={6}>
              {viewOrder?.orderDate
                ? new Date(viewOrder.orderDate).toISOString().split("T")[0]
                : "N/A"}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default Orders;
