const express = require('express');
const app = express();
app.use(express.json());

const students = [
    {
        id: 1,
        name: "Tanya",
        age: 20,
        course: "CS"
    },
    {
        id: 2,
        name: "Srashti",
        age: 21,
        course: "CS-AI"
    },
    {
        id: 3,
        name: "Avni",
        age: 20,
        course: "IT"
    }
];

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const stud = students.find(student => student.id === id);
    if (!stud) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    res.json(stud);
});

app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };
    students.push(newStudent);
    res.status(201).json({
        message: "Student Created Successfully",
        student: newStudent
    });
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    const deletedStudent = students.splice(index, 1);
    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


app.listen(3000, () => {
    console.log("Server Started");
});
