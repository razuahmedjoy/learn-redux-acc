import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stock:false,
    brands:[],
    keyword:'',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggle:(state)=>{
            state.stock = !state.stock;
        },
        toggleBrands: (state,action) =>{
            const brand = action.payload;
            
            const selectedBrand = state.brands.find((b)=>b === brand);

            if(selectedBrand){
                const newBrands = state.brands.filter((b)=>b !== brand);
                state.brands = newBrands;
            }
            else{
                state.brands.push(brand);
            }
        }

    }

})

export const {toggle,toggleBrands} = filterSlice.actions;

export default filterSlice.reducer;