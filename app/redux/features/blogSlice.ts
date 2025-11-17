import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  authorBio: string;
  categoryId: number;
  categoryName: string;
  status: string;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Blog;
}
interface DataList {
  statusCode: number;
  success: boolean;
  message: string;
  result: Blog[];
}
interface StateType {
  loading: boolean;
  data: Data | null;
  dataList: DataList | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: true,
  data: null,
  dataList: null,
  error: null,
  refresh: false,
  statusChange: false,
};

export const getAllBlog = createAsyncThunk(
  "blogs/getAllBlog",
  async (
    { token, cat }: { token: string | null; cat: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/blogs/${cat}/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get leader data"
      );
    }
  }
);

export const getBlog = createAsyncThunk(
  "blogs/getBlog",
  async (
    {
      token,
      blogId,
      cat,
    }: { token: string | null; blogId: number; cat: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/blogs/${cat}/get`,
        token,
        "application/json",
        { blogId },
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get leader data"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllBlog.fulfilled,
        (state, action: PayloadAction<DataList>) => {
          state.loading = false;
          state.dataList = action.payload;
        }
      )
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
