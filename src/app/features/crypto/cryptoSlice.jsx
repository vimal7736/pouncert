import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    searchTerm: '',
    conversionAmount: 1,
    fromCurrency: "bitcoin",
    toCurrency: "ethereum",
};

export const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setConversionAmount: (state, action) =>{
            state.conversionAmount = action.payload;
        },
        setFromCurrency: (state, action) =>{
            state.fromCurrency = action.payload;
        },
        setToCurrency: (state, action) =>{
            state.toCurrency = action.payload;
        }
    }
})

export const {setSearchTerm, setConversionAmount, setFromCurrency, setToCurrency} = cryptoSlice.actions;
export default cryptoSlice.reducer;