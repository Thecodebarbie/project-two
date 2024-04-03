const router = require('express').Router()
const { Employee } = require('../../models')


//http://localhost:3001/api/employees/signup => (signup)
router.post('/signup', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body)

    req.session.save(() => {
      req.session.employee_id = employeeData.id
      req.session.logged_in = true
       req.session.name=employeeData.name
      res.status(200).json(employeeData)
    });
  } catch (err) {
    res.status(400).json(err)
  }
});

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
});

//http://localhost:3001/api/employees/logout => (logout)
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    });
  } else {
    res.status(404).end()
  }
});

//http://localhost:3001/api/employees/ 
router.get('/', async (req, res) => {
  try {
  const employeeData = await Employee.findAll({
    where: {
      manager_id: 106
    }
  })
  res.status(200).json(employeeData)
}catch(err){
  res.status(400).json(err)
}
});

module.exports = router
