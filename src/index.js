const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();


const { mongoose } = require('./database')

//settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());//verifica si lo que recibe del servidor es en formato json


//Routes
app.use(require('./routes/task.routes'));

//Static FIles
app.use(express.static(path.join(__dirname, 'public')))


//Starting Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})