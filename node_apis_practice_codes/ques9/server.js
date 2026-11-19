// Create a NodeJS API for recording student attendance. Student records are maintained in memory, and the service should provide both individual and overall attendance information.

const express=require('express');
const app=express();
app.use(express.json());

let students = [
  { id: 1, name: "Tanya", present: 0, absent: 0 },
  { id: 2, name: "Jeeni", present: 0, absent: 0 }
];

// 1. GET /api/students: Return every student together with the current attendance count. Respond with 200 and "Students retrieved successfully".
app.get('/api/students',(req,res)=>{
    res.status(200).json({
        message:"Students retrieved successfully",
        students
    });
});



// 2. POST /api/attendance: Accept studentId and status. status may be present or absent. Missing fields return 400 with "studentId and status are required". An unknown student returns 404 with "Student not found".

// 3. Update the student's attendance information only after validation succeeds.

app.post('/api/attendance',(req,res)=>{
    const {studentId,status}=req.body;
    if (!studentId || !status){
        return res.status(400).json({message:"studentId and status are required"});
    }
    const student=students.find(s=>s.id===studentId);
    if (!student){
        return res.status(400).json({message:"Student not found"});
    }
    if (status==="present"){
        student.present+=1;
    }
    else if (status==="absent"){
        student.absent+=1;
    }
    res.status(200).json({student});
})



// 4. GET /api/attendance/:studentId: Return the attendance summary for one student, or 404 if the student does not exist.
app.get('/api/attendance/:studentId',(req,res)=>{
    const studentId=parseInt(req.params.id);
    const student=students.find(s=>s.id===studentId);
    if (!student){
        res.status(404).json({message:"Student not found"});
    }
    res.status(200).json(student);
})

// 5. GET /api/attendance: Return aggregate counts for present and absent records.
// 6. Return JSON and keep the API stable when invalid requests are received.

app.get('/api/attendance',(req,res)=>{
    const totals=students.reduce((acc,s)=>{
        acc.present+=s.present;
        acc.absent+=s.absent;
        return acc;
    },{present:0,absent:0});
    res.status(200).json(totals);
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.listen(8000);
