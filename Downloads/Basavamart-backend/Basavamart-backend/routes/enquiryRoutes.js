const express = require('express')
const {addUserEnquiry,getUserEnquiry,deleteUserEnquiry} = require('../controllers/enquiryController')

const router = express.Router();

router.post("/adduserenquiry",addUserEnquiry);
router.get("/getuserenquiry",getUserEnquiry);
router.delete("/deleteuserenquiry/:id",deleteUserEnquiry);

module.exports = router;