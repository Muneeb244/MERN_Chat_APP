const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();


router.post('/signup', asyncMiddleware(async (req, res) => {
    const { name, email, password, image } = req.body;

    const duplicate = await User.findOne({ email });
    if (duplicate) return res.json({ error: 'User already exists' })

    const user = new User({ name, email, password, image });
    user.save()
    .then(user => {
        res.json({user})
    }).catch(err => res.json({ error: err }));
        // .then(user => {
        //     const token = jwt.sign({ id: user._id }, process.env.jwtSecret)
        //     res.json({ token: token });
        // }).catch(err => res.json({ error: err }));

}));

router.post('/login', asyncMiddleware( async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.json({ error: 'Invalid email/password' })

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({ error: 'Invalid email/password' })

    res.json({user})
    // const token = jwt.sign({ id: user.id, name: user.name }, process.env.jwtSecret)
    // res.json({ token });
}))


module.exports = router;