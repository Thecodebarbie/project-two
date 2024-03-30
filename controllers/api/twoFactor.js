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

