const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const task = mongoose.model("Task", taskSchema);

module.exports = task;
