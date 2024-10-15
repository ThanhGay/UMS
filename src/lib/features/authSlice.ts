import {
  apiLoginAdmin,
  apiLoginStudent,
  apiLoginTeacher
} from '@/src/api/auth';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type AuthState = {
  user: any;
  token: string;
  loading: boolean;
  user_type: 'student' | 'teacher' | 'admin' | string;
  loginCode: number | null; // 0 - failed, 1 - success
};

export const authLoginStudent = createAsyncThunk(
  'auth/login/student',
  async (args: { email: string; password: string }) => {
    const dataRes = await apiLoginStudent(args);

    return dataRes;
  }
);

export const authLoginTeacher = createAsyncThunk(
  'auth/login/teacher',
  async (args: { email: string; password: string }) => {
    const dataRes = await apiLoginTeacher(args);

    return dataRes;
  }
);

export const authLoginAdmin = createAsyncThunk(
  'auth/login/admin',
  async (args: { email: string; password: string }) => {
    const dataRes = await apiLoginAdmin(args);

    return dataRes;
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
    },
    logout: (state) => {
      state.loginCode = null;
      state.user = null;
      state.token = '';
      state.user_type = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginStudent.pending, (state) => {
        state.loginCode = null;
        state.loading = true;
      })
      .addCase(
        authLoginStudent.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loginCode = 1;
          state.user_type = 'student';
          state.user = action.payload;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(authLoginStudent.rejected, (state) => {
        state.loginCode = 0;
        state.loading = false;
      })
      .addCase(authLoginTeacher.pending, (state) => {
        state.loginCode = null;
        state.loading = true;
      })
      .addCase(
        authLoginTeacher.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loginCode = 1;
          state.user_type = 'teacher';
          state.user = action.payload;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(authLoginTeacher.rejected, (state) => {
        state.loginCode = 0;
        state.loading = false;
      })
      .addCase(authLoginAdmin.pending, (state) => {
        state.loginCode = null;
        state.loading = true;
      })
      .addCase(
        authLoginAdmin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loginCode = 1;
          state.user_type = 'admin';
          state.user = action.payload;
          state.token = action.payload.token;
          state.loading = false;
        }
      )
      .addCase(authLoginAdmin.rejected, (state) => {
        state.loginCode = 0;
        state.loading = false;
      });
  }
});

const authReducer = authSlice.reducer;

export const { setDataUser, setAuthLoading, setToken, setUserType, logout } =
  authSlice.actions;
export default authReducer;
