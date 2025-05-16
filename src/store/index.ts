import { configureStore } from "@reduxjs/toolkit";
import summarys from './slices/summary.slice'
import users from './slices/user.slice'

export const store = configureStore({
  reducer: {
    summarys,
    users
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;