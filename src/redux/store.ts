// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formslice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import { api } from "../services/api"; // adjust the path

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form"], // only persist the form slice
};

const rootReducer = combineReducers({
  form: formReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware), // add the api middleware
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
