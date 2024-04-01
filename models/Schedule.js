const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Schedule extends Model {}

Schedule.init(
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        startTime : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        endTime : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        employeeID : {
            type : DataTypes.INTEGER,
            references : {
                model : "employee",
                key : "id"
            }

        }
    },
    {
        sequelize,
        timestamps : false,
        freezeTableName : true,
        underscored : true,
        modelName : "schedule"
    }
)

module.exports = Schedule