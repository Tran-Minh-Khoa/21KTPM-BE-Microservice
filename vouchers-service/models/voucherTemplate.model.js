const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
    const VoucherTemplate = sequelize.define(
        'VoucherTemplate',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            value: {
                type: DataTypes.REAL,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
        }
    );
    return VoucherTemplate;
}