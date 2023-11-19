import React from 'react';
import  { TextField, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

export default  () => {
  const navigate = useNavigate();

  return (
      <div className='flex p-6 items-center justify-center text-2xl'>
            <div>
              <h1 className='text-3xl my-6 text-center' >Did you forget password?</h1>
              <h2 className='text-center'>Please enter your password</h2>
              <div>
                <TextField fullWidth label = "Type your password" id = "password1" type = "password" />
                <TextField fullWidth label = "Confirm your password" id = "password2" type = "password" />
              </div>

              <div className='mt-3 justify-center flex'>
                  <Button variant='contained' color= "primary" >Confirm</Button>
              </div>
            </div>
      </div>
  );
}
