import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './component/layout/layout'
import Home from './pages/home'
import {AddStudent,ViewStudent,ViewStudents,EditStudent} from './pages/student/index'
import {AddGrade,EditGrade,ViewGrade,ViewGrades} from './pages/grade/index'
import { AddCourse,EditCourse,ViewCourses,ViewCourse } from './pages/course/index'
function App() {
  return (
   
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='student' element={<ViewStudents />} />
          <Route path='student/:id'  element={<ViewStudent />} />
          <Route path='student/add'  element={<AddStudent />} />
          <Route path='student/edit/:id'  element={<EditStudent />} />
          {/* Grade */}
          <Route path='grade' element={<ViewGrades />} />
          <Route path='grade/:id'  element={<ViewGrade />} />
          <Route path='grade/add'  element={<AddGrade />} />
          <Route path='grade/edit/:id'  element={<EditGrade />} />
           {/* Course */}
           <Route path='course' element={<ViewCourses />} />
          <Route path='course/:id'  element={<ViewCourse />} />
          <Route path='course/add'  element={<AddCourse />} />
          <Route path='course/edit/:id'  element={<EditCourse />} />
        </Route>
      </Routes>
   
  )
}

export default App
