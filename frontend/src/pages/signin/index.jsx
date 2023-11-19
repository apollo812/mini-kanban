import React from 'react';
import  { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
      <div className='flex p-6 items-center justify-center text-2xl'>
            <div>
              <h1 className='text-3xl my-6 text-center' >Login Page</h1>
              <div>
                <TextField fullWidth label = "Email" id = "fullWidth"/>
                <TextField fullWidth label = "Password" id = "fullWidth" type = "password" />
              </div>
              <div className='text-sm mt-2 text-blue-300 cursor-pointer'>
                Forgot Password?
              </div>

              <div className='mt-3 justify-center flex'>
                <div className='mx-2'>
                  <Button variant='contained' color= "primary" >Login</Button>
                </div>
                <Link to = "/signup" className='mx-2'>
                  <Button variant='contained' color= "secondary">Go to SignUp Page</Button>
                </Link>
              </div>
            </div>
      </div>
  );
}
