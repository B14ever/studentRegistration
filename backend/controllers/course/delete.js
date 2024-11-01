const Course = require('../../modules/course');
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(204).send(); // No content, deletion successful
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { deleteCourse };
