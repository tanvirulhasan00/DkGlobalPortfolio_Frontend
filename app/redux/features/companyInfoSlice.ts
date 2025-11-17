import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseUrl } from "~/components/data";

import { apiRequest } from "~/redux/data/GetData";

export type CompanyInfo = {
  id: number;
  name: string;
  quote: string;
  shortTitle: string;
  description: string;
  email: string;
  phoneNumber: string;
  location: string;
  mapLink: string;
  secondMapLink: string;
  facebookLink: string;
  youtubeLink: string;
  linkedInLink: string;
  instagramLink: string;
  twitterLink: string;
  mission: string;
  vision: string;
  annualTurnover: number;
  numberOfEmployees: number;
  numberOfSewingPlants: number;
  numberOfSewingLines: number;
  productionCapacity: number;
  primaryMarkets: string;
};
interface Data {
  statusCode: number;
  success: boolean;
  message: string;
  result: CompanyInfo;
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

export const getAllCompanyInfo = createAsyncThunk(
  "company-info/getAllCompanyInfo",
  async ({ token }: { token: string | null }, { rejectWithValue }) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/company-info/getall`,
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

export const getCompanyInfo = createAsyncThunk(
  "company-info/getCompanyInfo",
  async (
    { token, id }: { token: string | null; id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest(
        "get",
        `${baseUrl}/api/company-info/get`,
        token,
        "application/json",
        { id },
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

const companyInfoSlice = createSlice({
  name: "company-info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCompanyInfo.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCompanyInfo.fulfilled,
        (state, action: PayloadAction<Data>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companyInfoSlice.reducer;
