import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { Link, useHistory } from "react-router-dom";
import Particles from "react-particles-js";
import { Button, Form } from "react-bootstrap";

export default function Signin() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  console.log(firebase, "firebase");
  const handleSignin = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
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
            <p className='text'>New User ? Go to <Link to='/signup'>Sign Up</Link></p>
            <Button type="submit" className='btn-styles' onClick={handleSignin} method="POST">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
