import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type ProfileImage = {
  id: number;
  title: string;
  searchText: string;
  imageUrl: string;
  isActive: string;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: ProfileImage;
}
interface DataList {
  statusCode: number;
  success: boolean;
  message: string;
  result: ProfileImage[];
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

export const getAllProfileImages = createAsyncThunk(
  "profile-images/getAllProfileImages",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/profile-images/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get profile-images data"
      );
    }
  }
);

export const getProfileImages = createAsyncThunk(
  "profile-images/getProfileImages",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/profile-images/get`,
        token,
        "application/json",
        { id },
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get profile-images data"
      );
    }
  }
);

const profileImagesSlice = createSlice({
  name: "profile-images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProfileImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProfileImages.fulfilled,
        (state, action: PayloadAction<DataList>) => {
          state.loading = false;
          state.dataList = action.payload;
        }
      )
      .addCase(getAllProfileImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProfileImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfileImages.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getProfileImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileImagesSlice.reducer;
