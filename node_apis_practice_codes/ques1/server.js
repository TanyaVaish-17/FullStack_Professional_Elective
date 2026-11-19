const express=require('express');
const app=express();

app.use(express.json());

let polls = [   
  { id: 1, question: "Favorite language?", options: [
      { id: 1, text: "JavaScript", votes: 0 },
      { id: 2, text: "Python", votes: 0 }
  ]}
];


// 1. GET /api/polls: Return all stored polls with their questions, choices, and response counts. Respond with status 200 and the message "Polls retrieved successfully".

app.get('/api/polls',(req,res)=>{
    res.status(200).json({
        message:"Polls retrieved successfully",
        polls:polls
    });
});

// 2. GET /api/polls/:id: Return the poll identified by the supplied id. If no matching poll exists, return status 404 with "Poll not found".
app.get('/api/polls/:id',(req,res)=>{
    const pollId=parseInt(req.params.id);
    const poll=polls.find(p=>p.id===pollId);
    if (!poll){
        return res.status(404).json({message:"Poll not found"});
    }
    res.status(200).json(poll);
})

// 3. POST /api/vote: Accept pollId and optionId. Missing values should produce status 400 with "pollId and optionId are required". An unknown poll should produce 404 with "Poll not found". An option that does not belong to the poll should produce 400 with "Invalid option". A valid selection must increase the corresponding count.

app.post('/api/vote',(req,res)=>{
    const {pollId,optionId}=req.body;
    if (pollId===undefined || optionId===undefined){
        return res.status(400).json({message:"pollId and optionId are required"});
    }
    const poll=polls.find(p=>p.id===pollId);
    if (!poll){
        return res.status(404).json({message:"Poll not found"});
    }
    const option=poll.options.find(o=>o.id===optionId);
    if (!option){
        return res.status(400).json({message:"Invalid option"});
    }
    option.votes+=1;
    res.status(200).json(poll);
})



// 4. GET /api/polls/:id/results: Return the response count for every option and the overall number of responses for that poll. Use status 200.

app.get('/api/polls/:id/results',(req,res)=>{
    const pollId=parseInt(req.params.id);
    const poll=polls.find(p=>p.id===pollId);
    if (!poll){
        return res.status(404).json({message:"Poll not found"});
    }
    const totalResponses=poll.options.reduce((sum,o)=>sum+o.votes,0);
    res.status(200).json({
        results:poll.options.map(o=>({optionId:o.id,text:o.text,votes:o.votes})),
        totalResponses
    })
})


// 5. All endpoints must return JSON and invalid requests must not terminate the server.

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})

app.listen(8000);