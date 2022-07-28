const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, Image, User, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


router.get('/', async (req, res) => {

  let { page, size, maxLat, minLat, minLng, maxLng, maxPrice, minPrice } = req.query;
  page = Number(page)
  size = Number(size)

  if (isNaN(page)) {
    page = 0
  }
  if (isNaN(size)) {
    size = 20
  }

  if (size > 20) {
    size = 20
  }
  if (page > 10) {
    page = 10
  }
  const error = {
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {}
  }

  if (page < 0) {
    error.errors.page = "Page must be greater than or equal to 0"
  }
  if (size < 0) {
    error.errors.size = "Size must be greater than or equal to 0"
  }
  if (+maxLat > 90) {
    error.errors.maxLat = "Maximum latitude is invalid"
  }
  if (+minLat < -90) {
    error.errors.minLat = "Minimum latitude is invalid"
  }
  if (+minLng < -180) {
    error.errors.minLng = "Maximum longitude is invalid"
  }
  if (+maxLng > 180) {
    error.errors.maxLng = "Minimum longitude is invalid"
  }
  if (Number(minPrice) < 0) {
    error.errors.minPrice = "Minimum price must be greater than 0"
  }
  if (Number(maxPrice) < 0) {
    error.errors.maxPrice = "Maximum price must be greater than 0"
  }

  if (page < 0 || size < 0 || +maxLat > 90 || +minLng < -180 || +maxLng > 180 || Number(maxPrice) < 0 || Number(minPrice) < 0) {
    return res.status(400).json(error)
  }
  const options = []
  if (maxLat) { options.push({ lat: { [Op.lte]: Number(maxLat) } }) }
  if (minLat) { options.push({ lat: { [Op.gte]: Number(minLat) } }) }
  if (maxLng) { options.push({ lng: { [Op.lte]: Number(maxLng) } }) }
  if (minLng) { options.push({ lng: { [Op.gte]: Number(minLng) } }) }
  if (maxPrice) { options.push({ price: { [Op.lte]: Number(maxPrice) } }) }
  if (minPrice) { options.push({ price: { [Op.gte]: Number(minPrice) } }) }

  let spot = await Spot.findAll({
    where: {
      [Op.and]: options

    },
    include: {
      model: Image,
      as: 'previewImage',
      attributes: ['url']
    },
    limit: size || 20,
    offset: page * size,
  });
  return res.json({
    spot,
    page,
    size: size || 20
  });

})


//find all spots by id 
router.get('/:id(\\d+)', async (req, res) => {
  const spots = await Spot.findByPk(req.params.id, {
    include: [
      {
        model: Image,
        as: 'images',
        attributes: ['url']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }]
  });

  if (!spots) {
    return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
  }

  const reviewsAggData = await Spot.findByPk(req.params.id, {
    include: {
      model: Review,
      attributes: []
    },
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('*')), 'numReviews'],
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
    ],
    raw: true
  });

  const spotData = spots.toJSON()
  spotData.numReviews = reviewsAggData.numReviews
  spotData.avgStarRating = reviewsAggData.avgStarRating

 

  res.json(spotData)
})

// get all spots based on user id 
router.get('/userSpots', requireAuth, async (req, res) => {
  const { id } = req.user
  console.log(id)
  const places = await Spot.findAll({
    include: {
      model: Image,
      as: 'previewImage',
      attributes: ['url']
    },
    where: { ownerId: id }
  });
  res.json(places[0])
});

const validateSpots = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

//post newSpot
router.post('/', validateSpots, requireAuth, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  res.json({   
    ownerId: req.user.id,
    address: newSpot.address,
    city: newSpot.city,
    state: newSpot.state,
    country: newSpot.country,
    lat: newSpot.lat,
    lng: newSpot.lng,
    name: newSpot.name,
    description: newSpot.description,
    price: newSpot.price,
    createdAt: newSpot.createdAt,
    updatedAt: newSpot.updatedAt
  })
})

//put spot 
router.put('/:id', validateSpots, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const spots = await Spot.findByPk(req.params.id,

    {
      where: {
        ownerId: req.params.id
      }
    }
  );
  // both equal 1
  //console.log(req.params.ownerId)

  if (!spots) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  } else if (spots.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  spots.address = address
  spots.city = city
  spots.state = state
  spots.country = country
  spots.lat = lat
  spots.lng = lng
  spots.name = name
  spots.description = description
  spots.price = price

  await spots.save()
  return res.json(spots)
})



//delete spot 
router.delete('/delete/:id', requireAuth, async (req, res) => {

  const spots = await Spot.findByPk(req.params.id);

  if (!spots) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  } else if (spots.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      message: "Forbidden",
      statusCode: 403
    })
  }

   await spots.destroy()
  //spots.save()

  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })

})






















module.exports = router