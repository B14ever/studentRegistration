// controllers/grade/add.js
const Grade = require('../../modules/grades');

// Create a new grade
const createGrade = async (req, res) => {
    try {
   
        const grade = new Grade(req.body);
        await grade.save();
        res.status(201).json(grade);
    } catch (error) {
   
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createGrade };
