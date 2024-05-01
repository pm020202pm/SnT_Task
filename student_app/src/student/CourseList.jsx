import React, { useState, useEffect } from 'react';

const CourseList = (token) => {

  const [name, setName] = useState([]);
  const [rollNo, setRollNo] = useState([]);
  const [emailId, setEmailId] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);
const [listType, setListType] = useState("accepted");

  useEffect(() => {
    const fetchCourses = async () => {
      const t=  token.token;
      try {
        const response = await fetch('http://172.23.18.14:3000/studentData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: t}),
      });
        const data = await response.json();
        setName(data.name);
        setRollNo(data.rollNo);
        setEmailId(data.emailID);
        setCourses(data.courses);
        setPendingRequests(data.pendingRequests);
        console.log(emailId);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const allCourses = async () => {
      try {
        const response = await fetch('http://172.23.18.14:3000/allCoursesList');
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    allCourses();
    fetchCourses();
  }, [listType]);

  const handleSubmit = async (courseID) => {
    try {
      const response = await fetch('http://172.23.18.14:3000/requestCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({rollNo: rollNo, courseID: courseID }),
      });

      if (response.ok) {
      } else {
        console.error('Error creating course:', response.status);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };


  return (
    <div>
      <h1>Welcome</h1>
      <h2>{name}</h2>
      <h3>{rollNo}</h3>
      <h3>{emailId}</h3>
      <div className="top-bar">
        <h1>Courses</h1>
        <div>
        <button className="create-course-btn" onClick={() => setListType("accepted")}>Accepted Courses</button>
      <button className="create-course-btn" onClick={() => setListType("pending")}>Pending Courses</button>
      <button className="create-course-btn" onClick={() => setListType("request")}>Request Course</button>
        </div>
      </div>
      <div className="courses-container">
      {listType=="accepted" && (
            <div>
            {courses.length==0 && (
            <h2>No Courses</h2>
            )}
            {courses.map((course) => (
              <div
              key={course._id}
              className="course-item"
            >
              <div className="course-code">{course.code}</div>
              <div className="course-name">{course.name}</div>
            </div>
              ))}
              </div>
        )}
        {listType=="pending" && (
            <div>
            {pendingRequests.map((course) => (
                  <div
                  key={course._id}
                  className="course-item"
                >
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>
              ))}
              </div>
        )}
        {listType=="request" && (
            <div>
            {allCourses.map((course) => (
                  <div
                  key={course._id}
                  className="course-item"
                >
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                  <button className="create-course-btn" onClick={() => handleSubmit(course._id)}>Request Course</button>

                </div>
              ))}
              </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
