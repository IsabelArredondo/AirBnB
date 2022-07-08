const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, Image, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Add an Image to a Spot based on the Spot's id
router.post('/spots/:spotId', requireAuth, async (req, res) => {

    const spotId = req.params.spotId;
  
    let spot  = await Spot.findByPk(spotId);
  
    if (!spot ) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
      });
    } else if (spot.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403
      })
    }
  
    let { url } = req.body

    const newImage = await Image.create({
      spotId: spotId,
      imageableId: spot.ownerId,
      imageableType: "Spot",
      url
    })
  
    res.json(newImage)
  })


//Add an Image to a review based on the Spot's id
router.post('/review/:reviewId', requireAuth, async (req, res) => {

  let  reviewId = req.params.reviewId;

  let review  = await Review.findByPk(reviewId);

  let allReviews = await Image.findAll({where: {reviewId: reviewId}})
   
  if (allReviews.length > 10) {
    return res.status(400).json({
        message: "Maximum number of images for this resource was reached",
        statusCode: 400
    })
  } else if (!review ) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    });
  } else if (review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  let { url } = req.body

  const newImage = await Image.create({
    reviewId: reviewId,
    imageableId: review.userId,
    imageableType: "Review",
    url
  })

  res.json(newImage)
})


//Delete an Image
router.delete('/delete/:id', requireAuth, async (req, res) => {

  const images = await Image.findByPk(req.params.id);
    console.log(images)

  if (!images ) {
    res.status(404)
    res.json({
      message: "Image couldn't be found",
      statusCode: 404
    })
  } else if (images.imageableId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  }

  images.destroy()
  images.save()

  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

   

module.exports = router