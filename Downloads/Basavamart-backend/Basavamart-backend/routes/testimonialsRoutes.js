const express = require("express");
const {
  addTestimonials,
  fetchTestimonials,
  deleteTestimonials,
} = require("../controllers/testimonialsController");

const router = express.Router();
router.post("/add", addTestimonials);
router.get("/fetch", fetchTestimonials);
router.delete("/delete/:id", deleteTestimonials);
module.exports = router;
