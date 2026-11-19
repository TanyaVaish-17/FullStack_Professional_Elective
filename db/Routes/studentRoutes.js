const express = require('express');
const Student = require('../Models/studentModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching students",
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching student",
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newStudent = new Student({
            user: req.body.user,
            age: req.body.age,
            course: req.body.course
        });

        const savedStudent = await newStudent.save();

        res.status(201).json({
            message: "Student Created Successfully",
            student: savedStudent
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating student",
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                user: req.body.user,
                age: req.body.age,
                course: req.body.course
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json({
            message: "Student updated successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating student",
            error: error.message
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json({
            message: "Student updated successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating student",
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json({
            message: "Deleted successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting student",
            error: error.message
        });
    }
});

module.exports = router;