var express = require('express');
const app = express();
const mongoose = require('mongoose');
const slotRouter = require('./slots/slot.router');
const userRouter = require('./users/user.router');
const devConfig = require('./env/development');
const cors = require('cors');
// const accessRouter = require('./accessrights/accessrights.router');
const setGlobalMiddleware = require('./middleware/global-middleware');

var PORT = devConfig.port;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
app.use(express.json());
app.use(cors());
// registered Global middleware
app.use('/slots', slotRouter);
app.use('/users', userRouter);
setGlobalMiddleware(app);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://sabaricse:sabari_kiot123@cluster0-shard-00-00-tkdtu.mongodb.net:27017,cluster0-shard-00-01-tkdtu.mongodb.net:27017,cluster0-shard-00-02-tkdtu.mongodb.net:27017/doctorAppointment?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', (err) => {
    if (err) { console.log(err) } else {
        console.log('DB connected successfully');
    }
    // console.log('Sorry Unable to Connect');

    
});
