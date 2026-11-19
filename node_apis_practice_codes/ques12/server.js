// Create a NodeJS API for collecting responses to a predefined survey. Questions and submitted responses are stored in memory, and the service should provide both individual submissions and an aggregate summary.

const express = require('express');
const app = express();
app.use(express.json());

let questions = [
  { id: 1, text: "How satisfied are you?", options: ["Good", "Average", "Poor"] }
];
let feedbacks = [];

// 1. GET /api/questions: Return all survey questions and their available choices.
app.get('/api/questions',(req,res)=>{
    res.status(200).json(questions);
})



// 2. POST /api/feedback: Accept userId and responses. Missing or malformed data must return 400 with "Please provide valid feedback". Every supplied question id and selected option must be valid.

// 3. Store valid submissions in memory only after all validation checks pass.

app.post('/api/feedback',(req,res)=>{
    const {userId,responses}=req.body;
    if (!user || !Array.isArray(responses)){
        return res.status(400).json({message:"Please provide valid feedback"});
    }
    for (const r in responses){
        const question=questions.find(q=>q.id===r.questionId);
        if (!question || !question.options.includes(r.selectedOption)){
            res.status(400).json({message:"Please provide valid feedback"});
        }
    }
    feedbacks.push({userId,responses});
    res.status(200).json({message:"feedback recorded"});
});


// 4. GET /api/feedback/:userId: Return the responses submitted by the requested user.
app.get('/api/feedback/:userId',(req,res)=>{
    const userId=parseInt(req.params.id);
    const res=feedbacks.filter(r=>r.userId===userId);
    return res.status(200).json(res);
})



// 5. GET /api/feedback/summary: Return the number of submissions received for each available option.
app.get('/api/feedback/summary',(req,res)=>{
    const summary = {};
    feedbacks.forEach(f => {
        f.responses.forEach(r => {
            summary[r.selectedOption] = (summary[r.selectedOption] || 0) + 1;
        });
    });
    res.status(200).json(summary);
})


// 6. Do not expose internal validation information unnecessarily and ensure invalid input does not crash the application.


app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.listen(8000);