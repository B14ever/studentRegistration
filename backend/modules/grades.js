// gradeSchema.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }],
    grade: {
        type: String,
        required: true,  
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Grade', gradeSchema);
