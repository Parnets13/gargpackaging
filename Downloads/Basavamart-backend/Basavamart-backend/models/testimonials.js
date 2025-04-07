const  mongoose  = require("mongoose")

const testimonialsSchema = new mongoose.Schema({
    name :{type : String},
    position:{type:String},
    description:{type:String},
    rating:{type:Number}
})
module.exports = mongoose.model("Testimonial",testimonialsSchema);