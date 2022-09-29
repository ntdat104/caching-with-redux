import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./app/store";

export interface PostItemState {
  record: Record<string, any>;
  loading: boolean;
}

const initialState: PostItemState = {
  record: {},
  loading: false,
};

export const postItemSlice = createSlice({
  name: "post-item",
  initialState,
  reducers: {
    setLoading: (state: PostItemState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRecord: (
      state: PostItemState,
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

export const { setRecord, setLoading } = postItemSlice.actions;

export const getPostItem =
  (id: string | number): AppThunk =>
  async (dispatch, getState) => {
    // Kiểm tra xem trong record có cache id hay không, nếu có thì return;
    if (getState().postItem.record[id]) {
      return;
    }

    // Kiểm tra có đang gọi api không, nếu có thì return;
    if (getState().postItem.loading) {
      return;
    }

    // Bật loading
    dispatch(setLoading(true));

    // Call api getPostItem bằng fetch
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();

      const record = {
        key: id,
        value: data,
      };

      // Khi đã lấy được dữ liệu thì đẩy vào record để cache với key là id
      dispatch(setRecord(record));
    } catch (error) {
      console.log(error);
    } finally {
      // Tắt loading
      dispatch(setLoading(false));
    }
  };

export default postItemSlice.reducer;
