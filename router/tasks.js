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
        res.status(404).send(e)
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
    const task = await Task.findOne({userId: user.id, _id: id});

    if (!task) {
        res.status(404).send({error: 'Not found'})
    }

    await Task.updateOne({_id: task._id}, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }
    });
    res.send('Update')
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    const task = await Task.findOne({userId: user.id, _id: req.params.id});
    if (!task) {
        res.status(404).send({error: 'not found'})
    }
    await Task.deleteOne({_id: task._id});
    res.send('delete')
});

module.exports = router;