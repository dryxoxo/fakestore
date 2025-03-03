import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../api/axios';
import { AxiosError } from 'axios';

export interface CartState {
    productId: number,
    quantity: number
}

const initialState: CartState[] = []

const addCartReducer: CaseReducer<CartState[], PayloadAction<number>> = (state, action) => {
    const productId = action.payload;
    const existingItem = state.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.push({ productId, quantity: 1 });
    }
};

const decCartReducer: CaseReducer<CartState[], PayloadAction<number>> = (state, action) => {
    const productId = action.payload;
    const itemIndex = state.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        if (state[itemIndex].quantity > 1) {
            state[itemIndex].quantity -= 1;
        } else {
            state.splice(itemIndex, 1);
        }
    }
};

const removeCartReducer: CaseReducer<CartState[], PayloadAction<number>> = (state, action) => {
    return state.filter(item => item.productId !== action.payload);
};

export const fetchCart = createAsyncThunk<CartState[], number>(
    'cart/fetchCart',
    async (idUser, { rejectWithValue }) => {
        try {
            const response = await axios.get(`carts/${idUser}`);
            return response.data.products;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: addCartReducer,
        decCart: decCartReducer,
        removeCart: removeCartReducer,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const { addCart, decCart, removeCart } = CartSlice.actions

export default CartSlice.reducer