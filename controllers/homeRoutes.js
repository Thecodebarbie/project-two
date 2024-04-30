const router = require('express').Router()
const { Employee, Schedule, Calloff } = require('../models')
const withAuth = require('../utils/auth')


//http://localhost:3001/
router.get('/', async (req, res) => {
  res.render('landing')
})

//http://localhost:3001/login
router.get('/login', async (req, res) => {
  // If the employee is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard')
    return
  }
  res.render('login')
});

router.get('/register', (req, res)=> {
  res.render('register')
})

router.get('/authenticate', async (req, res) => {
  
  res.render('authenticate',{
    layout: "main"
  })

})


router.get('/calloff', async (req, res) => {
  try {
    const employeeId = req.session.employee_id
    // Retrieve all calloff requests from the database
    const callOffRequestsData = await Calloff.findAll({
      where:{
        employee_id:employeeId
    }
    })

const calloffs = callOffRequestsData.map(calloff => calloff.get({ plain: true }));
console.log(calloffs)

  res.render('calloff',{
    calloffs,
    layout: "dashboard"
  })
} catch (error) {
  // Handle errors
  console.error('Error retrieving calloff requests:', error)
  res.status(500).json({ message: 'Internal server error' })
}

})

//http://localhost:3001/dashboard
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in employee based on the session ID
      const employeeData = await Employee.findByPk(req.session.employee_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Schedule }],
      })
  
      const employee = employeeData.get({ plain: true })
  console.log(employee)
      res.render('dashboard', {
        ...employee,
        logged_in: true,
        layout: "dashboard",  layout: "dashboard"
      })
    } catch (err) {
      res.status(500).json(err)
    }
  })

  //http://localhost:3001/schedule
// Use withAuth middleware to prevent access to route
router.get('/schedule', withAuth, async (req, res) => {
  try {
    // Find the logged in employee based on the session ID
    const employeeId = req.session.employee_id;
    const scheduleData = await Schedule.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Employee }],
      where:{
          employee_id:employeeId
      }
    })

    const schedules = scheduleData.map(schedule => schedule.get({ plain: true }));
    //const 
console.log(schedules)
    res.render('schedule', {
      schedules,
      logged_in: true, layout:"dashboard"
    })
  } catch (err) {
    console.error('Error Handlebar:', err.message)
    res.status(500).json(err)
  }
})

module.exports = router
