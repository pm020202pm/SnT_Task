import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (rollNo,password) => {
    const signurl = (isAdmin) ? "/adminSignin" : "/signin";
    try {
      const response = await fetch("http://172.23.18.14:3000/"+signurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNo: rollNo, password: password}),
      });

      if (response.ok) {
        console.log(response.ok) ;
        const token= await response.json();
        localStorage.setItem('token', token);
        if(isAdmin) localStorage.setItem('isAdmin', true);
        isAdmin ? navigate('/admin') : navigate('/home');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const navigateSignUp = async (rollNo,password) => {
    navigate('/signup')
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Admin
      <label/>
      <br />
        {(isAdmin)? "AdminID" : "Roll No"}
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={()=>handleLogin(rollNo,password)}>LogIn</button>
      <br />
      <button onClick={()=>navigateSignUp()}>SignUp</button>
      
    </div>
  );
};

export default LoginPage;