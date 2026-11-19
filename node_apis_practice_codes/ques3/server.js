// Create a NodeJS API for managing registrations to workshops. Events are stored in memory, and the application should keep track of how many participants have enrolled in each workshop.

const express = require('express');
const app = express();
app.use(express.json());

let events = [
  { id: 1, name: "Intro to Node.js", enrolled: 0 },
  { id: 2, name: "Advanced React", enrolled: 0 }
];

// 1. GET /api/events: Return all workshops/events with their current enrollment count. Respond with 200 and "Events retrieved successfully".
app.get('/api/events',(req,res)=>{
    res.status(200).json({
        message:"Events retrieved successfully",
        events
    });
});


// 2. POST /api/register: Accept eventId. If it is missing, return 400 with "eventId is required". If the event is unknown, return 404 with "Event not found". Otherwise increase its registration count and return 200 with "Registration successful".
app.post('/api/register',(req,res)=>{
    const {eventId}=req.body;
    if (eventId===undefined){
        return res.status(400).json({message:"eventId is required"});
    }
    const event=events.find(e=>e.id===eventId);
    if (!event){
        return res.status(404).json({message:"Event not found"});
    }
    event.enrolled+=1;
    res.status(200).json({message:"Registration successful",event});
})


// 3. GET /api/events/:id: Return the selected event and its current registration count. Return 404 with "Event not found" when the id is invalid.
app.get('/api/events/:id',(req,res)=>{
    const eventId=parseInt(req.params.id);
    const event=events.find(e=>e.id===eventId);
    if (!event){
        return res.status(404).json({message:"Event not found"});
    }
    res.status(200).json(event);
})


// 4. POST /api/cancel: Accept eventId and decrease the count when at least one participant is registered. Handle invalid event IDs appropriately.

app.post('/api/cancel',(req,res)=>{
    const {eventId}=req.body;
    if (eventId===undefined){
        return res.status(400).json({message:"eventId is required"});
    }
    const event=events.find(e=>e.id===eventId);
    if (!event){
        return res.status(404).json({message:"Event not found"});
    }
    if (event.enrolled>0){
        event.enrolled-=1;
    }
    res.status(200).json(event);
})


// 5. Keep the service running for malformed requests and return JSON responses.
app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})

app.listen(8000);