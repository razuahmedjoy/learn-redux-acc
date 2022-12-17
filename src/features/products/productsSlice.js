import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    isError: false,
    deleteSuccess: false,
    error: "",
}

export const getProducts = createAsyncThunk("products/getProduct", async () => {

    const products = fetchProducts();
    return products;

})

export const addProduct = createAsyncThunk("products/addProduct", async (productData) => {

    const product = postProduct(productData);
    return product;

})
export const removeProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {

        const product = await deleteProduct(id);

        thunkAPI.dispatch(removeProductOnDelete(id));

        return product;

    })

const productsSlice = createSlice({
    name: 'products',
    initialState,

    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false
        },
        removeProductOnDelete: (state, action) => {
            state.products = state.products.filter(p => p._id !== action.payload)

        }

    },
    extraReducers: (builder) => {

        // get product
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.isError = false;
        })

        builder.addCase(getProducts.rejected, (state, action) => {
            state.products = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })



        // add product
        builder.addCase(addProduct.pending, (state, action) => {
            state.isLoading = true;
            state.postSuccess = false;
            state.isError = false;
        });

        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postSuccess = true;
            state.isError = false;
        })

        builder.addCase(addProduct.rejected, (state, action) => {

            state.isLoading = false;
            state.postSuccess = false;
            state.isError = true;
            state.error = action.error.message;
        })

        // delete product
        builder.addCase(removeProduct.pending, (state, action) => {
            state.isLoading = true;
            state.deleteSuccess = false;
            state.isError = false;
        });

        builder.addCase(removeProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deleteSuccess = true;
            state.isError = false;
        })

        builder.addCase(removeProduct.rejected, (state, action) => {

            state.isLoading = false;
            state.deleteSuccess = false;
            state.isError = true;
            state.error = action.error.message;
        })

    }

})


export const { togglePostSuccess, toggleDeleteSuccess,removeProductOnDelete } = productsSlice.actions;
export default productsSlice.reducer;