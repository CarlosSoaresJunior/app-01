const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')




function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400.
    });
}

router.post('/cadastro', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já Existe ' })

        const user = await User.create(req.body);

        user.password = undefined;
        return res.send({
            user, token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Falha no cadastro' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado' });

    if (!await bcrypt.compare(req.body.password, user.password))

        return res.status(400).send({ error: 'Senha Inválida' });

    user.password = undefined;


    res.send({
        user,
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/', router);