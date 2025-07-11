// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import formReducer from "./formslice";
import { api } from "../services/api"; // adjust path if needed

// Combine reducers
const rootReducer = combineReducers({
  form: formReducer,
  [api.reducerPath]: api.reducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["form.addVariantForm"], // ✅ Ignore File[] in addVariantForm
        ignoredActions: ['form/saveFormData'],
      },
    }).concat(api.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
