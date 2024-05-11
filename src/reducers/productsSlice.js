import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateId } from '../utils';

export const isFeatured = ({ rating, featured }) => rating > 8 || featured === true;

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue, extra }) => {
        try {
            const response = await extra.productApi.getProducts();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        deleteProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct(state, action) {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = {
                    ...state.products[index],
                    ...action.payload.data,
                    featured: isFeatured({ ...state.products[index], ...action.payload.data })
                };
            }
        },
        createProduct(state, action) {
            state.products.push({
                ...action.payload,
                id: generateId(),
                featured: isFeatured(action.payload),
                createdAt: new Date()
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

// Actions exported from the slice
export const { deleteProduct, updateProduct, createProduct } = productsSlice.actions;

// Reducer exported from the slice
export default productsSlice.reducer;

// Selectors
export const getProductById = (state, productId) => state.products.find(product => product.id === productId);
