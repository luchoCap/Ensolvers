const express = require('express')
const router = express.Router();

const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks)
    res.send(tasks)
    
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task)
})

router.post('/', async(req, res) => {
    const { title, description}= req.body;
    const task = new Task({title, description});
    await task.save();
    res.json({status:'Tarea guardada'})
})


router.put('/:id', async (req, res )=> {
    const { title, description } = req.body
    const newTask ={ title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({status:'Task Update'})
    
})

router.delete('/:id', async (req, res) =>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({status:'Tarea eliminada'})
})
module.exports = router; 