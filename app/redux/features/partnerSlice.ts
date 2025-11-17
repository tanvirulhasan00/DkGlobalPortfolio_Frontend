import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type Partner = {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
  isActive: string;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Partner[];
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

export const getAllPartner = createAsyncThunk(
  "partner/getAllPartner",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/partners/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get partner data"
      );
    }
  }
);

export const getLeadership = createAsyncThunk(
  "partner/getPartner",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/partners/get`,
        token,
        "application/json",
        { id },
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get partner data"
      );
    }
  }
);

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartner.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default partnerSlice.reducer;
