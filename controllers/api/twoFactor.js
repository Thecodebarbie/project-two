const express = require('express');
const { Employee } = require('../../models')

const app = express();
const PORT = 3001;

app.post('/authenticate', (req, res) => {
    const { EmployeeID } = req.body;
    const employee = Employee.find(Employee => Employee.username === username && Employee.EmployeeID === EmployeeID);
    if (!Employee) {
        return res.status(401).send('Invalid employee ID');
    }
    res.send('Thank you for using two factor authentication!');
});

app.post('/authenticate/manager', (req, res) => {
    const { managerID } = req.body;
    const employee = Employee.find(Employee => Employee.username === username && Employee.managerID === managerID);
    if (!Employee) {
        return res.status(401).send('Invalid manager ID');
    }
    res.send('Thank you for using two factor authentication!');
});


app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`);
});
