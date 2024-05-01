import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from './CourseList';

const AdminPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    console.log('Logging out');
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>
        <CourseList token={token} />
    </div>
  );
};

export default AdminPage;