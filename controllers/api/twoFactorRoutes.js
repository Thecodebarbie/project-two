const express = require('express');
const { Employee } = require('../../models');
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log("req.body: "+JSON.stringify(req.body))
        console.log("employee_id: "+req.session.employee_id)
        const authID = parseInt(req.body.auth_id)
        const employeeID = req.session.employee_id
        // console.log("REQ BODY: " + req.body)
        // JSON.stringify(req.body)
    //     const { auth_ID } = req.body;
    // const employee = await Employee.findOne({ where: {id: req.session.employee_id} })
    const employeeData = await Employee.findByPk(employeeID)
    //if (!employee) {
        // return res.status(401).send('Invalid employee ID');
    //}
    console.log(employeeData.auth_id)
    console.log(authID)
   if(employeeData.auth_id === authID){
    res.status(200).json(employeeData)
    //console.log("BOTH EQUAL")
    }
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