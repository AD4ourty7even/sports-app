import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { createMyProfile, getMyProfile } from './profileService';
import { profileDataType, profileSliceType, profileType } from '../../types';

const initialState: profileSliceType = {
    profile: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

interface ThunkAPIConfig {
    state: RootState;
    rejectValue: string;
}

export const checkForProfile = createAsyncThunk<
  // Return type of the payload creator
  profileType | null, 
  // Argument type passed to the payload creator
  void, 
  // ThunkAPI configuration
  ThunkAPIConfig
>('profile/checkForProfile', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token
        if (!token) throw new Error('No token available');
        const profile = await getMyProfile(token);
        // console.log(profile)
        return profile; 
    }
    catch(error:any){
      const message = 
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const createProfile = createAsyncThunk<

  // Return type of the payload creator
  profileType | null, 
  // Argument type passed to the payload creator
  profileDataType, 
  // ThunkAPI configuration
  ThunkAPIConfig

>(  'profile/createProfile',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      if (!token) throw new Error('No token available');
      return await createMyProfile(profileData, token);
    } catch (error: any) {
      const message = 
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
)


export const profileSlice = createSlice({
  name: 'profile',
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
      .addCase(checkForProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkForProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
      })
      .addCase(checkForProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.profile = null
      })
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.profile = null
      })
  }
})

export const {reset} = profileSlice.actions
export default profileSlice.reducer