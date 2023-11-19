import { selectSnackState, selectSnackMessage, selectSnackStatus, closeSnackBar, openSnackBar } from "../redux/snackBarReducer";
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";


const Alert = (props) => {
    return <MuiAlert elevation = {6} variant = "filled" {...props} />
}

const SnackBarComponent = () => {
    const dispatch = useDispatch();

    const opened = useSelector(selectSnackState);
    const status = useSelector(selectSnackStatus);
    const message = useSelector(selectSnackMessage);

    const handleClose = () => {
        dispatch(closeSnackBar());        
    }

  return (
    <Snackbar open={opened} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin = {{vertical: 'top', horizontal: 'right'}}
    >
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
            {message}
        </Alert>
  </Snackbar>
  )
}

const TestComp = () => {
    const dispatch = useDispatch();
    const opened = useSelector(selectSnackState);
    const status = useSelector(selectSnackStatus);
    const message = useSelector(selectSnackMessage);
    const handleClose = () => {
        dispatch(openSnackBar({message: "Hello KJH!", status: "error"}));     
        console.log("opened after:", opened);
        console.log("status after:", status);
        console.log("message after:", message);   
    }

    console.log("opened:", opened);
    console.log("status:", status);
    console.log("message:", message);
    return(
        <div>

            <h1>SnackBar</h1>
            <Alert onClose = {handleClose} severity= {status}>
                {message}
            </Alert>
        </div>
    )
}

const TestComp1 = ( ) => {
    const handleClose = () => {}
    return(

    <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin = {{vertical: 'top', horizontal: 'right'}}
    >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
      </Snackbar>
    )
}

export default SnackBarComponent
