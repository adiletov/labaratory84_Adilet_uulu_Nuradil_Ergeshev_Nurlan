const express = require('express');
const router = express.Router();
const Task = require('../modules/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const user = req.user;
    const newTask = req.body;
    newTask.userId = user._id;

    const task = await Task(newTask);
    try {
        await user.generationToken();
        await task.save();
        res.send(task)
    } catch (e) {
        res.status(404).send({error: 'not found'})
    }
});

router.get('/', auth, async (req, res) => {
    const user = req.user;
    const tasks = await Task.find({userId: user._id});
    res.send(tasks)
});

router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    try{
        const task = await Task.findOne({userId: user.id, _id: id});

        if (!task) {
            res.status(404).send({error: 'Такой задачи для редактирование, у етого пользователя нет'})
        }
        task.title = req.body.title;
        task.description = req.body.description;
        task.status = req.body.status;

        await task.save();
    }catch (e) {
        res.status(404).send({error: 'Not found'})
    }

    res.send('Update')
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    try{
        const task = await Task.findOne({userId: user.id, _id: req.params.id});

        if (!task) {
            res.status(404).send({error: 'Не вижу такой задачи у етого пользователя для удаления'})
        }

        await Task.deleteOne({_id: task._id});
        res.send('delete')

    }catch (e) {
        res.status(404).send({error: 'Not found'})
    }
});

module.exports = router;