import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Certificate = {
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
  result: Certificate[];
}
interface StateType {
  loading: boolean;
  data: Data | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: true,
  data: null,
  error: null,
  refresh: false,
  statusChange: false,
};

export const getAllCertificate = createAsyncThunk(
  "certificate/getAllCertificate",
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
        error?.response?.data?.message || "Failed to get certificate data"
      );
    }
  }
);

export const getCertificate = createAsyncThunk(
  "certificate/getCertificate",
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
        error?.response?.data?.message || "Failed to get certificate data"
      );
    }
  }
);

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCertificate.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default certificateSlice.reducer;
