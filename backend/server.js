const express = require('express');
const bodyParser = require('body-parser');
const dbconfig = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(`successfully connected`);
}).catch(err => {
    console.log('Could not connect', err);
    process.exit();

})


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome' });

});

require('./app/routes/user.routes')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});