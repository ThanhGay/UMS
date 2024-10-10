import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import subjectReducer from './features/subjectSlice';
import ctkReducer from './features/ctkSlice';
import classReducer from './features/classSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authState: authReducer,
      subState: subjectReducer,
      ctkState: ctkReducer,
      classState: classReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
