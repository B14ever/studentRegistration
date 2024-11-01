const Grade = require('../../modules/grades');

// Delete a grade
const deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to remove the grade
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.status(204).send(); // Send a 204 No Content response upon successful deletion
    } catch (error) {
        res.status(500).json({ message: error.message }); // Use 500 for server errors
    }
};

module.exports = {
    deleteGrade, // Export the deleteGrade function
};
