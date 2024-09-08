const VoucherService = require("../services/voucher.service");

exports.createVoucher = async (req, res) => {
    const data = req.body
    if (!data.status || !data.user_id) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const newVoucher = await VoucherService.createVoucher(data);
        res.status(201).json({
            message: "Create voucher successfully",
            newVoucher: newVoucher
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getAllVouchers = async (req, res) => {
    try {
        const allVouchers = await VoucherService.getAllVouchers();
        res.status(200).json(allVouchers);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getAllVouchersOfUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const vouchers = await VoucherService.getAllVouchersOfUser(userId);
        res.json(vouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


