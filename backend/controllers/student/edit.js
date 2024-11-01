const Student = require('../../modules/studdent');
const updateStudent = async (req, res) => {
  try {
    console.log(req.body);
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('grades'); 

    if (!student) return res.status(404).json({ message: "Student not found" });
   
    res.status(200).json(student); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updateStudent,
};
