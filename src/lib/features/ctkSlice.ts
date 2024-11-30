import {
  apiAllCtk,
  apiCreateCtk,
  apiDeleteCtk,
  apiDetailCtk
} from '@/src/api/ctk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface REF_STATE {
  loading: boolean;
  error: boolean;
  data: any;
}

export type CtkState = {
  list: REF_STATE;
  current: REF_STATE;
  isDeleted: boolean;
  isCreated: boolean;
  errorMessage: string;
};

const initialState: CtkState = {
  list: {
    loading: false,
    error: false,
    data: []
  },
  current: {
    loading: false,
    error: false,
    data: null
  },
  isDeleted: false,
  isCreated: false,
  errorMessage: ''
};

export const getListCtk = createAsyncThunk('ctKhung/all', async () => {
  const res = await apiAllCtk();
  if (res) return res.items;
});

export const getDetailCtk = createAsyncThunk(
  'ctKhung/detail',
  async (id: number) => {
    const res = await apiDetailCtk(id);
    if (res) return res;
  }
);

export const deleteCtk = createAsyncThunk(
  'ctKhung/delete',
  async (id: number) => {
    const res = await apiDeleteCtk(id);

    if (res) return res;
  }
);

export const createCtk = createAsyncThunk(
  'ctKhung/create',
  async (args: {
    chuyenNganhId: number;
    details: { kiHoc: string; monHocIds: number[] }[];
  }) => {
    const res = await apiCreateCtk(args);
    console.log(res);

    if (res) return res;
  }
);

const ctkSlice = createSlice({
  name: 'ctKhung',
  initialState,
  reducers: {
    resetCurrentCtk: (state) => {
      state.current.data = null;
      state.current.error = false;
      state.current.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCtk.pending, (state) => {
        state.list.loading = true;
        state.list.error = false;
      })
      .addCase(getListCtk.fulfilled, (state, action: PayloadAction<any>) => {
        state.list.loading = false;
        state.list.error = false;
        state.list.data = action.payload;
      })
      .addCase(getListCtk.rejected, (state) => {
        state.list.loading = false;
        state.list.error = true;
      })
      .addCase(getDetailCtk.pending, (state) => {
        state.current.loading = true;
        state.current.error = false;
      })
      .addCase(getDetailCtk.fulfilled, (state, action: PayloadAction<any>) => {
        state.current.loading = false;
        state.current.error = false;
        state.current.data = action.payload;
      })
      .addCase(getDetailCtk.rejected, (state) => {
        state.current.loading = false;
        state.current.error = true;
      })
      .addCase(deleteCtk.pending, (state) => {
        state.list.loading = true;
        state.list.error = false;
        state.isDeleted = false;
      })
      .addCase(deleteCtk.fulfilled, (state) => {
        state.list.loading = false;
        state.list.error = false;
        state.isDeleted = true;
      })
      .addCase(deleteCtk.rejected, (state) => {
        state.list.loading = false;
        state.list.error = true;
        state.isDeleted = false;
      })
      .addCase(createCtk.pending, (state) => {
        state.list.loading = true;
        state.list.error = false;
        state.isCreated = false;
      })
      .addCase(createCtk.fulfilled, (state) => {
        state.list.loading = false;
        state.list.error = false;
        state.isCreated = true;
      })
      .addCase(createCtk.rejected, (state, action: PayloadAction<any>) => {
        state.list.loading = false;
        state.list.error = true;
        state.isCreated = false;
      });
  }
});

const ctkReducer = ctkSlice.reducer;

export const { resetCurrentCtk } = ctkSlice.actions;

export default ctkReducer;
