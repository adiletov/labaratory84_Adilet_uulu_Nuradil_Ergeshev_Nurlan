const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.generationToken();
        await user.save();
        res.send(user)
    } catch (e) {
        res.status(404).send({error: 'Not found'})
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        res.status(404).send('Неверный логин или пароль')
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        res.status(404).send('Неверный логин или пароль')
    }
    res.send({token: user.token});
});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users)
});

module.exports = router;