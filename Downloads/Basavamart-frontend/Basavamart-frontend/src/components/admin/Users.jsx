import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import { Card, CardContent, Typography, Tooltip, InputAdornment } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function Users() {
  const [value, setValue] = useState("users")
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [newRecord, setNewRecord] = useState({
    _id: null,
    firstname: "",
    lastname: "",
    companyName: "",
    logo: "",
    phone: "",
    gst: "",
    email: "",
    password: "",
    role: "",
  })
  const [isEdit, setIsEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [userCount, setUserCount] = useState(0)
  const [memberCount, setMemberCount] = useState(0)
  const [specialMemberCount, setSpecialMemberCount] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [logo, setLogo] = useState(null)
  const [role, setRole] = useState("")

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
    setDeleteId(null)
  }

  const handleDeleteModal = (id) => {
    setDeleteId(id)
    setDeleteModal(true)
  }
  const memberColumns = [
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit" placement="left" arrow>
            <IconButton sx={{ color: "#F17D01" }} aria-label="edit" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton color="error" aria-label="delete" onClick={() => handleDeleteModal(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "logo",
      headerName: "Company logo",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <img
            src={`http://localhost:3003

${params.value}`}
            alt="Logo"
            style={{
              width: "90px",
              height: "75px",
              objectFit: "contain",
              borderRadius: "6px",
            }}
          />
        </Box>
      ),
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
  ]

  const fetchRecord = async (role) => {
    try {
      const response = await axios.get(`http://localhost:3003

/api/auth/getuser?role=${role}`)
      setRows(response.data)
      if (role === "user") setUserCount(response.data.length)
      if (role === "member") setMemberCount(response.data.length)
      if (role === "specialMember") setSpecialMemberCount(response.data.length)
    } catch (error) {
      console.error("Failed to fetch user data", error)
    }
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
    const role = newValue === "users" ? "user" : newValue === "members" ? "member" : "specialMember"
    fetchRecord(role)
  }

  useEffect(() => {
    fetchRecord("user")
  }, [])

  const handleAddRecord = () => {
    setIsEdit(false)
    setNewRecord({
      firstname: "",
      lastname: "",
      companyName: "",
      logo: "",
      phone: "",
      gst: "",
      email: "",
      password: "",
      role: "",
    })
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("firstname", e.target.firstname.value)
    formData.append("lastname", e.target.lastname.value)
    formData.append("companyName", e.target.companyName.value)
    formData.append("phone", e.target.phone.value)
    formData.append("email", e.target.email.value)
    formData.append("gst", e.target.gst.value)
    formData.append("password", e.target.password.value)
    formData.append("role", role)
    if (logo) {
      formData.append("logo", logo)
    }
    try {
      if (isEdit) {
        try {
          const response = await axios.put(`http://localhost:3003

/api/auth/updateuser/${newRecord._id}`, formData)
          setRows((prevRows) => prevRows.map((row) => (row._id === newRecord._id ? response.data : row)))
          toast.success("User Updated Successfully")
          handleClose()
        } catch (error) {
          toast.error(error.response.data.message)
        }
      } else {
        try {
          console.log(formData)
          const response = await axios.post("http://localhost:3003/api/auth/adduser", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          if (response.status === 201) {
            toast.success("User added successfully")
            handleClose()
          } else if (response.status === 401) {
            toast.warning(
              "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.",
            )
          } else {
            setRows((prevRows) => [...prevRows, response.data])
            handleClose()
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      fetchRecord(value === "users" ? "user" : value === "members" ? "member" : "specialMember")
    } catch (error) {
      console.error("Failed to save record", error)
    }
  }

  const handleLogo = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setLogo(selectedFile)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRole((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (record) => {
    setIsEdit(true)
    setCurrentUser(record)
    setNewRecord(record)
    setOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3003

/api/auth/deleteuser/${id}`)
      if (response.status === 200) {
        toast.success("User deleted successfully")
        handleCloseDeleteModal()
      }
      fetchRecord("user")
      fetchRecord("member")
      fetchRecord("specialMember")
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  return (
    <>
      <ToastContainer />
      <Box display="flex" mb={1} justifyContent="space-around">
        <Card
          sx={{
            width: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D0D0D0",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Total Users
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {specialMemberCount + userCount + memberCount}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D0D0D0",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Active users
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {userCount}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D0D0D0",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Members
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {memberCount}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D0D0D0",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Special Members
            </Typography>
            <Typography variant="h4" sx={{ color: "black" }}>
              {specialMemberCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              color: "black",
            },
            "& .Mui-selected": {
              color: "#F17D01",
              fontWeight: "bold",
            },
          }}
        >
          <Tab
            value="users"
            label="Users"
            sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
            icon={<AccountCircleOutlinedIcon />}
          />
          <Tab
            value="members"
            label="Members"
            sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
            icon={<AdminPanelSettingsOutlinedIcon />}
          />
          <Tab
            value="specialMembers"
            label="Special Members"
            sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
            icon={<StarBorderPurple500OutlinedIcon />}
          />
        </Tabs>
      </Box>
      <Box display="flex" justifyContent="flex-start" m={1}>
        {/* Commented out Add Record button as requested */}
        {/* <Button
          variant="contained"
          onClick={handleAddRecord}
          sx={{ backgroundColor: "#F17D01" }}
        >
          Add Record
        </Button> */}
      </Box>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={memberColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          sx={{
            color: "black",
          }}
          hideFooter
          disableRowSelectionOnClick
        />
      </Box>

      {/* Modal for Adding/Editing Record */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Record" : "Add Record"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              fullWidth
              variant="outlined"
              defaultValue={currentUser ? currentUser.firstname : ""}
              required
            />
            <TextField
              margin="dense"
              name="lastname"
              label="Last Name"
              fullWidth
              variant="outlined"
              defaultValue={currentUser ? currentUser.lastname : ""}
              required
            />
            <TextField
              margin="dense"
              name="companyName"
              label="Company Name"
              fullWidth
              variant="outlined"
              defaultValue={currentUser ? currentUser.companyName : ""}
            />
            <input type="file" name="logo" accept="image/*" onChange={handleLogo} />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              defaultValue={currentUser ? currentUser.email : ""}
              required
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              defaultValue={currentUser ? currentUser.phone : ""}
              required
            />
            <TextField
              margin="dense"
              name="gst"
              label="GST Number"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={currentUser ? currentUser.gst : ""}
            />
            <TextField
              name="password"
              margin="dense"
              label="Password"
              fullWidth
              variant="outlined"
              type={showPassword ? "text" : "password"}
              defaultValue={currentUser ? currentUser.password : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={role} onChange={(e) => setRole(e.target.value)} label="Role" required>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="specialMember">Special Member</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {isEdit ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={deleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteId)} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Users

