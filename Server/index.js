require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const socket = require('socket.io');
const ErrorHandler = require('./src/middlewares/Errorhandler');

const user = require('./src/routers/user');
const User = require('./src/models/user');
const Message = require('./src/models/message');
const rooms = ['general', 'tech', 'finance', 'crypto'];


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/user', user)
app.use(ErrorHandler)



app.get('/rooms', (req, res) => {
    res.json(rooms);
});

const port = process.env.PORT || 3000;
const server = require('http').createServer(app);

const io = socket(server, {
    cors: {
        origin: `http://localhost:${port}`,
        methods: ["GET", "POST"]
    }
});


async function getLastMessagesFromRoom(room) {
    let roomMessage = await Message.aggregate([
        { $match: { to: room } },
        { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } }
    ])
    return roomMessage;
}

function sortMessagesByDate(messages) {
    messages.sort(function (a, b) {
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');
        date1 = date1[2] + date1[1] + date1[0];
        date2 = date2[2] + date2[1] + date2[0];
        return date1 < date2 ? -1 : 1;
    })
}


io.on('connection', socket => {
    socket.on('new-user', async () => {
        const members = await User.find().select('-password');
        io.emit('new-user', members);
    })

    socket.on('join-room', async (room, username) => {
        socket.join(room);
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortMessagesByDate(roomMessages);
        socket.emit('room-messages', roomMessages)
    })

    socket.on('message-room', async (room, content, sender, time, date) => {
        console.log('message received', content, sender, room, time, date)
        const message = new Message({
            from: sender,
            to: room,
            content,
            time: time,
            date
        });
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortMessagesByDate(roomMessages);
        await message.save();
        io.to(room).emit('room-messages', roomMessages);
        socket.broadcast.emit('notifications', room);
    })

})


server.listen(port, () => {
    console.log(`listening to port ${port}`)
})