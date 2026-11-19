require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const studentRoutes = require('./Routes/studentRoutes');
const teacherRoutes = require('./Routes/teacherRoutes');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Successfully connected");
    })
    .catch((error) => {
        console.log("db not connected", error);
    });

app.use((req, res, next) => {
    console.log("Middleware route");
    next();
});

app.use((req, res, next) => {
    console.log("Request coming from", req.originalUrl);
    console.log("Requested method", req.method);
    next();
});

app.use('/students', studentRoutes);

app.use('/teachers', teacherRoutes);

app.get('/', (req, res) => {
    res.end("Home Page");
});

app.get('/about', (req, res) => {
    res.end("About us page");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});