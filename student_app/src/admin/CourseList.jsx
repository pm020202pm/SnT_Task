import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCourse from './CreateCourse';

const CourseList = () => {
  const navigate = useNavigate(); 
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://172.23.18.14:3000/allCoursesList');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);


  const handleCreateCourse = async (newCourse) => {
    try {
      const response = await fetch('http://172.23.18.14:3000/allCoursesList');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseClick = (course) => {
    console.log(course);
    navigate(`/admin/${course.code}`,
     { state: { courseDetails: course } }
    );
    // navigate(`/admin/${course.code}`, { state: { courseDetails: course } });
  };

  return (
    <div>
      <div className="top-bar">
        <h1>Courses</h1>
        <button className="create-course-btn" onClick={() => setShowModal(true)}>Create Course</button>
      </div>
      <div className="courses-container">
        {courses.map((course) => (
          <div
            key={course._id}
            className="course-item"
            onClick={() => handleCourseClick(course)}
          >
            <div className="course-code">{course.code}</div>
            <div className="course-name">{course.name}</div>
            <div className="course-professor">Professor: Yogesh</div>
          </div>
        ))}
      </div>
      <div>
        {showModal && (
          <CreateCourse
            onClose={() => setShowModal(false)}
            onCourseCreated={handleCreateCourse}
          />
        )}
      </div>
    </div>
  );
};

export default CourseList;
