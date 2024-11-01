const Grade = require('../../modules/grades');

// Update a grade
const updateGrade = async (req, res) => {
    try {
        
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.status(200).json(grade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    updateGrade,
};
