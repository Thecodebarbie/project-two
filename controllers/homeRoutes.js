const router = require('express').Router()
const { Employee, Schedule } = require('../models')
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
  
      res.render('dashboard', {
        ...employee,
        logged_in: true,
        layout: "dashboard",  layout: "dashboard"
      })
    } catch (err) {
      res.status(500).json(err)
    }
  })

module.exports = router
