const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: "String",
        required: true,
        unique: true,
    },
    password: {
        type: "String",
        required: true,
    },
    image: {
        type: "String",

    },
    newMessage: {
        type: "Object",
        default: {}
    },
    status: {
        type: "String",
        default: "offline"
    }
}, { minimize: false });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password)
})

const User = new mongoose.model('User', userSchema);

module.exports = User;