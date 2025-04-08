import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  MenuItem,
  Select,
  IconButton,
  CardContent,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import converter from "number-to-words";
import { DataGrid } from "@mui/x-data-grid";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0,
  });

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
              onClick={() => handleEdit(params.row)}
              sx={{ color: "#DE5613" }}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Download" arrow>
            <IconButton
              onClick={() => download(params.row.productName)}
              sx={{ color: "#DE5613" }}
              size="small"
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Delete" placement="right" arrow>
            <IconButton
              onClick={() => handleDelete(params.row._id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
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
      headerName: "ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    
  ];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(enquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([excelBuffer]), "enquiries.xlsx");
  };

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get("http://localhost:3003/api/order/getenquiry");
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setStatus(enquiry.status);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003

/api/order/deleteenquiry/${id}`);
      setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(
        `http://localhost:3003/api/order/updateenquiry/${selectedEnquiry._id}`,
        {
          status,
        }
      );
      setEnquiries(
        enquiries.map((enquiry) =>
          enquiry._id === selectedEnquiry._id ? { ...enquiry, status } : enquiry
        )
      );
      setEditOpen(false);
      setSelectedEnquiry(null);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    // Calculate counts based on enquiry statuses
    const total = enquiries.length;
    const pending = enquiries.filter(
      (enquiry) => enquiry.status === "Pending"
    ).length;
    const resolved = enquiries.filter(
      (enquiry) => enquiry.status === "Resolved"
    ).length;
    const rejected = enquiries.filter(
      (enquiry) => enquiry.status === "Rejected"
    ).length;

    setCounts({ total, pending, resolved, rejected });
  }, [enquiries]);

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
        Enquiry Management
      </Typography>

      <Box display="flex" mb={3} justifyContent="space-around">
        {/* Summary Cards */}
        <Card sx={{ width: "240px", backgroundColor: "#D0D0D0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Enquiries Received
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {counts.total}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "240px", backgroundColor: "#D0D0D0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Pending Enquiries
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {counts.pending}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "240px", backgroundColor: "#D0D0D0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Resolved Enquiries
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {counts.resolved}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "240px", backgroundColor: "#D0D0D0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Rejected Enquiries
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {counts.rejected}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#DE5613" }}
        onClick={downloadExcel}
      >
        Download Enquiries
      </Button>

      <div style={{ height: 600, width: "100%", marginTop: "16px" }}>
        <DataGrid
          rows={enquiries}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row._id}
          sx={{ color: "black" }}
          hideFooter
          disableRowSelectionOnClick
        />
      </div>

      {/* Edit Status Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Enquiry Status</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Enquiries;
