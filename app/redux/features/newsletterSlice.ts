import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

interface Data {
  statusCode: number;
  success: boolean;
  message: string;
}

interface StateType {
  loading: boolean;
  Data: Data | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: false,
  Data: null,
  error: null,
  refresh: false,
  statusChange: false,
};

export const createNewsletter = createAsyncThunk(
  "newsletter/createNewsletter",
  async (
    { token, formPayload }: { token: string | null; formPayload: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "post",
        `${baseUrl}/api/newsletters/create`,
        token,
        "application/json",
        {},
        formPayload
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add newsletter data"
      );
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createNewsletter.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.Data = action.payload;
        }
      )
      .addCase(createNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsletterSlice.reducer;
