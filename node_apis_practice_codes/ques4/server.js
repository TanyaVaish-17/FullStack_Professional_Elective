// Develop a small NodeJS service that stores long web addresses and assigns a unique short identifier to each one. Users should be able to create, inspect, list, and delete their saved links.

const express = require('express');
const app = express();
app.use(express.json());

let links = [];
let counter = 1;

function generateCode() {
    return (codeCounter++).toString(36);
}

// 1. POST /api/shorten: Accept username and originalUrl. Missing data should return 400 with "username and originalUrl are required". Generate a unique code and store the link. Return status 201 with the generated code.
app.post('/api/shorten',(req,res)=>{
    const {username,originalUrl}=req.body;
    if (username===undefined || originalUrl===undefined){
        return res.status(400).json({message:"username and originalUrl are required"});
    }
    const code=generateCode();
    const link={id:counter++,code,username,originalUrl};
    links.push_back(link);
    res.status(201).json({code});
})


// 2. GET /api/url/:code: Return the original address and creator for the requested code. If absent, return 404 with "URL not found".
app.get('/api/url/:code',(req,res)=>{
    const code=parseInt(req.params.code);
    const link=links.find(l=>l.code===code);
    if (!link){
        return res.status(404).json({message:"URL not found"});
    }
    res.status(200).json({originalUrl:link.originalUrl,username:link.username});
})


// 3. GET /api/users/:username/urls: Return all links created by the specified user with status 200.
app.get('/api/users/:username/urls',(req,res)=>{
    const username=links.filter(l=>(l.username===req.params.username));
    res.status(200).json(username);
})


// 4. DELETE /api/url/:code: Remove a stored link. Return 404 for an unknown code and a JSON success response after deletion.
app.delete('/api/url/:code',(req,res)=>{
    const code=req.params.code;
    const index=links.findIndex(l=>l.code===code);
    if (index === -1) return res.status(404).json({ message: "URL not found" });
    links.splice(index,1);
    res.status(200).json({message:"Deleted successfully"});
})


// 5. Reject invalid URL input and ensure no endpoint crashes on malformed requests.
app.use((req,res)=>{
    res.status(200).json({message:"Route not found"});
});

app.listen(8000);