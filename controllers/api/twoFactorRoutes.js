const express = require('express');
const { Employee } = require('../../models');
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        // console.log("REQ BODY: " + req.body)
        // JSON.stringify(req.body)
    //     const { auth_ID } = req.body;
    // const employee = await Employee.findOne({ where: {id: req.session.employee_id} })
    const employee = await Employee.findAll()
    if (!employee) {
        // return res.status(401).send('Invalid employee ID');
    }
    res.status(200).json(employee)
    // res.send('Thank you for using two factor authentication!');
} catch (err) {
    res.status(400).json(err)
  }
});
// router.get('/authenticate/manager', (req, res) => {
//     const { managerID } = req.body;
//     const employee = Employee.find(Employee => Employee.username === username && Employee.managerID === managerID);
//     if (!Employee) {
//         return res.status(401).send('Invalid manager ID');
//     }
//     res.send('Thank you for using two factor authentication!');
// });

module.exports=router;