import {
  apiAllClassHP,
  apiCreateLhp,
  apiGetDetailLopHp,
  apiGetScheduleOfLHP,
  apiGetStudentsOfLHP
} from '@/src/api/class';
import { apiAllTeacher } from '@/src/api/general';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type REF_STATE = {
  loading: boolean;
  error: boolean;
  data: any;
};

export type ClassState = {
  listClass: REF_STATE;
  current: REF_STATE;
  isCreated: boolean;
  isDeleted: boolean;
};

const initialState: ClassState = {
  listClass: {
    loading: false,
    error: false,
    data: []
  },
  current: {
    loading: false,
    error: false,
    data: null
  },
  isCreated: false,
  isDeleted: false
};

export const getListClass = createAsyncThunk('classHP/list', async () => {
  const res = await apiAllClassHP();
  if (res) return res.items;
});

export const createClass = createAsyncThunk(
  'classHP/create',
  async (args: {
    className: string;
    teacherIds: string[];
    maMonHoc: string;
    soTinChi: number;
    tenMonHoc: string;
    pricePerTinChi: number;
  }) => {
    const res = await apiCreateLhp(args);
    if (res) return res;
  }
);

export const detailClass = createAsyncThunk(
  'classHP/detail',
  async (lhpId: number) => {
    const dataRes = await apiGetDetailLopHp(lhpId);

    if (dataRes) return dataRes;
  }
);

const classSlice = createSlice({
  name: 'classHP',
  initialState,
  reducers: {
    setListTeacher: (state, action) => {
      state.current.data = {
        ...state.current.data,
        teacherInClass: action.payload
      };
    },
    setListStudent: (state, action) => {
      state.current.data = {
        ...state.current.data,
        studentInClass: action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListClass.pending, (state) => {
        state.listClass.loading = true;
        state.listClass.error = false;
      })
      .addCase(
        getListClass.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.listClass.loading = false;
          state.listClass.error = false;
          state.listClass.data = action.payload;
        }
      )
      .addCase(getListClass.rejected, (state) => {
        state.listClass.loading = false;
        state.listClass.error = true;
      })
      .addCase(createClass.pending, (state) => {
        state.listClass.loading = true;
        state.listClass.error = false;
        state.isCreated = false;
      })
      .addCase(createClass.fulfilled, (state) => {
        state.listClass.loading = false;
        state.listClass.error = false;
        state.isCreated = true;
      })
      .addCase(createClass.rejected, (state) => {
        state.listClass.loading = false;
        state.listClass.error = true;
        state.isCreated = false;
      })
      .addCase(detailClass.pending, (state) => {
        state.current.loading = true;
        state.current.error = false;
      })
      .addCase(detailClass.fulfilled, (state, action: PayloadAction<any>) => {
        state.current.loading = false;
        state.current.error = false;
        state.current.data = {
          ...action.payload,
          teacherInClass: [],
          studentInClass: []
        };
      })
      .addCase(detailClass.rejected, (state) => {
        state.current.loading = false;
        state.current.error = true;
      });
  }
});

const classReducer = classSlice.reducer;

export const { setListTeacher, setListStudent } = classSlice.actions;

export default classReducer;
