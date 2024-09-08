const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
    const Voucher = sequelize.define(
        "Voucher",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            qr: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            voucher_template_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    return Voucher;
}