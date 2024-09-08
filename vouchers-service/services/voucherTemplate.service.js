const { VoucherTemplateModel } = require("../db");

exports.createVoucherTemplate = async (data) => {
    try {
        const voucherTemplate = await VoucherTemplateModel.create({
            image: data.image,
            value: data.value,
            description: data.description,
            status: data.status
        })
        return voucherTemplate;
    } catch (error) {
        console.log("Cannot create\n", error);
    }
}

exports.getAllVoucherTemplates = async () => {
    try {
        const allVoucherTemplates = await VoucherTemplateModel.findAll();
        return allVoucherTemplates;
    } catch (error) {
        console.log("Cannot get all\n", error);
    }
}