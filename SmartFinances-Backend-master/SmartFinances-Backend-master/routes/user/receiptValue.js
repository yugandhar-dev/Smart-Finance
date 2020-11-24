const express = require('express');

const router = express.Router();

const { getReceiptValue } = require('../../controllers/user/receiptValue');

router.post('/user/receipt-value', getReceiptValue);

module.exports = router;
