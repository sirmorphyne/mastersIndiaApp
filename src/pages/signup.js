import React, { useState,useContext} from  'react';
import Particles from "react-particles-js";
import { Button, Form } from "react-bootstrap";
import {FirebaseContext} from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { Link, useHistory } from 'react-router-dom';

export default function Signup(){

    const history =  useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [firstName,setFirstName]= useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError]= useState('');
    const isInvalid = firstName === '' || password === '' || emailAddress === '';
    
    const handleSignup = (event) =>{
        event.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(emailAddress,password).then((result)=>result.user.updateProfile({
            displayName:firstName,
        }).then(()=>{
            history.push(ROUTES.HOME);
        })
        ).catch((error)=>{
            setFirstName('');
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        });
    };
    
    return ( 
        <>
        <Particles
          className="particle-container"
          params={{
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
            },
          }}
        />
        <div className="sign-container">
          <div className="page-inner">
            <div className="signin-container">
            <Form.Label className='input-label'>Name</Form.Label>
              <Form.Control
               type="text" 
               placeholder="Enter Name" 
               className="input-style"
               value={firstName}
               onChange={({ target }) => setFirstName(target.value)}
              />

              <Form.Label className='input-label'>Email address</Form.Label>
              <Form.Control
               type="email" 
               placeholder="Enter email"
               className="input-style"
               value={emailAddress}
               onChange={({ target }) => setEmailAddress(target.value)}
              />
              
              <Form.Label className='input-label'>Password</Form.Label>
              <Form.Control
               type="password"
               autocomplete="off" 
               placeholder="Enter Password"
               className="input-style"
               value={password}
               onChange={({ target }) => setPassword(target.value)}
             />
              <p className="text">Already Signed In ? Go to <Link to='/signin'>Sign In</Link></p>
              <Button type="submit" className='btn-styles' onClick={handleSignup} method="POST">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </>
    
);
}