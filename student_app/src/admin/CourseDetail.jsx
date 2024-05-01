import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CourseListModal from './CourseListDialog';

const CourseDetail = () => {
    const location = useLocation();
    const [isAccepted, setIsAccepted] = useState(true);
    const { courseDetails } = location.state || {};
    
    const acceptedStudents = courseDetails.acceptedStudents || [];
    const pendingStudents = courseDetails.pendingStudents || [];
    const [showModal, setShowModal] = useState(false);

    const handleCourseAccept = async (newCourse) => {
        try {
          const response = await fetch('http://172.23.18.14:3000/acceptCourse');
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      const acceptCourse = async (rollNo) => {
        try {
          const response = await fetch('http://172.23.18.14:3000/acceptCourse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: "6612a9330e742017490bdf0d", rollNo: rollNo, courseID: courseDetails._id}),
          });
    
          if (response.ok) {
          } else {
            console.error('Error creating course:', response.status);
          }
        } catch (error) {
          console.error('Error creating course:', error);
        }
      };

      const deleteCourse = async (rollNo) => {
        try {
          const response = await fetch('http://172.23.18.14:3000/deleteCourse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  token: "6612a9330e742017490bdf0d", courseID: courseDetails._id}),
          });
    
          if (response.ok) {
          } else {
            console.error('Error creating course:', response.status);
          }
        } catch (error) {
          console.error('Error creating course:', error);
        }
      };

      useEffect(() => {
      console.log('Course Details:');
      console.log(courseDetails);
    }, [courseDetails]);

  return (
 
<div className="course-details" style={{ maxWidth: '700px' }}>
      <h2>Course Details</h2>
      <p>Course Name: {courseDetails.name}</p>
      <p>Course Code: {courseDetails.code}</p>
      <p>Course Code: {courseDetails.code}</p>
      <button className="create-course-btn" onClick={() => setIsAccepted(false)}>
        Pending Students ({pendingStudents.length})
        </button>
        <button className="create-course-btn" onClick={() => setIsAccepted(true)}>
        Enrolled Students ({acceptedStudents.length})
        </button>

        <button className="create-course-btn" onClick={() => deleteCourse()}>
        Delete Course
        </button>
        <br/>
        {isAccepted && (
            <div>
            {acceptedStudents.map((student) => (
                <div
                  key={student._id}
                  className="student-item"
                >
                  <div className="course-code">{student.rollNo}</div>
                </div>
              ))}
              </div>
        )}
        {!isAccepted && (
            <div>
            {pendingStudents.map((student) => (
                <div
                  key={student._id}
                  className="student-item"
                >
                  <div className="course-code">{student.rollNo}</div>
                  <button className="create-course-btn" onClick={() => acceptCourse(student.rollNo)}>Accept</button>
                </div>
              ))}
              </div>
        )}

<div>
        {showModal && (
          <CourseListModal
          courseList={acceptedStudents}
            onClose={() => setShowModal(false)}
            onCourseAccepted={handleCourseAccept}
          />
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
