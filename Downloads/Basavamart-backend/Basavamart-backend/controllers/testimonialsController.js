const mongoose = require("mongoose")
const Testimonials = require("../models/testimonials")

exports.addTestimonials = async (req, res) => {
    try {
        const { name, position, description, rating } = req.body;
        const testimonial = new Testimonials({
            name, position, description, rating
        });
        await testimonial.save();
        console.log("testimonials added")
        res.status(201).json({ message: "testimonials added successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });  // Added error response
    }
}

exports.fetchTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.find();
        res.status(200).json(testimonials);  // Changed to 200 for successful GET
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });  // Added error response
    }
}

exports.deleteTestimonials = async (req, res) => {
    try {
        // Changed Testimonial to Testimonials
        const testimonial = await Testimonials.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.status(200).json({ message: "Testimonial deleted successfully" });  // Changed to 200 for successful DELETE
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });  // Added error response
    }
}