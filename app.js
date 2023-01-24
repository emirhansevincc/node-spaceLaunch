const express = require('express');
const pageRoute = require('./routes/pageRoute');
const adminRoute = require('./routes/adminRoute');
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');


const mongoose = require('mongoose');

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/spaceLaunch', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.set('view engine', 'ejs');

global.isAdminIn = null;

app.use(express.static('public'));
app.use(
    session({
        secret: 'my_space_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/spaceLaunch' }),
    })
  );

app.use("*", (req, res, next) => {
    isAdminIn = req.session.adminId;
    next();
})
app.use('/', pageRoute);
app.use('/admin', adminRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});