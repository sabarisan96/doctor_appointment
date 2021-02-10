const slotService = require('./slot.service');
const slotBookService = require('./slotBook.service');
const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const Slot = require('./slot.model');
const bookSlot = require('./slotBook.model');

module.exports = {
    // Create New Slot
    
    async newSlot(req, res) {
        try {

            // validate the request
            const { error, value } = slotService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error)
            }

            const exSlot = await Slot.findOne({
                $or:[
                    { $and:[{slotDate:value.slotDate,fromTime: value.fromTime }] },
                    { $and:[{slotDate:value.slotDate,toTime: value.toTime}] },
                    { $and:[{slotDate:value.slotDate,fromTime:{$gt:value.fromTime , $lt:value.toTime}}] },
                    { $and:[{slotDate:value.slotDate,fromTime:{$gt:value.toTime , $lt:value.fromTime}}] },
                    { $and:[{slotDate:value.slotDate,toTime:{$gt:value.fromTime , $lt:value.toTime}}] },
                    { $and:[{slotDate:value.slotDate,toTime:{$gt:value.toTime , $lt:value.fromTime}}] },
                    { $and:[{slotDate:value.slotDate,$and:[{fromTime:{$gt:value.fromTime} , toTime:{$lt:value.toTime}}] }]},
                    { $and:[{slotDate:value.slotDate,$and:[{fromTime:{$lt:value.fromTime} , toTime:{$gt:value.toTime}}] }]}
                    ]
                });

            if(!exSlot){
            //create new Slot
                const slot = await Slot.create(value);
                if(slot){
                    return res.json({ msg: "Slot Created Successfully" });
                }
            }else{
                return res.json({ msg: "Time Slot Exist" });
            }
            
            
      
        }
        catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(INTERNAL_SERVER_ERROR).json("Name Should Be Unique");
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json(err);
            }


        }
    },

    async findSlots(req,res) {
        try {
            const { slotDate } = req.query;
            const slot = await Slot.aggregate([{ $match:{slotDate:new Date(slotDate)}},{$lookup:{ from: 'bookingslots',localField:'_id',foreignField:'slotId',as:'bookedDet'}}]);
            return res.json(slot);
        }
        catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    

    async bookSlot(req,res){
        try {
            const {error, value} = slotBookService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error)
            }
            const bookedSlot = await bookSlot.findOne({slotId: req.body.slotId});

            if(!bookedSlot){
                //create new Slot
                const slot = await bookSlot.create(value);
                if(slot){
                    return res.json({ msg: "Slot Booked Successfully" });
                }
            }else{
                return res.json({ msg: "Slot Already Booked" });
            }

        } catch (err) {
            
        }
    },

    async bookedSlot(req,res) {
        try {
            const { slotDateData } = req.query;
            const slot = await bookSlot.aggregate([
                {
                    $lookup:{ from: 'slots',localField:'slotId',foreignField:'_id',as:'bookedDet'}
                },
                {
                    $lookup:{ from: 'users',localField:'userId',foreignField:'_id',as:'userDet'}
                }
            ]);
            return res.json(slot);
        }
        catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },
    


}