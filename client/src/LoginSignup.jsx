import React, { useState } from 'react';
import './LoginSignup.css';
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { PiBird } from "react-icons/pi";
import { useAuth } from './AuthContext';

const LoginSignup = () => {
   //tracks whether you are login (false) and signup (true)
  const [isSignUp, setIsSignUp] = useState(true);
  

  //store form inputs 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  
  //
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(''); 
    setLoading(true);

    let result;
    
    if (isSignUp) {
      //check all fields are filled
      if (!name || !email || !password || !year) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      //call register func 
      result = await register(name, email, password, year);
    } else {
      // LOGIN MODE
      // Check email and password are filled
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
    
      //call login func
      result = await login(email, password);
    }

    setLoading(false);

    // if failed then show error
    if (!result.success) {
      setError(result.error);
    }
    //if successfully user is loggin and and app.jsp with show 
  };

  //switch between login and signup
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(''); //clear errors when switching
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <PiBird /> 
        </div>
        <div className="text">
          {isSignUp ? 'Sign up for Dalibird' : 'Log in to Dalibird'}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          
          {/*name*/}
          {isSignUp && (
            <div className="input">
              <IoPerson className="icon" />
              <input 
                type="text" 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          {/*email show in both modes*/}
          <div className="input">
            <MdEmail className="icon" />
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/*password show in both*/}
          <div className="input">
            <TbLockPassword className="icon" />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/*year only shows in sign up mode*/}
          {isSignUp && (
            <div className="input">
              <FaGraduationCap className="icon" />
              <input 
                type="text" 
                placeholder="Graduation Year (ex: 2027)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

        </div>

        {/*error message*/}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/*submit button */}
        <div className="submit-container">
          <button 
            type="submit" 
            className="submit"
            disabled={loading} //prevents double submission
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </div>
      </form>

      <div className="signup">
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <span className="link" onClick={toggleMode}>
              Log in
            </span>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <span className="link" onClick={toggleMode}>
              Sign up
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;