const VoucherTemplateService = require("../services/voucherTemplate.service");

exports.createVoucherTemplate = async (req, res) => {
    const data = req.body;
    if (!data.value || !data.description || !data.status) {
        return res.status(400).json({ message: "invalid input" });
    }
    try {
        const voucherTemplate = await VoucherTemplateService.createVoucherTemplate(data);
        // console.log(voucherTemplate);
        return res.status(201).json({
            message: "Create voucher template successfully",
            data: voucherTemplate
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.getAllVoucherTemplates = async (req, res) => {
    try {
        const allVoucherTemplates = await VoucherTemplateService.getAllVoucherTemplates();
        return res.status(200).json({
            data: allVoucherTemplates
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}