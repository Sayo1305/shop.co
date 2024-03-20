// passwordSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface PasswordState {
  password: string,
  token : String,
}

const initialState: PasswordState = {
  password: '',
  token : '',
};
const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setPassword , setToken } = passwordSlice.actions;
export default passwordSlice.reducer;
