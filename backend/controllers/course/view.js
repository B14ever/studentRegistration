const Course = require('../../modules/course');
const getCourses = async (req, res) => { 
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit; 

    try {
        const courses = await Course.find().select('-__v -updatedAt').skip(skip).limit(parseInt(limit)); 
        
        const totalCount = await Course.countDocuments(); 

        res.status(200).json({
            items: courses,
            totalCount, 
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCourses, getCourseById };
