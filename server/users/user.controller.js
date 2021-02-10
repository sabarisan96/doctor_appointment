const userService = require('./user.service');
const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const User = require('./user.model');

module.exports = {
    // Create New User
    
    async newUser(req, res) {
        try {

            // validate the request
            const { error, value } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error)
            }
            
            if(value){
                //create new User
                const user = await User.create(value);
                if(user){
                    return res.json({ msg: "User Created Successfully" });
                }
            }
      
        }
        catch (err) {
           
            return res.status(INTERNAL_SERVER_ERROR).json(err);
           
        }
    }
}