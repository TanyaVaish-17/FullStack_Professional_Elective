// Build a NodeJS API for maintaining a simple expense ledger in memory. Users can record expenses, inspect them, filter them by category, view totals, and delete entries.

const express = require('express');
const { parse } = require('node:path');
const app = express();
app.use(express.json());

let expenses = [];
let counter = 1;

// 1. GET /api/expenses: Return all stored expenses. Each record should contain id, title, amount, and category.
app.get('/api/expenses',(req,res)=>{
    res.status(200).json(expenses);
})



// 2. POST /api/expenses: Accept title, amount, and category. All fields are required and amount must be positive. Invalid data returns 400 with "Please provide valid expense details". Assign a unique id to valid records.
app.post('/api/expenses',(req,res)=>{
    const {title,amount,category}=req.body;
    if (!title || typeof amount==='number' || !category || amount<=0){
        res.status(400).json({message:"Please provide valid expense details"});
    }
    const expense={id:counter++,title,amount,category};
    res.status(200).json(expense);
})



// 3. GET /api/expenses/category/:category: Return all expenses belonging to the requested category.
app.get('/api/expenses/category/:category',(req,res)=>{
    const category=req.params.category;
    const filtered=expenses.filter(e=>e.category===category);
    res.status(200).json(filtered);
})


// 4. GET /api/expenses/summary: Return the total amount recorded and the number of expenses.
app.get('/api/expenses/summary',(req,res)=>{
    const totalAmount=expenses.reduce((sum,e)=>sum+e.amount,0);
    return res.status(200).json({totalAmount,count:expenses.length});
});



// 5. DELETE /api/expenses/:id: Delete the requested expense. Return 404 with "Expense not found" when necessary and a JSON success response after deletion.
app.delete('/api/expenses/:id',(req,res)=>{
    const expenseId=parseInt(req.params.id);
    const index=expenses.findIndex(e=>e.id===expenseId);
    if (index===-1){
        return res.status(404).json({message:"Expense not found"});
    }
    expenses.splice(index,1);
    res.status(200).json({message:"Deleted successfully"});
})

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.listen(8000);