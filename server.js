require('dotenv').config()

// ..register express app
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express()
//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB & server running on http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })


