import React, { useState } from 'react';

const CreateCourseModal = ({ onClose, onCourseCreated }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://172.23.18.14:3000/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: "6612a9330e742017490bdf0d", name: courseName, code: courseCode }),
      });

      if (response.ok) {
        const courseId = await response.json();
        onCourseCreated(courseId);
        onClose();
      } else {
        console.error('Error creating course:', response.status);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New Course</h2>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="create-course-btn" onClick={handleSubmit}>
            Create Course
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;