const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, Review, Image, Spot, User } = require('../../db/models');
const {Op} = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Get all of the Current User's Bookings
router.get('/userBookings', requireAuth, async (req, res) => {
    const { id } = req.user
    
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
  const{ spotId }= req.params;
  const {startDate, endDate} = req.body



  let spot = await Spot.findByPk(spotId);

  if (!spot) {
   return res.status(404).json({
      "message": "Spot couldn't be found!",
      "statusCode": "404"
    });
  }

  // if (req.user.id !== spot.ownerId) {
  //   return res.status(403).json({
  //     "message": "Forbidden",
  //     "statusCode": 403
  //   });
  // }

  if (endDate < startDate) {
    return res.status(400).json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    });
  }

  let bookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [{
        startDate: {
          [Op.lte]: endDate
          },
        }, {
        endDate: {
          [Op.gte]: startDate
          }
        }],
    }
  });

  if (bookings.length) {
    return res.status(403).json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  let booking = await Booking.create
  ({
    startDate, 
    endDate, 
    spotId, 
    userId: req.user.id
  });

  booking = await Booking.findByPk(booking.id);
  return res.json(booking);
});
 

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

  
    if (!bookings) {
      res.status(404)
      res.json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }
    if (bookings.userId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden",
        statusCode: 403
      });
    }
    if (new Date(bookings.endDate) < new Date() ) {
      return res.status(400).json({
        "message": "Past bookings can't be modified",
        "statusCode": 400
      })
    }

    let book = await Booking.findAll({
      where: {
         id: req.params.id,
        [Op.and]: [{
          startDate: {
            [Op.lte]: endDate
            },
          }, {
          endDate: {
            [Op.gte]: startDate
            }
          }],
      }
    });
  
    if (book.length) {
      return res.status(403).json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
          "startDate": "Start date conflicts with an existing booking",
          "endDate": "End date conflicts with an existing booking"
        }
      })
    }

    bookings.startDate = startDate
    bookings.endDate = endDate
    await bookings.save()
    return res.json(bookings)
  })


// Delete a Booking
router.delete('/:id', requireAuth, async (req, res) => {
  let id = req.params.id;
  let user = req.user.id;

  let current = await Booking.findByPk(id);
  
  if (!current) {
      return res.status(404).json({
          "message": "Booking could not be found",
          "statusCode": 404
      })
  }

  let spot = await Spot.findByPk(current.spotId);

  if (current.userId !== user && spot.ownerId !== user){
    return res.status(403).json({
          "message": "Forbidden",
          "statusCode": 403
      })
  }

  if (new Date(current.startDate) < Date.now()) {
    return res.status(400).json({
          "message": "You cannot delete a past or current booking",
          "statusCode": 400
      });
  }

  await current.destroy({
      where: {
          id: id
      }
  })

  return res.json({
      message: "Successfully deleted",
      statusCode: 200
  })

})





module.exports = router