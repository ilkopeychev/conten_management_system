import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Exporting the reducer from the slice
export default categoriesSlice.reducer;

// Selector to get categories by ID
export const getCategoriesById = (state) => {
    return state.categories.categories.reduce((acc, category) => ({
        ...acc,
        [category.id]: category
    }), {});
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue, extra }) => {
        if (!extra || !extra.categoryApi) {
            console.error("Extra argument or categoryApi is undefined");
            return rejectWithValue("Dependency injection failed");
        }
        try {
            const response = await extra.categoryApi.getCategories();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

