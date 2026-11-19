// Fix an existing NodeJS API that calculates the growth earned on a principal amount when interest is compounded annually. The provided code contains intentional implementation errors.

// 1. POST /api/compound-interest: Accept principal, rate, and time and calculate compound interest using P × (1 + R/100)^T − P.
// 2. Require all three values and ensure each is a positive number.
// 3. Return status 400 with "Please provide valid input" when validation fails.
// 4. Return status 200 and a JSON result for valid requests.
// 5. Identify and fix deliberate errors involving the formula, validation conditions, HTTP status codes, and unsafe request handling. Invalid requests must not crash the server.

const express=require('express');
const app=express();
app.use(express.json());
function isValidPositiveNumber(val){
    return typeof val==='number' && !isNaN(val) && val>0;
}

app.post("/api/compound-interest",(req,res)=>{
    const {p,r,t}=req.body;
    if (!isValidPositiveNumber(p) || !isValidPositiveNumber(r) || isValidPositiveNumber(t)){
        return res.status(400).json({message:"Please provide valid input"});
    }
    const ci=p*Math.pow(1+r/100,t)-p;
    res.status(200).json({ci});
});

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})
app.listen(8000);