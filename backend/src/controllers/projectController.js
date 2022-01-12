const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const Project = require('../models/project')
const Task = require('../models/task')

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('user');
        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ error: 'Falha de Leitura de Projeto ' });
    }
});

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('user');
        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Falha de Leitura de Projeto ' });
    }
});

router.post('/', async (req, res) => {
    try {
        const project = await Project.create({...req.body, user: req.userId});
        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Falha ao Criar Projeto ' });
    }
});
router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId });
});
router.delete('/:projectId', async (req, res) => {
    try {
     await Project.findByIdAndRemove(req.params.projectId).populate('user');
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Projeto não Deletado ' });
    }
});

module.exports = app => app.use("/home", router);