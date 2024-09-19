import { apiAllSubject, apiGetDetailSubject } from '@/src/api/subject';
import { Subject } from '@models/index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SubjectState = {
  listSubject: Subject[];
  current: Subject | null;
  loading: boolean;
  error: boolean;
};

const initialState: SubjectState = {
  listSubject: [],
  current: null,
  loading: false,
  error: false
};

export const getListSubject = createAsyncThunk('subject/all', async () => {
  const dataRes = await apiAllSubject();
  return dataRes.data;
});

export const getDetailSubject = createAsyncThunk(
  'subject/detail',
  async (args: { subjectId: string }) => {
    const dataRes = await apiGetDetailSubject(args);
    return dataRes.data;
  }
);

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = false;
          state.current = action.payload;
        }
      )
      .addCase(getDetailSubject.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

const subjectReducer = subjectSlice.reducer;

export const {} = subjectSlice.actions;

export default subjectReducer;
