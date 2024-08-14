import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCars, getCarsByTypeAndYear } from '@/api/requests';

const initialState = {
  data: [],
  loading: false,
  error: null,
  filteredData: [],
};

export const getData = createAsyncThunk('cars/get', async () => {
  try {
    return await getAllCars();
  } catch (error) {
    throw new Error(`Failed to fetch cars data: ${error.message}`);
  }
});

export const getFilteredData = createAsyncThunk(
  'cars/getFilteredData',
  async ({ makeId, year }) => {
    try {
      return await getCarsByTypeAndYear(makeId, year);
    } catch (error) {
      throw new Error(`Failed to fetch car data: ${error.message}`);
    }
  },
);

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //-------------------------------------------------------------------------------------------------------------
    builder
      .addCase(getFilteredData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilteredData.fulfilled, (state, action) => {
        state.filteredData = action.payload;
        state.loading = false;
      })
      .addCase(getFilteredData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer;
