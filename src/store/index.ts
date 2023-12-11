import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'root',
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
    user: persistedUserReducer,
    chat: chatReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export const persistor = persistStore(store);


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;