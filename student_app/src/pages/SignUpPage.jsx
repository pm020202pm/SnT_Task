import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (name, emailId, rollNo,password) => {
    try {
      const response = await fetch("http://172.23.18.14:3000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:name, emailID:emailId, rollNo: rollNo, password: password}),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('SignUp failed');
      }
    } catch (error) {
      console.error('Error signing up in:', error);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <br />
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <br />
      <label>EmailId:
        <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
      </label>
      <br />
      <label>
        Roll No:
        <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)}/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <br />
      <button onClick={()=>handleSignUp(name, emailId,rollNo,password)}>Register</button>
    </div>
  );
};

export default SignUpPage;