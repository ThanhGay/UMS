import { apiLogin } from '@/src/api/auth';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type AuthState = {
  user: any;
  token: string;
  loading: boolean;
  user_type: string;
  loginCode: number | null; // 0 - failed, 1 - success
};

export const authLogin = createAsyncThunk(
  'auth/login',
  async (args: { email: string; password: string }) => {
    const dataRes = await apiLogin(args);
    return dataRes.status
      ? {
          ...dataRes,
          loginCode: 1
        }
      : {
          loginCode: 0
        };
  }
);

const initialState: AuthState = {
  user: null,
  token: '',
  user_type: '',
  loading: false,
  loginCode: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.user_type = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      authLogin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.user = action.payload?.data_user;
        state.loginCode = action.payload.loginCode;
        state.token = action.payload.jwt_token;
        state.loading = false;
      }
    );
  }
});

const authReducer = authSlice.reducer;

export const { setDataUser, setAuthLoading, setToken, setUserType } =
  authSlice.actions;
export default authReducer;
