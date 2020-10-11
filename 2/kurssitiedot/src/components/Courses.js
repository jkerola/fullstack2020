import React from 'react'
import Course from './Course'

const Courses = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <div key={course.id}>
          <Course name={course.name} parts={course.parts} />
        </div>
        )}
    </div>
  )
}

export default Courses