// import React, { useState } from 'react';

const CourseListModal = (courseList, { onClose, onCourseAccepted }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New Course</h2>
        {courseList.map((student) => (
            console.log(student),
          <div
            key={student._id}
            className="student-item"
          >
            <div className="course-code">{student.rollNo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseListModal;