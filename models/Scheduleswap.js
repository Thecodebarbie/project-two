const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Scheduleswap extends Model {}

Scheduleswap.init(
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        current_schedule_id : {
            type : DataTypes.INTEGER,
            references : {
                model : "schedule",
                key : "id"
            }
        },
        requested_schedule_id : {
            type : DataTypes.INTEGER,
            references : {
                model : "schedule",
                key : "id"
            }
        },
        employee_id : {
            type : DataTypes.INTEGER,
            references : {
                model : "employee",
                key : "id"
            }

        },
        date_created : {
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
        modelName : "scheduleswap"
    }
)

module.exports = Scheduleswap