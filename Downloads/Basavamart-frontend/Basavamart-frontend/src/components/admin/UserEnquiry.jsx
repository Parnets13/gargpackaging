import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gst: "",
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  console.log("enquiries : ",enquiries)
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
          <Tooltip title="Add Member" placement="left" arrow>
            <IconButton
              onClick={() => handleAdd(params.row)}
              color="success"
              size="small"
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
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
      field: "firstname",
      headerName: "FirstName",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "lastname",
      headerName: "LastName",
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
      field: "gst",
      headerName: "GST Number",
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

  const handleAdd = (record) => {
    setSelectedRequest(record._id);
    setShowModal(true);
    setNewUser(record);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...newUser,
        password,
        role,
      };
      const response = await axios.post(
        "http://localhost:3003/api/auth/adduser",
        data
      );
      if (response.status === 201) {
        toast.success("User Added");
        setShowModal(false);
        handleDelete(selectedRequest);
        fetchEnquiry();
      } else if (response.status === 401) {
        toast.error(
          "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3003

/api/enquiry/deleteuserenquiry/${id}`
      );
      if (response.status === 200) {
        toast.success("Enquiry Deleted");
        fetchEnquiry();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEnquiry = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/enquiry/getuserenquiry"
      );
      if (response.status === 200) {
        const data = response.data;
        setEnquiries(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, []);

  return (
    <Paper
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" color="black" gutterBottom>
        Member Requests
      </Typography>
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
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Add Member</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              fullWidth
              variant="outlined"
              value={newUser.firstname}
              required
            />
            <TextField
              margin="dense"
              name="lastname"
              label="Last Name"
              fullWidth
              variant="outlined"
              value={newUser.lastname}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={newUser.email}
              required
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={newUser.phone}
              required
            />
            <TextField
              margin="dense"
              name="gst"
              label="GST Number"
              type="text"
              fullWidth
              variant="outlined"
              value={newUser.gst}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="specialMember">Special Member</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};

export default UserEnquiry;
