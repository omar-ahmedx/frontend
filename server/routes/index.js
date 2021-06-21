const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoicesController");
/* GET home page. */
router.get("/", invoiceController.index);

module.exports = router;
