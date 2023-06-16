'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transcations,{foreignKey:'user_id'});
    }
  }
  Customer.init({
    user_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    currency:{
      type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};