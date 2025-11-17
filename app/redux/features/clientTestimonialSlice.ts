import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type ClientTestimonial = {
  id: number;
  name: string;
  companyName: string;
  message: string;
  imageUrl: string;
  reviewStars: number;
  isActive: boolean;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: ClientTestimonial[];
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

export const getAllClientTestimonial = createAsyncThunk(
  "client-testimonial/getAllClientTestimonial",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/client-testimonial/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to get client-testimonial data"
      );
    }
  }
);

export const getClientTestimonial = createAsyncThunk(
  "client-testimonial/getClientTestimonial",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/client-testimonial/get`,
        token,
        "application/json",
        { id },
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to get client-testimonial data"
      );
    }
  }
);

const clientTestimonialSlice = createSlice({
  name: "client-testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClientTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllClientTestimonial.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllClientTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getClientTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getClientTestimonial.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getClientTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientTestimonialSlice.reducer;
