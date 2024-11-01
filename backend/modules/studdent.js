const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    grandfatherName: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
   
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    emergencyContactName: {
        type: String,
        required: true
    },
    emergencyContactRelation: {
        type: String,
        required: true
    },
    emergencyContactPhone: {
        type: String,
        required: true
    },
    emergencyContactPhoto: {
        type: String,
        required: true
    },
    grades: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        required: true
    },
    address: {
        kebele: {
            type: String,
            required: true
        },
        wereda: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
