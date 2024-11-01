const Grade = require('../../modules/grades');
const getGrades = async (req, res) => { 
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit;

    try {
        const grades = await Grade.find()
        .select('-__v -updatedAt -course')
        .skip(skip) 
        .limit(parseInt(limit)); 


        const totalCount = await Grade.countDocuments(); 
        res.status(200).json({
            items: grades, 
            totalCount, 
            totalPages: Math.ceil(totalCount / limit), 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id).populate('course'); 
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGrades,
    getGradeById,
};
