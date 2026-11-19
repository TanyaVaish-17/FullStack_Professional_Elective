const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    subject: {
        type: String,
        required: true
    }
});

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;