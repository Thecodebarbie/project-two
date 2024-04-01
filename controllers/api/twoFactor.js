const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

const users = [
    { username: 'timrob', email: 'timrobert@gmail.com', password: 'timrob123', employeeId: '1245' },
    { username: 'robalex', email: 'robalexander@hotmail.com', password: 'robalex123', employeeId: '1345' },
    { username: 'dianajo', email: 'dianajohn@yahoo.com', password: 'dianajo123', employeeId: '2345' },
    { username: 'maryxa', email: 'maryxavier@gmail.com', password:'maryxa123' ,employeeId: '1234' },
    { username: 'aprilda', email: 'aprildaniel@aol.com', password: 'aprilda123' ,employeeId: '1254' },
    { username: 'paigefr', email: 'paigefrancis@yahoo.com', password: 'paigefr123' ,employeeId: '5413' },
];


app.post('/login', (req, res) => {
    const { username, password, } =req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }
    res.json({ promptEmployeeId: true }); 
});

app.post('/authenticate', (req, res) => {
    const { username, employeeId } = req.body;
    const user = users.find(user => user.username === username && user.employeeId === employeeId);
    if (!user) {
        return res.status(401).send('Invalid employee ID');
    }
    res.send('Thank you for using two factor authentication!');
});

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001`);
});
