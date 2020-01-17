const express = require('express')
const router = express.Router();

const Task = require('../models/task')
const Folder = require('../models/folders')

router.get('/api/folders', async (req, res) => {
    const folders = await Folder.find()
    console.log(folders)
    res.send(folders)
})

router.post('/api/folders', async (req, res) => {
    const { title } = req.body;
    const folders = new Folder({ title });
    await folders.save();
    res.json({ status: 'Carpeta guardada' })
})

router.delete('/api/folders/:id', async (req, res) => {
    const folder = await Folder.findOne({ _id: req.params.id })
    if (folder) {
        await Task.deleteMany({ folder_id: folder._id });
        await folder.remove()
    }

    res.json({ status: 'Carpeta Eliminada' })
})

router.post('/api/tasks/:id', async (req, res) => {

    const folder = await Folder.findOne({ _id: req.params.id })
    console.log(folder)
    if (folder) {
        const { title, description } = req.body;
        const task = new Task({ title, description });
        task.folder_id = folder._id
        await task.save();
        console.log(req.params.id)
        res.json({ status: 'Tarea guardada' })
    } else {
        res.send("fallo")
    }

})





router.get('/api/tasks/:id', async (req, res) => {
    const tasks = await Task.find({ folder_id: req.params.id });
    console.log(tasks)
    res.send(tasks)
});

router.get('/api/tasks/edit/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    console.log(tasks)
    res.send(tasks)
});



// router.post('/api/tasks', async (req, res) => {
//     const { title, description } = req.body;
//     const task = new Task({ title, description });
//     await task.save();
//     res.json({ status: 'Tarea guardada' })
// })


router.put('/api/tasks/:id', async (req, res) => {
    const { title, description } = req.body
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask)
    res.json({ status: 'Task Update' })

})


router.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ status: 'Tarea eliminada' })
})
module.exports = router; 