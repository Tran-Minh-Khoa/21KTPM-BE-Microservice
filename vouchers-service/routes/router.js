const express = require('express');
const router = express.Router();
const VoucherController = require('../controllers/voucher.controller');
const VoucherTemplateController = require('../controllers/voucherTemplate.controller');


// VOUCHER TEMPLATE
router.post("/voucherTemplate/add", VoucherTemplateController.createVoucherTemplate);
router.get("/voucherTemplate/getAll", VoucherTemplateController.getAllVoucherTemplates);

// VOUCHER
router.post("/voucher/add", VoucherController.createVoucher);
router.get("/voucher/getAll", VoucherController.getAllVouchers);
router.post("/voucher/get", VoucherController.getAllVouchersOfUser);


module.exports = router;