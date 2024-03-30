const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Employee extends Model {}

Employee.init(
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        manager_id : {
            type : DataTypes.INTEGER
        },
        user_id : {
            type : DataTypes.INTEGER,
            references : {
                model : "user",
                key : "id"
            }
        }
    },
    {
        sequelize,
        timestamps : false,
        freezeTableName : true,
        underscored : true,
        modelName : "employee"
    }
)

module.exports = Employee