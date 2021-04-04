'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Todos.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Todos.init({
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    doing: DataTypes.BOOLEAN,
    likes: DataTypes.INTEGER,
    attachement: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};