// Build a NodeJS backend for a lightweight workboard. The application stores tasks in memory and supports creation, retrieval, modification, filtering, and removal.

const express=require('express');
const { parse } = require('node:path');
const app=express();
app.use(express.json());
const tasks=[];
const counter=1;
const validStatuses = ["pending", "in-progress", "completed"];

// 1. GET /api/tasks: Return all tasks with status 200.
app.get('/api/tasks',(req,res)=>{
    res.status(200).json(tasks);
})



// 2. POST /api/tasks: Accept title and status. The title is mandatory, while status must be pending, in-progress, or completed. Invalid input returns 400 with "Please provide valid task details". Assign a unique id to each valid task.
app.post('/api/tasks',(req,res)=>{
    const {title,status}=req.body;
    if (!title || !validStatuses.includes(status)){
        return res.status(400).json({message:"Please provide valid task details"});
    }
    const task={id:counter++,title,status};
    tasks.push(task);
    res.status(200).json(task);
})



// 3. PATCH /api/tasks/:id: Update one or more supplied task fields. Return 404 with "Task not found" for an unknown task and reject an unsupported status.
app.patch('/api/tasks/:id',(req,res)=>{
    const taskId=parseInt(req.params.id);
    const task=tasks.find(t=>t.id===id);
    if (!task){
        res.status(404).json({message:"Task"})
    }
    const {title,status}=task;
    if (!status || !validStatuses.includes(status)){
        res.status(404).json({message:"Task not found"});
    }
    if (title) task.title=title;
    if (status) task.status=status;
    res.status(200).json(task); 
})



// 4. DELETE /api/tasks/:id: Remove a task by id. Return 404 when it does not exist and 200 after successful removal.
app.delete('/api/tasks/:id',(req,res)=>{
    const index=tasks.findIndex(t=>t.id===parseInt(req.params.id));
    if (index==-1){
        return res.status(404).json({message:"Task not found"});
    }
    tasks.splice(index,1);
    res.status(200).json({message:"Task removed successfully"});
})



// 5. GET /api/tasks/status/:status: Return tasks whose status matches the requested value.
app.get('/api/tasks/status/:status',(req,res)=>{
    const status=req.params.status;
    const task=tasks.filter(t=>t.status===status);
    res.status(200).json(task);
})



// 6. Use the supplied in-memory store and return JSON responses.
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(8000);