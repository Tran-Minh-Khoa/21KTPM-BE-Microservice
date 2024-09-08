const { ForeignKeyConstraintError } = require('sequelize');
const { VoucherModel } = require("../db");

exports.createVoucher = async (data) => {
    try {
        const Voucher = await VoucherModel.create(data)
        return Voucher;
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            throw new Error("Invalid voucher_template_id");
        } else {
            console.log("Cannot create voucher\n", error);
            throw error
        }
    }
}

exports.getAllVouchers = async () => {
    try {
        const allVouchers = VoucherModel.findAll();
        return allVouchers;
    } catch (error) {
        console.log(error);
    }
}

exports.getAllVouchersOfUser = async (userId) => {
    try {
        const vouchers = await VoucherModel.findAll({
            where: {
                user_id: userId
            }
        });
        return vouchers;
    } catch (error) {
        console.error("Error fetching vouchers:", error);
        throw new Error("Could not fetch vouchers");
    }
}
