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
  
    if (!spot || spot.ownerId !== req.user.id) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
      });
    }
  
    let { url } = req.body

    const newImage = await Image.create({
      imageableId: spot.ownerId,
      imageableType: "Spot",
      url
    })
  
    res.json(newImage)
  })


//Add an Image to a Spot based on the Spot's id
router.post('/review/:reviewId', requireAuth, async (req, res) => {

  const reviewId = req.params.reviewId;

  let review  = await Review.findByPk(reviewId);

  if (!review || review.userId !== req.user.id) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    });
  }

  let { url } = req.body

  const newImage = await Image.create({
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
    //res.json(images)
  if (!images || images.imageableId !== req.user.id) {
    res.status(404)
    res.json({
      message: "Image couldn't be found",
      statusCode: 404
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