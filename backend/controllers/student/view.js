const Student = require('../../modules/studdent');

const getStudents = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit; 
    try {
      
        const students = await Student.find()
        .select('-__v -updatedAt -grades -address -birthdate -photo -emergencyContactName -emergencyContactRelation -emergencyContactPhone -emergencyContactPhoto')
            .skip(skip) 
            .limit(parseInt(limit)); 
        const totalCount = await Student.countDocuments(); 

        res.status(200).json({
            items: students, 
            totalCount, 
            totalPages: Math.ceil(totalCount / limit), 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('grades');
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {

    getStudents,
    getStudentById,
   
};
