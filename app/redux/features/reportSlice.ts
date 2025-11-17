import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type ReportCategory = {
  id: number;
  name: string;
  description: string;
  link: string;
  icon: string;
  isActive: string;
};
export type Report = {
  id: number;
  title: string;
  description: string;
  icon: string;
  pdfLink: string;
  isActive: string;
};
interface CategoryData {
  statusCode: number;
  success: boolean;
  message: string;
  result: ReportCategory[];
}
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: Report[];
}

interface StateType {
  loading: boolean;
  categoryData: CategoryData | null;
  data: Data | null;
  error: string | null;
  refresh: boolean;
  statusChange: boolean;
}
const initialState: StateType = {
  loading: true,
  categoryData: null,
  data: null,
  error: null,
  refresh: false,
  statusChange: false,
};

// report category
export const getAllReportCategory = createAsyncThunk(
  "report-category/getAllReportCategory",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/report-category/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get report-category data"
      );
    }
  }
);

export const getReportCategory = createAsyncThunk(
  "report-category/getReportCategory",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/report-category/get`,
        token,
        "application/json",
        { id },
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get report-category data"
      );
    }
  }
);

// report data
export const getAllReport = createAsyncThunk(
  "report/getAllReport",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/reports/getall`,
        token,
        "application/json",
        {},
        null
      );
      return res;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get report data"
      );
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReport.fulfilled, (state, action: PayloadAction<Data>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllReportCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllReportCategory.fulfilled,
        (state, action: PayloadAction<CategoryData>) => {
          state.loading = false;
          state.categoryData = action.payload;
        }
      )
      .addCase(getAllReportCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reportSlice.reducer;
