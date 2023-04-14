const express = require('express')
const morgan = require('morgan')
const mongoose = require("mongoose")
const workoutsRoutes = require('./routes/Workouts')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/api/workouts/', workoutsRoutes)

//connect to db
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log(error);
    })
