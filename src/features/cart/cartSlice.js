import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const selectedProduct = state.cart.find((product) => product._id === action.payload._id);

            if (selectedProduct) {

                selectedProduct.quantity += 1;
                const newState = state.cart.map((product) => {
                    if (product._id === selectedProduct._id) {
                        return selectedProduct;
                    }
                    return product;
                })
                state.cart = newState;

            } else {
                const product = { ...action.payload, quantity: 1 };
                state.cart.push(product);
            }
        },

        removeFromCart : (state,action)=>{
            if(action.payload.quantity >1){
                const selectedProduct = {...action.payload,quantity:action.payload.quantity-1};
                const newState = state.cart.map((product)=>{
                    if(product._id === action.payload._id){
                        return selectedProduct;
                    }
                    return product;
                })
                state.cart = newState;
            }
            else{
                const newCart = state.cart.filter((product)=>product._id !== action.payload._id);
                state.cart = newCart;
            }
        }

    }

})

export const { addToCart ,removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;