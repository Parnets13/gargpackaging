const express = require("express");
const {
    getOrder,
    addOrder,
    addEnquiry,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getUserOrder,
    getOrderById,
    updateOrder,
    getReport
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getorder", getOrder);
router.get("/getOrderByUser",protect, getUserOrder);
router.get("/report", getReport);
router.get("/getOrderById/:id",protect, getOrderById);
router.post("/addorder",protect,addOrder);
router.put("/updateOrderStatus/:id",updateOrder);
router.post("/addenquiry",addEnquiry);
router.get("/getenquiry",getEnquiry);
router.put("/updateenquiry/:id",updateEnquiry)
router.delete("/deleteenquiry/:id",deleteEnquiry)

module.exports = router;
