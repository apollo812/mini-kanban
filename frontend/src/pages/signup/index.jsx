import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { registerUser } from '../../redux/authReducer';
import { useDispatch } from 'react-redux'
import { openSnackBar } from '../../redux/snackBarReducer';

export default function Index() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const clickSignUpBtn = () => {
    if (email == '' || password =='') {
      dispatch(openSnackBar({status: "warning", message: "Please fill email and password"}))
      return;
    }
    dispatch(registerUser({email, password}));
  }

  return (
    <div className='flex p-6 items-center justify-center text-2xl'>
          <div>
            <h1 className='text-3xl my-6 text-center' >SignUp Page</h1>
            <div>
              <TextField fullWidth label = "Email" id = "fullWidth1" onChange={e => setEmail(e.target.value)}/>
              <TextField fullWidth label = "Password" id = "fullWidth" type = "password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='mt-3 justify-center flex'>
              <div className='mx-2'>
                <Button variant='contained' color= "primary" onClick = {() => clickSignUpBtn()}>Sign Up</Button>
              </div>
              <Link className='mx-2' to = "/signin">
                <Button variant='contained' color= "secondary" >Go to Login Page</Button>
              </Link>
            </div>
          </div>
    </div>
  );
}
