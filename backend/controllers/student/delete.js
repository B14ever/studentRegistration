const Student = require('../../modules/studdent');


const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    
    deleteStudent
};
