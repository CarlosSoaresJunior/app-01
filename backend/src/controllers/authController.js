const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');



router.post('/novo', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuario ja Existe ' })
       
            const user = await User.create(req.body);
       
        user.password = undefined;
       
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Falha no cadastro' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

if (!user)
        return res.status(400).send({ error: 'Usuario não encontrado' });

if (!await bcrypt.compare(password, user.password))

 return res.status(400).send({error: 'Senha Invalida'});

        res.send({user});
});

module.exports = (app) => app.use('/cadastro', router);