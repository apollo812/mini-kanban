import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
    name: 'snackBar',
    initialState: {
        opened : false,
        message: '',
        status: 'success' // success, warning, info, error
    },
    reducers: {
        openSnackBar: (state, action) => {
            state.opened =  true;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        closeSnackBar : state => {
            state.opened = false;
        }
    }
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;

export const selectSnackState = state => state.snackBarState.opened;
export const selectSnackStatus = state => state.snackBarState.status;
export const selectSnackMessage = state => state.snackBarState.message;

export default snackBarSlice.reducer;