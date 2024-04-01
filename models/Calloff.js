const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Calloff extends Model {}

Calloff.init(
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        scheduleID : {
            type : DataTypes.INTEGER,
            references : {
                model : "schedule",
                key : "id"
            }
        },
        employeeID : {
            type : DataTypes.INTEGER,
            references : {
                model : "employee",
                key : "id"
            }

        },
        reason : {
            type : DataTypes.STRING
        },
        dateCreated : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        startDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        endDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        status : {
            type : DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps : false,
        freezeTableName : true,
        underscored : true,
        modelName : "calloff"
    }
)

module.exports = Calloff