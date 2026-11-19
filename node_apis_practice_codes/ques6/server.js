// Repair a NodeJS API that computes simple interest from an amount, annual percentage rate, and duration. The starter implementation intentionally contains defects that must be identified and corrected.

const express = require('express');
const app = express();
app.use(express.json());

function isValidPositiveNumber(val) {
    return typeof val === 'number' && !isNaN(val) && val > 0;
}

// 1. POST /api/simple-interest: Read principal, rate, & time from the request body and calculate interest using (principal × rate × time)/100.
// 2. Accept only positive numeric values for all three inputs.
// 3. For missing, non-numeric, zero, or negative input, return status 400 with "Please provide valid input".
// 4. Valid requests must return the calculated interest as JSON with status 200.
// 5. Correct the deliberate defects in calculation logic, validation, response status handling, and request processing. The application must not crash when invalid data is submitted.

app.post('/api/simple-interest',(req,res)=>{
    const {principal,rate,time}=req.body;
    if (!isValidPositiveNumber(principal) || !isValidPositiveNumber(rate) || !isValidPositiveNumber(time))
        return res.status(400).json({ message: "Please provide valid input" });
    const si=(principal*rate*time)/100;
    res.status(200).json({si});
})

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.listen(8000);