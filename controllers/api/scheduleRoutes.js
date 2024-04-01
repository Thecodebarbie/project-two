// Import necessary modules and models
const router = require('express').Router()
const Schedule = require('../models')

// Handle POST request to create a new schedule
router.post('/', async (req, res) => {
    try {
        // Extract data from the request body
        const { startTime, endTime } = req.body

        // Create a new schedule
        const newSchedule = new Schedule({
            startTime,
            endTime
        });

        // Save the new schedule to the database
        await newSchedule.save()

        // Send a success response
        res.status(201).json({ message: 'Schedule created successfully', schedule: newSchedule })
    } catch (error) {
        // Handle errors
        console.error('Error creating schedule:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

// Handle GET request to retrieve a specific schedule by ID
router.get('/:id', async (req, res) => {
    try {
        // Extract the schedule ID from the request parameters
        const { id } = req.params

        // Retrieve the schedule from the database based on the provided ID
        const schedule = await Schedule.findById(id)

        // Check if the shift exists
        if (!schedule) {
            // If the schedule is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Schedule not found' })
        }

        // If the shift is found, return it as a response
        res.status(200).json({ schedule })
    } catch (error) {
        // Handle errors
        console.error('Error retrieving schedule:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

// Handle GET request to retrieve all schedules
router.get('/', async (req, res) => {
    try {
        // Retrieve all schedules from the database
        const schedules = await Schedule.find()

        // Return the schedules as a response
        res.status(200).json({ schedules })
    } catch (error) {
        // Handle errors
        console.error('Error retrieving schedules:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

// Handle PUT request to update an existing schedule
router.put('/:id', async (req, res) => {
    try {
        // Extract the schedule ID from the request parameters
        const { id } = req.params

        // Retrieve the existing schedule from the database
        let schedule = await Schedule.findById(id);

        // Check if the schedule exists
        if (!schedule) {
            // If the schedule is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Schedule not found' })
        }

        // Extract updated schedule data from the request body
        const { startTime, endTime } = req.body

        // Update the schedule with the new data
        schedule.startTime = startTime
        schedule.endTime = endTime

        // Save the updated schedule to the database
        await schedule.save()

        // Return a success response with the updated schedule
        res.status(200).json({ message: 'Schedule updated successfully', schedule })
    } catch (error) {
        // Handle errors
        console.error('Error updating schedule:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

// Handle DELETE request to delete an existing schedule by ID
router.delete('/:id', async (req, res) => {
    try {
        // Extract the schedule ID from the request parameters
        const { id } = req.params

        // Find the schedule in the database and delete it
        const deletedSchedule = await Schedule.findByIdAndDelete(id)

        // Check if the schedule exists
        if (!deletedSchedule) {
            // If the schedule is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Schedule not found' })
        }

        // Return a success response
        res.status(200).json({ message: 'Schedule deleted successfully' })
    } catch (error) {
        // Handle errors
        console.error('Error deleting schedule:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

module.exports = router
