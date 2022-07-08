const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, Review, Image, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Get all of the Current User's Bookings
router.get('/userBookings', requireAuth, async (req, res) => {
    const { id } = req.user
    console.log(id)
    const Bookings = await Booking.findAll({

        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
              model: Image,
              as: 'previewImage',
              attributes: ['url']
            }
        ],

        where: { userId: id }
    });
    res.json({ Bookings })
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId', requireAuth, async (req, res) => {

    let nonUserBookings = await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ['spotId', 'startDate', 'endDate']
    })

    let userBooking = await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    const spotId = req.params.spotId;

     let spot  = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404)
        res.json({
          message: "Spot couldn't be found",
          statusCode: 404
        })
    } else if (spot.ownerId === req.user.id) {
        return res.json({ 'Bookings': userBooking })
    } else {
        return res.json({ 'Bookings': nonUserBookings })
    }
})


// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId', requireAuth, async (req, res) => {

    const spotId = req.params.spotId;
  
    let spot  = await Spot.findByPk(spotId);
  
    if (!spot) {
      return res.status(404).json({
        "message": "Spot does not exist!",
        "statusCode": 404
      });
    }
  
    let {startDate, endDate} = req.body
    const newBooking = await Booking.create({
      userId: req.user.id,
      spotId: spotId,
      startDate,
      endDate,
    })
  
    res.json(newBooking)
  })

 // Edit a Booking

 //Update and return an existing review.
 router.put('/:id', requireAuth, async (req, res) => {

    const {startDate, endDate} = req.body

    const bookings = await Booking.findOne(
  
      {
        where: {
         id: req.params.id
        }
      }
    );

  
    if (!bookings || bookings.userId !== req.user.id) {
      res.status(404)
      res.json({
        message: "Review couldn't be found",
        statusCode: 404
      })
    }
  
    bookings.startDate = startDate
    bookings.endDate = endDate
  
    await bookings.save()
    return res.json(bookings)
  })


// Delete a Booking
  router.delete('/:id', requireAuth, async (req, res) => {

    const bookings = await Booking.findByPk(req.params.id);
  
    if (!bookings || bookings.userId !== req.user.id) {
      
      res.status(404)
      res.json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }
  
    bookings.destroy()
    bookings.save()
  
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  })





module.exports = router