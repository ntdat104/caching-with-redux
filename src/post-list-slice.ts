import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./app/store";

export interface PostListState {
  record: Record<string, any>;
  loading: boolean;
}

const initialState: PostListState = {
  record: {},
  loading: false,
};

export const postListSlice = createSlice({
  name: "post-list",
  initialState,
  reducers: {
    setLoading: (state: PostListState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRecord: (
      state: PostListState,
      action: PayloadAction<{
        key: string | number;
        value: any;
      }>
    ) => {
      state.record = {
        ...state.record,
        [action.payload.key]: action.payload.value,
      };
    },
  },
});

export const { setRecord, setLoading } = postListSlice.actions;

export const getPostList = (): AppThunk => async (dispatch, getState) => {
  // Kiểm tra xem trong record có cache post-list hay không, nếu có thì return;
  if (getState().postList.record["post-list"]) {
    return;
  }

  // Kiểm tra có đang gọi api không, nếu có thì return;
  if (getState().postList.loading) {
    return;
  }

  // Bật loading
  dispatch(setLoading(true));

  // Call api getPosts bằng fetch
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();

    const record = {
      key: "post-list",
      value: data,
    };

    // Khi đã lấy được dữ liệu thì đẩy vào record để cache với key là post-list
    dispatch(setRecord(record));
  } catch (error) {
    console.log(error);
  } finally {
    // Tắt loading
    dispatch(setLoading(false));
  }
};

export default postListSlice.reducer;
