const express = require('express')
const mongoose = require('mongoose')
const workoutModel = require('../models/workout')
const router = express.Router()

//get all workouts
router.get('/', async (req, res) => {
    const workouts = await workoutModel.find().sort({ createdAt: -1 })
    res.status(200).json({
        workouts
    })
})

//get a single workout
router.get('/:id', async (req, res) => {
    const workoutId = req.params.id

    //to check if its a valid id
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({ error: "No such workout" })
    }

    try {
        const workout = await workoutModel.findById({ _id: workoutId })
        if (!workout) {
            return res.status(400).json({
                error: "No such workout"
            })
        }
        res.status(200).json({
            workout
        })
    } catch (err) {
        console.log(err);
    }
})

//post a new workout
router.post('/', async (req, res) => {
    const { title, reps, load } = req.body

    const newWorkout = new workoutModel({
        title,
        reps,
        load
    })

    try {
        await newWorkout.save()
        res.status(200).json({
            newWorkout
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message
        })
    }
})

//delete a new workout
router.delete('/:id', async (req, res) => {
    const deleteId = req.params.id

    //to check if its a valid id
    if (!mongoose.Types.ObjectId.isValid(deleteId)) {
        return res.status(404).json({ error: "No such workout" })
    }
    try {
        const deleteWorkout = await workoutModel.findByIdAndDelete({ _id: deleteId })
        if (!deleteWorkout) {
            return res.status(400).json({
                error: "No such workout"
            })
        }
        res.status(200).json({
            message: "Deleted a workout",
            deleteWorkout
        })
    } catch (err) {
        console.log(err);
    }
})

//update a new workout
router.patch('/:id', async (req, res) => {
    const updateId = req.params.id

    //to check if its a valid id
    if (!mongoose.Types.ObjectId.isValid(updateId)) {
        return res.status(404).json({ error: "No such workout" })
    }

    const { title, reps, load } = req.body
    const updateWorkout = {
        title,
        reps,
        load
    }

    try {
        const workout = await workoutModel.findByIdAndUpdate(updateId, updateWorkout, { new: true })
        if (!workout) {
            res.status(404).json({ error: "No such workout" })
        } else {
            res.status(200).json({
                message: "Updated a workout",
                updateWorkout
            })
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router