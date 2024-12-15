import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGetScheduleOfLHP } from '@/src/api/class';
import {
  apiGetAllSchedule,
  apiGetScheduleOfStudent,
  apiGetScheduleOfTeacher
} from '@/src/api/schedule';

export type ScheduleState = {
  list: {
    data: any[];
    isLoading: boolean;
    isError: boolean;
  };
  current: any;
  class: any[];
  student: any[];
  teacher: any[];
};

export const getAllSchedule = createAsyncThunk(
  'schedule/all',
  async (args: {
    page?: number;
    limit?: number;
    building?: string;
    caHoc?: number;
  }) => {
    const dataRes = await apiGetAllSchedule(args);
    return dataRes ? dataRes : [];
  }
);

export const getTeacherSchedule = createAsyncThunk(
  'schedule/teacher',
  async (teacherId: string) => {
    const dataRes = await apiGetScheduleOfTeacher(teacherId);
    return dataRes ? dataRes : [];
  }
);

export const getStudentSchedule = createAsyncThunk(
  'schedule/student',
  async (studentId: string) => {
    const dataRes = await apiGetScheduleOfStudent(studentId);
    return dataRes ? dataRes : [];
  }
);

export const getLopHpSchedule = createAsyncThunk(
  'schedule/lopHp',
  async (lopHpId: number) => {
    const dataRes = await apiGetScheduleOfLHP(lopHpId);
    return dataRes ? dataRes : [];
  }
);

const initialState: ScheduleState = {
  list: {
    data: [],
    isLoading: false,
    isError: false
  },
  class: [],
  student: [],
  teacher: [],
  current: null
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSchedule.pending, (state) => {
        state.list.isLoading = true;
        state.list.isError = false;
      })
      .addCase(
        getAllSchedule.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.list.isLoading = false;
          state.list.isError = false;
          state.list.data = action.payload.items;
        }
      )
      .addCase(getAllSchedule.rejected, (state) => {
        state.list.isLoading = false;
        state.list.isError = true;
      })
      .addCase(
        getLopHpSchedule.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.class = action.payload;
        }
      )
      .addCase(
        getTeacherSchedule.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.teacher = action.payload;
        }
      )
      .addCase(
        getStudentSchedule.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.student = action.payload;
        }
      );
  }
});

const scheduleReducer = scheduleSlice.reducer;

export const {} = scheduleSlice.actions;

export default scheduleReducer;
