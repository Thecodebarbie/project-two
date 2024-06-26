// Import necessary modules and models
const router = require('express').Router()
const { Schedule} = require('../../models')



// Handle POST request to create a new schedule
router.post('/', async (req, res) => {
    try {
        // Extract data from the request body
        const { date_created, start_time, end_time, employee_id } = req.body

        // Create a new schedule
        const newSchedule = new Schedule({
            date_created,
            start_time,
            end_time,
            employee_id
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
})

// Handle GET request to retrieve a specific schedule by employeeId
// http://localhost:3001/api/schedules/:id
router.post('/:id', async (req, res) => {
    try {
        // Extract the schedule ID from the request parameters
        const employeeId  = req.params.id

        // Retrieve the schedule from the database based on the provided ID
        //const schedule = await Schedule.findByPk(employeeID)
        const schedule = await Schedule.findAll({
           where: {
             employee_id : employeeId
           }
         })

        // Check if the shift exists
        if (!schedule) {
            // If the schedule is not found, return a 404 Not Found response
            return res.status(404).json({ message: 'Schedule not found' })
        }

        // If the shift is found, return it as a response
        res.status(200).json(schedule)
    } catch (error) {
        // Handle errors
        console.error('Error retrieving schedule:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// Handle GET request to retrieve all schedules
router.post('/', async (req, res) => {
    try {
        // Retrieve all schedules from the database
        const schedules = await Schedule.findAll()

        // Return the schedules as a response
        res.status(200).json(schedules)
    } catch (error) {
        // Handle errors
        console.error('Error retrieving schedules:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

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
        const { date_created, start_time, end_time } = req.body

        // Update the schedule with the new data
        schedule.date_created = date_created
        schedule.start_time = start_time
        schedule.end_time = end_time

        // Save the updated schedule to the database
        await schedule.save()

        // Return a success response with the updated schedule
        res.status(200).json({ message: 'Schedule updated successfully', schedule })
    } catch (error) {
        // Handle errors
        console.error('Error updating schedule:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// Handle DELETE request to delete an existing schedule by ID
router.delete('/:id', async (req, res) => {
    try {
      const scheduleData = await Schedule.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!scheduleData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(scheduleData);
    } catch (err) {
        console.error("Delete Message: ",err.message)
      res.status(500).json(err);
    }
  });

// Timecard = Total scheduled hours
// http://localhost:3001/api/schedules/:id
router.post('/timecard/:id', async (req,res) => {
    try {
            // Extract the employee ID from the request parameters
            const employeeId = req.params
            const timcardData = await Schedule.findAll({
                attributes: [
                  [Sequelize.fn('SUM', Sequelize.literal('TIMESTAMPDIFF(HOUR, start_time, end_time)')), 'totalHours']
                ],
                where: {
                  employee_id: employeeId
                }
              })
              const totalHours = timcardData[0].dataValues.totalHours || 0
            // Return a success response
            res.status(200).json("Total Schedule Hours: "+ totalHours)
    } catch (error) {
        // Handle errors
        console.error('Error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router
