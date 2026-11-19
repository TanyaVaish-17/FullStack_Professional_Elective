// Debug a NodeJS API that calculates the area of common geometric figures. The starter project has intentional errors in selection logic, calculations, validation, and error responses.

// 1. POST /api/area: Accept a shape and its required dimensions. Supported shapes are circle, rectangle, and square.
// 2. Calculate circle area as π × radius², rectangle area as length × width, and square area as side².
// 3. Reject unsupported shapes and missing, non-numeric, zero, or negative dimensions with status 400 and "Please provide valid input".
// 4. Return a JSON result with status 200 for valid input.
// 5. Debug the supplied implementation without unnecessarily changing the project structure. Correct mathematical, validation, status-code, and server-stability defects.

const express=require('express');
const app=express();
app.use(express.json());

const validShapes=["circle","rectangle","square"];

function isValidPositiveNumber(val){
    return typeof val==='number' && !isNaN(val) && val>0;
}

app.post('/api/area',(req,res)=>{
    const {shape}=req.body;
    if (!validShapes.includes(shape)){
        return res.status(400).json({message:"Please provide valid input"});
    }
    let area;
    if (shape=="circle"){
        const {r}=req.body;
        if (!isValidPositiveNumber(r)){
            return res.status(400).json({message:"Please provide valid input"});
        }
        area=Math.PI*r*r;
    }
    else if (shape=="rectangle"){
        const {l,b}=req.body;
        if (!isValidPositiveNumber(l) || !isValidPositiveNumber(b)){
            return res.status(400).json({message:"Please provide valid input"});
        }
        area=l*b;
    }
    else if (shape=="square"){
        const {s}=req.body;
        if (!isValidPositiveNumber(s)){
            return res.status(400).json({message:"Please provide valid input"});
        }
        area=s*s;
    }
    res.status(200).json({area});
})

app.use((req,res)=>{
    res.status(200).json({message:"Route not found"});
})

app.listen(8000);