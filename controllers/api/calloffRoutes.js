const express = require('express')
const router = express.Router()
const  { Calloff } = require('../../models')



// Endpoint to initiate a calloff request
router.post('/request', async (req, res) => {
    try {
        const employeeId = req.session.employee_id
        const scheduleId = parseInt(req.body.schedule_id)
        // Extract data from the request body
    
        const callOffData = {
            schedule_id: scheduleId,
            employee_id: employeeId,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            status: 'Pending' // Initial status
          };
          console.log("Calloff input:"+callOffData)
          // Create a new calloff request
        const newCallOffData = await Calloff.create(callOffData)
    console.log("New Calloff data:"+newCallOffData)
        // Send a success response
        res.status(200).json(newCallOffData)
    } catch (error) {
        // Handle errors
        console.error('Error creating calloff request:', error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
});


module.exports = router
