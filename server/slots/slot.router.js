const express = require('express');
const slotController = require('./slot.controller');
const slotRouter = express.Router();

slotRouter.post('/addslot', slotController.newSlot);
slotRouter.get('/findSlots', slotController.findSlots);
slotRouter.post('/bookSlot',slotController.bookSlot);
slotRouter.get('/findBookedSlots', slotController.bookedSlot);
module.exports = slotRouter;
