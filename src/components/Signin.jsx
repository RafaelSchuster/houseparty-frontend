import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Paper,
} from "@material-ui/core";
import "../CSS/signin.css";
import { Link } from "react-router-dom";
import { signUpUrl } from "../utils/config";
import axios from "axios";

export default function Signin() {
  const [signUpValues, setSignUpValues] = useState({password1: ""});

  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    const signUpValuesCopy = { ...signUpValues };
    signUpValuesCopy[name] = value;
    console.log(signUpValuesCopy);
    setSignUpValues(signUpValuesCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(signUpUrl, signUpValues);
    localStorage.setItem('token', response.data.token);
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
  };

  return (
    <div className='signup-form-wrapper'>
      <Grid container justify='center' alignItems='center' spacing={5}>
        <Paper>
          <div className='signup-form'>
            <h3>Sign up</h3>
            <Grid item xs={12}>
              <FormControl className='input-field'>
                <InputLabel htmlFor='my-input'>Email address</InputLabel>
                <Input
                  requested='true'
                  name='email'
                  id='my-input'
                  aria-describedby='my-helper-text'
                  onChange={handleInputChange}
                />
                <FormHelperText id='my-helper-text'>

                  We'll never share your email.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className='input-field'>
                <InputLabel htmlFor='my-input'>First Name</InputLabel>
                <Input
                  requested='true'
                  name='firstName'
                  id='my-input'
                  aria-describedby='my-helper-text'

                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>

              <FormControl className='input-field'>
                <InputLabel htmlFor='my-input'>Last Name</InputLabel>
                <Input
                  requested='true'
                  name='lastName'
                  id='my-input'
                  aria-describedby='my-helper-text'
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>              
              <FormControl className='input-field'>
                <InputLabel htmlFor='my-input'>Username</InputLabel>
                <Input
                  requested='true'
                  name='username'
                  id='my-input'
                  aria-describedby='my-helper-text'
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className='input-field'>
                <InputLabel htmlFor='my-input'>Password</InputLabel>
                <Input
                  requested='true'
                  name='password1'
                  type='password'
                  id='my-input'
                  aria-describedby='my-helper-text'

                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              

              <FormControl className='input-field'>
                <InputLabel htmlFor='my-input'>Confirm Password</InputLabel>
                <Input
                  requested='true'
                  name='password2'
                  type='password'
                  id='my-input'
                  aria-describedby='my-helper-text'

                  onChange={handleInputChange}
                />
              </FormControl>
              {signUpValues.password1 !== signUpValues.password2 && (
                <p className='error'>Passwords don't match</p>
              )}
              {signUpValues.password1.length < 6 && (
                <p className='error'>Password must be at least 6 characters</p>
              )}
            </Grid>
          </div>
          <Grid item xs={12}>
            <Button

              type='submit'
              variant='contained'
              color='secondary'
              className='signup-btn'
              onClick={handleSubmit} 
              >
              Sign up
            </Button>
          </Grid>
          <Grid item xs={10}>
            <div className='link'>
              <p>
                Already have an account? <Link to='/login'>Login</Link>{' '}
              </p>
            </div>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
