import {
  apiAllSubject,
  apiDeleteSubject,
  apiGetDetailSubject
} from '@/src/api/subject';
import { Subject } from '@models/index';
import { HieuSubjectModel } from '@models/Subject_Hieu';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SubjectState = {
  listSubject: HieuSubjectModel[];
  current: any;
  loading: boolean;
  error: boolean;
  isDeleted: boolean;
};

const initialState: SubjectState = {
  listSubject: [],
  current: null,
  loading: false,
  error: false,
  isDeleted: false
};

export const getListSubject = createAsyncThunk('subject/all', async () => {
  const dataRes = await apiAllSubject();
  return dataRes.items;
});

export const getDetailSubject = createAsyncThunk(
  'subject/detail',
  async (maMonHoc: string) => {
    const dataRes = await apiGetDetailSubject(maMonHoc);
    return dataRes.items;
  }
);

export const deleteSubject = createAsyncThunk(
  'subject/delete',
  async (id: string) => {
    const dataRes = await apiDeleteSubject(id);
    return dataRes;
  }
);

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    resetCurrentSubject(state) {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListSubject.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getListSubject.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listSubject = action.payload;
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(getListSubject.rejected, (state) => {
        (state.loading = false), (state.error = true);
      })
      .addCase(getDetailSubject.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getDetailSubject.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.error = false;
          state.current = action.payload[0];
        }
      )
      .addCase(getDetailSubject.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.isDeleted = false;
      })
      .addCase(deleteSubject.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.isDeleted = true;
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isDeleted = false;
      });
  }
});

const subjectReducer = subjectSlice.reducer;

export const { resetCurrentSubject } = subjectSlice.actions;

export default subjectReducer;
