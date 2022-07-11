
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, Image, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');


const router = express.Router();


///Get all Reviews of the Current User
router.get('/userReviews', requireAuth, async (req, res) => {
  const { id } = req.user
  const reviews = await Review.findAll({

    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
      },
      {
        model: Image,
        as: 'images',
        attributes: ['url']
      },


    ],

    where: { userId: id }
  });
  res.json(reviews[0])
});



//Get all Reviews by a Spot's id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId;

  let spot  = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  }

  let reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Image,
        as: 'images',
        attributes: ['url']
      },


    ],
  });

  return res.json(reviews);
});

const validateSpots = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isLength({max:5})
    .isLength({min:0})
    .withMessage('Stars must be an integer from 1 to 5'),
     handleValidationErrors
]

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId', requireAuth, validateSpots, async (req, res) => {
  let { review, stars } = req.body
  const spotId = req.params.spotId
  const id = req.user.id
  const spot = await Spot.findOne({
      where: { id: spotId}
  })

  if (!spot) {
      return res.status(404).json({
          message: "Spot couldn't be found",
          statusCode: 404
      })
  }
  const reviewExistence = await Review.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId },
        { userId: req.user.id },
      ],
    },
  })

  if (reviewExistence.length >= 1) {
    return res.status(403).json({
      message: "User review for this current spot already exists",
      statusCode: 403
    })
  }

  if (stars > 5 || stars <= 0) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
            stars: "Stars must be an integer from 1 to 5"
        }
      })
  }

  
  const newReview = await Review.create({
    userId: id,
    spotId: spotId,
    review,
    stars,
  })

  res.json(newReview)
})



//Update and return an existing review.
router.put('/:id', requireAuth,  async (req, res) => {

  const { review, stars } = req.body
  const reviews = await Review.findOne({ where: { id: req.params.id}});
  // both equal 1
  //console.log(req.params.ownerId)

  if (!reviews ) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  } 
  if (reviews.userId !== req.user.id) {
     return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
   }) 
  }

  if (stars > 5 || stars <= 0) {

    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
          stars: "Stars must be an integer from 1 to 5"
      }
    })
}

  reviews.review = review
  reviews.stars = stars

  await reviews.save()
  return res.json(reviews)
})

//Delete a Review
router.delete('/:id', requireAuth, async (req, res) => {

  const reviews = await Review.findByPk(req.params.id);

  if (!reviews) {
     return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }
  if (reviews.userId !== req.user.id) {
     return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
   }) 
  }

  reviews.destroy()
  reviews.save()

  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })

})


module.exports = router