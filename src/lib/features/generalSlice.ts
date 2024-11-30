import { apiAllBuilding } from '@/src/api/room';
import { apiAllBoMon, apiAllNganh, apiAllTeacher } from '@/src/api/general';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type REF_STATE = {
  loading: boolean;
  error: boolean;
  data: any;
};

export type GeneralState = {
  listTeacher: REF_STATE;
  listBoMon: REF_STATE;
  listChuyenNganh: REF_STATE;
  listPhong: REF_STATE;
};

const initialState: GeneralState = {
  listTeacher: {
    loading: false,
    error: false,
    data: []
  },
  listBoMon: {
    loading: false,
    error: false,
    data: []
  },
  listChuyenNganh: {
    loading: false,
    error: false,
    data: []
  },
  listPhong: {
    loading: false,
    error: false,
    data: []
  }
};

export const getListTeacher = createAsyncThunk(
  'general/listTeacher',
  async () => {
    const res = await apiAllTeacher();
    if (res) return res.items;
  }
);

export const getListBoMon = createAsyncThunk(
  'general/listBoMon',
  async (token: string) => {
    const res = await apiAllBoMon(token);
    if (res) return res.items;
  }
);

export const getListChuyenNganh = createAsyncThunk(
  'general/listChuyenNganh',
  async (token: string) => {
    const res = await apiAllNganh(token);
    if (res) return res.items;
  }
);

export const getListPhong = createAsyncThunk('general/listPhong', async () => {
  const res = await apiAllBuilding();
  if (res) return res.items;
});

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListTeacher.pending, (state) => {
        state.listTeacher.loading = true;
        state.listTeacher.error = false;
      })
      .addCase(
        getListTeacher.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.listTeacher.loading = false;
          state.listTeacher.error = false;
          state.listTeacher.data = action.payload;
        }
      )
      .addCase(getListTeacher.rejected, (state) => {
        state.listTeacher.loading = false;
        state.listTeacher.error = true;
      })
      .addCase(getListBoMon.pending, (state) => {
        state.listBoMon.loading = true;
        state.listBoMon.error = false;
      })
      .addCase(
        getListBoMon.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.listBoMon.loading = false;
          state.listBoMon.error = false;
          state.listBoMon.data = action.payload;
        }
      )
      .addCase(getListBoMon.rejected, (state) => {
        state.listBoMon.loading = false;
        state.listBoMon.error = true;
      })
      .addCase(getListChuyenNganh.pending, (state) => {
        state.listChuyenNganh.loading = true;
        state.listChuyenNganh.error = false;
      })
      .addCase(
        getListChuyenNganh.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.listChuyenNganh.loading = false;
          state.listChuyenNganh.error = false;
          state.listChuyenNganh.data = action.payload;
        }
      )
      .addCase(getListChuyenNganh.rejected, (state) => {
        state.listChuyenNganh.loading = false;
        state.listChuyenNganh.error = true;
      })
      .addCase(getListPhong.pending, (state) => {
        state.listPhong.loading = true;
        state.listPhong.error = false;
      })
      .addCase(
        getListPhong.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.listPhong.loading = false;
          state.listPhong.error = false;
          state.listPhong.data = action.payload;
        }
      )
      .addCase(getListPhong.rejected, (state) => {
        state.listPhong.loading = false;
        state.listPhong.error = true;
      });
  }
});

const generalReducer = generalSlice.reducer;

const {} = generalSlice.actions;

export default generalReducer;
