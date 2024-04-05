// Import necessary modules and models
const router = require('express').Router()
const ScheduleSwap = require('../../models')

// Endpoint to initiate a schedule swap request
router.post('/request', async (req, res) => {
    try {
        // Extract data from the request body
        const { employee_id, current_schedule_id, requested_schedule_id} = req.body

        // Create a new schedule swap request
        const newSwapRequest = new ScheduleSwap({
            employee_id,
            current_schedule_id,
            requested_schedule_id,
            status: 'Pending' // Initial status
        })

        // Save the new swap request to the database
        await newSwapRequest.save()

        // Send a success response
        res.status(201).json({ message: 'Schedule swap request created successfully' })
    } catch (error) {
        // Handle errors
        console.error('Error creating schedule swap request:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

// Endpoint to accept a schedule swap request
router.put('/accept/:id', async (req, res) => {
    try {
        // Extract the request ID from the request parameters
        const { id } = req.params

        // Find the request in the database and update its status to 'Accepted'
        await ScheduleSwap.findByIdAndUpdate(id, { status: 'Accepted' })

        // Send a success response
        res.status(200).json({ message: 'Schedule swap request accepted successfully' })
    } catch (error) {
        // Handle errors
        console.error('Error accepting schedule swap request:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

// Endpoint to reject a schedule swap request
router.put('/reject/:id', async (req, res) => {
    try {
        // Extract the request ID from the request parameters
        const { id } = req.params

        // Find the request in the database and update its status to 'Rejected'
        await ScheduleSwap.findByIdAndUpdate(id, { status: 'Rejected' })

        // Send a success response
        res.status(200).json({ message: 'Schedule swap request rejected successfully' })
    } catch (error) {
        // Handle errors
        console.error('Error rejecting schedule swap request:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
});


module.exports = router
