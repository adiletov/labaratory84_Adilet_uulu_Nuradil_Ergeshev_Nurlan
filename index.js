const express = require('express');
const app = express();
const port = 8080;

const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./router/users');
const tasks = require('./router/tasks');


app.use(cors());
app.use(express.json());


const run = async () => {
    await mongoose.connect('mongodb://localhost/labaratory', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.use('/users', users);
    app.use('/tasks', tasks);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});