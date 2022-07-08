const express = require('express');
const { Spot, Image } = require('../../db/models');


const router = express.Router();



router.get('/',  async (req, res) => {


    let { page, size } = req.query;



    if (!page || size < 1 || isNaN(page)) {
        page = 0
    }
    if (!size || size < 1 || isNaN(size)) {
        size = 20
    }

    if (size > 20) {
        size = 20
    }
    if (page > 10) {
        page = 0
    }

    page = parseInt(page)
    size = parseInt(size)

    let spot = await Spot.findAll({

        include: {
            model: Image,
            as: 'previewImage',
            attributes: ['url']
          },
        
        limit: size,
        offset: (page - 1) * size,
    });
    return res.json({
        spot,
        page,
        size,
        
    });


})




module.exports = router