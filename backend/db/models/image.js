'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Review, { foreignKey: 'reviewId' }
      )
      Image.belongsTo(
        models.Spot, { foreignKey: 'spotId' }
      )

      Image.belongsTo(models.User, {
        foreignKey: 'userId'
      })

    }
  }
  Image.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    reviewId: {
      type: DataTypes.INTEGER,

      references: {
        model: 'Reviews',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    imageableId: {
      type: DataTypes.INTEGER,
    },
    imageableType: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};