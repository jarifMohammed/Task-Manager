const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})
router.patch('/tasks/:id' , async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates= ['description' , 'completed']

    const isValid = updates.every((update)=>{
        return allowedUpdates.includes(update)

        

    })
    if(!isValid){
        return res.status(400).send({error :'Invalid operation'}) 
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(404).send(e)
    }

    
})
router.delete('/tasks/:id' , async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()

        }
        res.send(task)

    }catch(e) {
        res.status(500).send()

    }
})

module.exports = router