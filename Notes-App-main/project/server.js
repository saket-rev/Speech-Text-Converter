
require('dotenv').config();
const connectDB = require('./models/db');
const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const studentController = require('./controllers/studentController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));  //express middlewear for handlebars
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars), layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

// app.listen(3000, () => {
//     console.log('Express server started at port : 3000');
// });
const port = process.env.PORT || 3000;


//todo : write a function to start the app
const start = async () => {
    try{
        //todo : connect MongoDB here only after whole skeleton of app is done
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() => 
            console.log(`Server is listening on port ${port}...`)
        )
    }catch(error){
        console.log(error)
    }
}

start()//This will start our node app

app.use('/student', studentController);