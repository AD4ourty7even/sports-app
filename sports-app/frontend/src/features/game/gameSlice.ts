import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { gameDataType, gameSliceType, gameType } from '../../types';
import { createGame, getAllGames, joinAGame } from './gameService';

const initialState: gameSliceType = {
    games: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isHostedError: false,
    isHostedSuccess: false,
    isJoinedSuccess: false,
    isJoinedError: false,
    message: ''
}

interface ThunkAPIConfig {
    state: RootState;
    rejectValue: string;
}

export const getGames = createAsyncThunk<

// Return type of the payload creator
gameType[], 
// Argument type passed to the payload creator
void, 
// ThunkAPI configuration
ThunkAPIConfig

>(  'game/getGames',
async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    if (!token) throw new Error('No token available');
    return await getAllGames(token)
  } catch (error: any) {
    const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
  }
}
)

export const hostGame = createAsyncThunk<

  // Return type of the payload creator
  gameType, 
  // Argument type passed to the payload creator
  gameDataType, 
  // ThunkAPI configuration
  ThunkAPIConfig

>(  'game/hostGame',
  async (gameData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      if (!token) throw new Error('No token available');
      return await createGame(gameData, token)
    } catch (error: any) {
      const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const joinGame = createAsyncThunk(
  'game/join',
  async (id: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      if (!token) throw new Error('No token available');
      return await joinAGame(id, token);
    } catch (error: any) {
      const message = 
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isHostedError = false
      state.isHostedSuccess = false
      state.isJoinedError = false
      state.isJoinedSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hostGame.pending, (state) => {
        state.isLoading = true
      })
      .addCase(hostGame.fulfilled, (state, action) => {
        state.isLoading = false
        state.isHostedSuccess = true
        state.games.push(action.payload)
      })
      .addCase(hostGame.rejected, (state, action) => {
        state.isLoading = false
        state.isHostedError = true
        state.message = action.payload
      })
      .addCase(getGames.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.games = action.payload
      })
      .addCase(getGames.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.games = []
      })
      .addCase(joinGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isJoinedSuccess = true;
        // Update the game in the state
        const index = state.games.findIndex(game => game._id === action.payload._id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isJoinedError = true;
        state.message = action.payload as string;
      });
  }
})

export const {reset} = gameSlice.actions
export default gameSlice.reducer