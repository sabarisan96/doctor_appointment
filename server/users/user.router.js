const express = require('express');
const userController = require('./user.controller');
const userRouter = express.Router();

userRouter.post('/adduser', userController.newUser);

module.exports = userRouter;
