const sequelize = require('../util/database');
const {DataTypes} = require("sequelize");

const Employee = sequelize.define('employee',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    designation:{
        type:DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Employee;