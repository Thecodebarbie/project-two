const router = require('express').Router()
const { Employee, Schedule } = require('../../models')


//http://localhost:3001/api/employees/signup => (signup)
router.post('/signup', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body)

    req.session.save(() => {
      req.session.employee_id = employeeData.id
      req.session.logged_in = true
       req.session.first_name=employeeData.first_name
      res.status(200).json(employeeData)
    });
  } catch (err) {
    res.status(400).json(err)
  }
})

//http://localhost:3001/api/employees/login => (login)
router.post('/login', async (req, res) => {
  try {
    const employeeData = await Employee.findOne({ where: { email: req.body.email } })

    if (!employeeData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    const validPassword = await employeeData.checkPassword(req.body.password)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return;
    }

    req.session.save(() => {
      req.session.employee_id = employeeData.id
      req.session.manager_id = employeeData.manager_id
      req.session.logged_in = true
      
      res.json({ employee: employeeData, message: 'You are now logged in!' })
    });

  } catch (err) {
    res.status(400).json(err)
  }
})

//http://localhost:3001/api/employees/logout => (logout)
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    });
  } else {
    res.status(404).end()
  }
})

//http://localhost:3001/api/employees/ 
router.get('/', async (req, res) => {
  try {
  const employeeData = await Employee.findAll()
  res.status(200).json(employeeData)
}catch(err){
  res.status(400).json(err)
}
})

// http://localhost:3001/api/employees/schedules/:id
router.get('/schedules/:id', async (req, res) => {
  try {
      // Extract the schedule ID from the request parameters
      const employeeId  = req.params.id

      // Find the next schedule for the given employeeId where startTime is greater than current time
   const allScheduleData = await Employee.findByPk(employeeId, {
      include : [{
        model : Schedule,
      }]
  })

      // Check if the shift exists
      if (!allScheduleData) {
          // If the schedule is not found, return a 404 Not Found response
          return res.status(404).json({ message: 'Schedule not found' })
      }

      // If the schedule is found, return it as a response
      res.status(200).json(allScheduleData)
  } catch (error) {
      // Handle errors
      console.error('Error retrieving schedule:', error)
      res.status(500).json({ message: 'Internal server error' })
  }
})

// http://localhost:3001/api/employees/nextschedule/
router.get('/nextschedule/', async (req, res) => {
  try {
      // Extract the schedule ID from the request parameters
      const employeeId  = req.session.employee_id

      // Find the next schedule for the given employeeId where startTime is greater than current time
   const nextScheduleData = await Employee.findByPk(employeeId, {
      include : [{
        model : Schedule,
        /*where: {
          start_time : { $gte: new Date()} // filter schedules with dates greater than or equal to today
          //startTime: { $gt: new Date() } // Get schedules that start after current time
        },*/
        order: [['start_time', 'ASC']], // Order by startTime in ascending order
        limit: 1 // Limit the result to only one schedule
      
      }]
  });

      // Check if the shift exists
      if (!nextScheduleData) {
          // If the schedule is not found, return a 404 Not Found response
          return res.status(404).json({ message: 'Schedule not found' })
      }

      // If the schedule is found, return it as a response
      res.status(200).json(nextScheduleData)
  } catch (error) {
      // Handle errors
      console.error('Error retrieving schedule:', error)
      res.status(500).json({ message: 'Internal server error' })
  }
})


module.exports = router
