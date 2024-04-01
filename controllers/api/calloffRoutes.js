// Import necessary modules and models
const router = require('express').Router();
const CallOffRequest = require('../models');

// Endpoint to initiate a call-off request
router.post('/calloff/request', async (req, res) => {
    try {
        // Extract data from the request body
        const { employeeID, startDate, endDate, reason } = req.body;

        // Create a new call-off request
        const newCallOffRequest = new CallOffRequest({
            employeeID,
            startDate,
            endDate,
            reason,
            status: 'Pending' // Initial status
        });

        // Save the new call-off request to the database
        await newCallOffRequest.save();

        // Send a success response
        res.status(201).json({ message: 'Call-off request created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error creating call-off request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to retrieve all call-off requests
router.get('/calloff/requests', async (req, res) => {
    try {
        // Retrieve all call-off requests from the database
        const callOffRequests = await CallOffRequest.find();

        // Send the call-off requests as a response
        res.status(200).json({ callOffRequests });
    } catch (error) {
        // Handle errors
        console.error('Error retrieving call-off requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to update the status of a call-off request
router.put('/calloff/requests/:id', async (req, res) => {
    try {
        // Extract the request ID from the request parameters
        const { id } = req.params;

        // Extract the new status from the request body
        const { status } = req.body;

        // Find the request in the database and update its status
        await CallOffRequest.findByIdAndUpdate(id, { status });

        // Send a success response
        res.status(200).json({ message: 'Call-off request status updated successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error updating call-off request status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to retrieve the call-off schedule
router.get('/calloff/schedule', async (req, res) => {
    try {
        // Retrieve approved call-off requests from the database
        const approvedCallOffRequests = await CallOffRequest.find({ status: 'Approved' });

        // Send the approved call-off requests as a response
        res.status(200).json({ approvedCallOffRequests });
    } catch (error) {
        // Handle errors
        console.error('Error retrieving call-off schedule:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
