'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
     Spot.belongsTo(models.User, {
       foreignKey: 'ownerId', as: 'Owner'
     })
     Spot.hasMany(models.Review, {
       foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true
     })
      Spot.hasMany(models.Image, {
        foreignKey: 'spotId', as: 'images', onDelete: 'CASCADE', hooks: true
      })
      Spot.hasMany(models.Image, {
        foreignKey: 'spotId', as: 'previewImage', onDelete: 'CASCADE', hooks: true
      })
      

    }
  }
  Spot.init({
    ownerId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lng: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
     numReviews: {
      type: DataTypes.INTEGER,
    },
    avgStarRating: {
      type: DataTypes.DECIMAL(3, 2),
    },
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['numReviews', 'avgStarRating']
      }
    }
  });
  return Spot;
};