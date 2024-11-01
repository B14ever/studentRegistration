const express = require('express');
const router = express.Router();
const { createGrade } = require('../../controllers/grades/add');
const { getGrades, getGradeById } = require('../../controllers/grades/view');
const { updateGrade } = require('../../controllers/grades/edit');
const { deleteGrade } = require('../../controllers/grades/delete');

router.post('/', createGrade);                   
router.get('/', getGrades);                      
router.get('/:id', getGradeById);                 
router.put('/:id', updateGrade);                 
router.delete('/:id', deleteGrade);              

module.exports = router;
