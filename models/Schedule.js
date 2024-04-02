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
        date_created : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        },
        start_time : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        end_time : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.NOW
        },
        employee_id : {
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