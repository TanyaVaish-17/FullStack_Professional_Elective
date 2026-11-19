// Build a NodeJS API that maintains a simple candidate ballot using in-memory storage. The service should display candidates, accept a selection, and expose the current vote totals.

const express = require('express');
const app = express();
app.use(express.json());

let candidates = [
  { id: 1, name: "Candidate A", votes: 0 },
  { id: 2, name: "Candidate B", votes: 0 }
];

// 1. GET /candidates: Return every candidate with the current number of votes. Use status 200 and the message "All candidates retrieved successfully".
app.get('/candidates',(req,res)=>{
    res.status(200).json({
        message:"All candidates retrieved successfully",
        candidates
    });
});

// 2. POST /vote: Accept candidateId in the request body. If absent, return 400 with "candidateId is required". If it does not identify a candidate, return 404 with "Candidate not found". Otherwise increment that candidate's votes and return 200 with "Vote cast successfully".
app.post('/vote',(req,res)=>{
    const {candidateId}=req.body;
    if (candidateId===undefined){
        return res.status(400).json({message:"candidateId is required"});
    }
    const candidate=candidates.find(c=>c.id===candidateId);
    if (!candidate){
        return res.status(404).json({message:"Candidate not found"});
    }
    candidate.votes+=1;
    res.status(200).json({message:"Vote cast successfully"});
})

// 3. GET /result: Return the current vote totals for all candidates. Use status 200 and the message "Voting result".
app.get('result',(req,res)=>{
    res.status(200).json({message:"Voting results",candidates});
})


// 4. Ensure vote counts are updated only for valid candidate IDs and remain available for subsequent requests.
// 5. Return all responses in JSON format.

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.listen(8000);