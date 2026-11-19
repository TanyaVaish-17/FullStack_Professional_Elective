const express = require('express');
const Teacher = require('../Models/teacherModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching teachers",
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching teacher",
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTeacher = new Teacher({
            user: req.body.user,
            age: req.body.age,
            subject: req.body.subject
        });

        const savedTeacher = await newTeacher.save();

        res.status(201).json({
            message: "Teacher Created Successfully",
            teacher: savedTeacher
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating teacher",
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            {
                user: req.body.user,
                age: req.body.age,
                subject: req.body.subject
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            teacher: teacher
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating teacher",
            error: error.message
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            teacher: teacher
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating teacher",
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            message: "Deleted successfully",
            teacher: teacher
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting teacher",
            error: error.message
        });
    }
});

module.exports = router;