'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Transcations,{foreignKey:'category_id'});
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: {
      type: DataTypes.STRING(30),
      allowNull:false,
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull:false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull:false,
    },
    color:{
      type:DataTypes.STRING(15),
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};