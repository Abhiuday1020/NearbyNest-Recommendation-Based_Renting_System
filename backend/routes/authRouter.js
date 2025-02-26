// const { signup, login } = require('../controllers/authController');
// const { signupValidation, loginValidation } = require('../middlewares/authValidation');

// const router = require('express').Router();

// router.post('/login', loginValidation, login);
// router.post('/signup', signupValidation, signup);

// module.exports = router;

import express from "express";
import  {login, logout, register} from "../controllers/authController.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;