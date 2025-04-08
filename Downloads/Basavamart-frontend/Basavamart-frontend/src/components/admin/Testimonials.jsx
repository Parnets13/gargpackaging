import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Testimonials = () => {
  // Initial testimonials data
  const [testimonials, setTestimonials] = useState([]);

  // State for managing the add testimonial dialog
  const [open, setOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    position: "",
    description: "",
    rating: 1,
  });

  // Handle dialog open/close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form
    setNewTestimonial({ name: "", position: "", description: "", rating: 1 });
  };

  // Render star ratings
  const renderStarRating = (rating) => {
    return [1, 2, 3, 4, 5].map((star) =>
      star <= rating ? (
        <StarIcon key={star} sx={{ color: "#F17D01" }} />
      ) : (
        <StarBorderIcon key={star} sx={{ color: "#F17D01" }} />
      )
    );
  };

  // Add new testimonial
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/api/testimonials/add",
        newTestimonial
      );
      if (response.status === 201) {
        toast("Testimonial added successfully");
        fetchTestimonials();
        handleClose();
      }
    } catch (error) {
      toast.error("Failed to add testimonial");
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3003/api/testimonials/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Testimonial deleted successfully");
        setTestimonials(prevTestimonials => 
          prevTestimonials.filter(testimonial => testimonial._id !== id)
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete testimonial");
    }
  };
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/testimonials/fetch"
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #EF7F1B, #F17D01)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Customer Testimonials
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCommentIcon />}
          onClick={handleClickOpen}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#F17D01",
          }}
        >
          Add Testimonial
        </Button>
      </Box>

      <Grid container spacing={3}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} sm={6} md={4} key={testimonial._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "error.main",
                }}
                onClick={() => handleDeleteTestimonial(testimonial._id)}
              >
                <DeleteIcon />
              </IconButton>
              <CardContent sx={{ flexGrow: 1 }}>
                <FormatQuoteIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 40,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", mb: 2 }}
                >
                  "{testimonial.description}"
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.position}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  {renderStarRating(testimonial.rating)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Testimonial Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a Testimonial</DialogTitle>
        <form onSubmit={handleAddTestimonial}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              required
              variant="outlined"
              value={newTestimonial.name}
              onChange={(e) =>
                setNewTestimonial({
                  ...newTestimonial,
                  name: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Position"
              fullWidth
              variant="outlined"
              required
              value={newTestimonial.position}
              onChange={(e) =>
                setNewTestimonial({
                  ...newTestimonial,
                  position: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Testimonial Quote"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              required
              value={newTestimonial.description}
              onChange={(e) =>
                setNewTestimonial({
                  ...newTestimonial,
                  description: e.target.value,
                })
              }
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Ratings</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newTestimonial.rating}
                label="Ratings"
                required
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    rating: e.target.value,
                  })
                }
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!newTestimonial.name || !newTestimonial.description}
            >
              Add Testimonial
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Testimonials;
