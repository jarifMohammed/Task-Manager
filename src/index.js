const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000
// app.use converts incoming json into an object so that we can use it in request handlers
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })

    // console.log(req.body);
    // res.send()
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
    // console.log(req.params);
})

app.patch('/users/:id' ,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['name','password','email','age']
    const isValid = updates.every((update)=>{
        return allowedupdates.includes(update)

        

    })
    if(!isValid){
        return res.status(400).send({error :'Invalid operation'}) 
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true , runValidators:true})

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(e){
        res.status(400).send(e)

    }
})

app.delete('/users/:id' , async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()

        }
        res.send(user)

    }catch(e) {
        res.status(500).send()

    }
})




app.post('/tasks', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
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

app.get('/tasks/:id', async (req, res) => {
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
app.patch('/tasks/:id' , async (req,res) =>{
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
app.delete('/tasks/:id' , async (req,res)=>{
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

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
