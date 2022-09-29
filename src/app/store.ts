import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import postListReducer from "../post-list-slice";
import postItemReducer from "../post-item-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    postList: postListReducer,
    postItem: postItemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
