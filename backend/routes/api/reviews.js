
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, Image, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///Get all Reviews of the Current User
router.get('/userReviews', requireAuth, async (req, res) => {
    const { id } = req.user
    console.log(id)
    const reviews = await Review.findAll({

        include: [
           
            {
                model: Spot
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
            
        ],

      where: { userId: id }
    });
    res.json(reviews[0])
  });



//Get all Reviews by a Spot's id
router.get('/:spotId', async (req, res) => {
    const review = await Review.findAll( {
      where: { spotId: req.params.spotId}
      
    });
  
    if (!review) {
      res.status(404)
      res.json({ message: "Spot couldn't be found", statusCode: 404 })
    }
  
    res.json({ review })
  })


//Create a Review for a Spot based on the Spot's id
  router.post('/:spotId', requireAuth, async (req, res) => {
    let { review, stars } = req.body
    
    const newReview = await Review.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      review, 
      stars,
    })
  
    res.json({ message: 'Successfully created spot', newReview})
  })


//Update and return an existing review.
  router.put('/:userId', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const reviews = await Review.findOne(
  
      {
        where: {
          userId: req.params.userId
        }
      }
    );
  // both equal 1
  //console.log(req.params.ownerId)
  
    if (!reviews || reviews.userId !== req.user.id) {
      res.status(404)
      res.json({
        message: "Review couldn't be found", 
        statusCode: 404
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
  
    if (!reviews || reviews.userId !== req.user.id) {
      res.status(404)
      res.json({
        message: "Review couldn't be found", 
        statusCode: 404
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