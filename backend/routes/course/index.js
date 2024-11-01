const express = require('express');
const router = express.Router();
const {createCourse} = require('../../controllers/course/add');
const {getCourses,getCourseById} =  require('../../controllers/course/view');
const {deleteCourse} = require('../../controllers/course/delete');
const {updateCourse} =  require('../../controllers/course/edit');
router.post('/',createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
