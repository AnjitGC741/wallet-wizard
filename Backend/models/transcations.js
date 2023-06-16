'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transcations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customer,{foreignKey:'user_id'});
      this.belongsTo(models.Category,{foreignKey:'category_id'});
    }
  }
  Transcations.init({
    title: DataTypes.STRING,
    note: {
      type: DataTypes.STRING(30),
      allowNull:false,
    },
    date_of_transacation: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    amount:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Customers',
        key:'id'
      }
    },
    category_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Categories',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Transcations',
  });
  return Transcations;
};