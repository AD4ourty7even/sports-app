import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import { authType, loginType, registerType} from '../../types';

//Get user from local storage
const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')!) : null;

const initialState: authType = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', 
    async (user: registerType, thunkAPI) => {
        try{
            return await authService.register(user)
        }catch(error: any) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
})

//login user
export const login = createAsyncThunk('auth/login', 
    async (user: loginType, thunkAPI) => {
        try{
            return await authService.login(user)
        }catch(error: any) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
})

export const logout = createAsyncThunk('auth/logout', 
    async () => {
        await authService.logout()
    })

export const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer