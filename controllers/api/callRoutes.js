const express = require('express')
const router = express.Router()
const  { Calloff } = require('../../models')



// Endpoint to initiate a calloff request
router.post('/request', async (req, res) => {
    try {
        const employeeId = req.session.employee_id
        const scheduleId = parseInt(req.body.schedule_id)
        //const dateString = req.body.date_created

        // Split the date string by the delimiter "-"
        //const parts = dateString.split("-");
        // Extract year, month, and day
        //const year = parts[2];
        //const month = parts[0].padStart(2, '0'); // Ensure two-digit representation
        //const day = parts[1].padStart(2, '0'); // Ensure two-digit representation

        // Form the formatted date string
        //const formattedDate = `${year}:${month}:${day}`;
        const Date = req.body.date_created.replace(/\//g, "-")
       
        const startTime = Date+' '+req.body.start_time
        const endTime = Date+' '+req.body.end_time
        // Extract data from the request body
    console.log(req.body)
    
        const callOffData = {
            schedule_id: scheduleId,
            employee_id: employeeId,
            start_time: startTime,
            end_time: endTime,
            status: 'Pending' // Initial status
          };
          console.log(startTime+''+endTime)
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
