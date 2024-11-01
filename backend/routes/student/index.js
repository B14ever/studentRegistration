const express = require('express');
const router = express.Router();
const { createStudent } = require('../../controllers/student/add');
const { getStudents, getStudentById } = require('../../controllers/student/view');
const { updateStudent } = require('../../controllers/student/edit');
const { deleteStudent } = require('../../controllers/student/delete');

router.post('/', createStudent);               
router.get('/', getStudents);                    
router.get('/:id', getStudentById);              
router.put('/:id', updateStudent);               
router.delete('/:id', deleteStudent);            

module.exports = router;
