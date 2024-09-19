import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import subjectReducer from './features/subjectSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authState: authReducer,
      subState: subjectReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
