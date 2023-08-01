const db = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const socket = require('socket.io');


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

const io = socket(server, {
    cors: {
        origin: `http://localhost:${port}`,
        methods: ["GET", "POST"]
    }
});