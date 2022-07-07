// backend/routes/api/users.js
const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const {firstName, lastName, email, password} = req.body;
      const user = await User.signup({ email, password, firstName, lastName });
  
      
      const token = await setTokenCookie(res, user)

      return res.json({
        user,
        token
      });
    }
  );

  //get Current User
  router.get("/currentUser", requireAuth, async (req, res) => {
    const user = {
      id: req.user.id, 
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    };
    return res.json(user);
  });

  
module.exports = router;