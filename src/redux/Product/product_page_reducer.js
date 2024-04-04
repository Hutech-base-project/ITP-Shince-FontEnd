import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { get_all_products, get_product_by_id, post_product, put_product, delete_product, block_product } from "./product_page_thunk.js"


const initialState = {
    listProducts: [],
    isLoading: false,
    error: ""
}

const ProductPage = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get_all_products.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listProducts = action.payload
        })
        builder.addMatcher(
            isAnyOf(
                get_product_by_id.fulfilled,
                post_product.fulfilled,
                put_product.fulfilled,
                block_product.fulfilled
            ), (state,) => {
                state.isLoading = false;
            })
        builder.addMatcher(
            isAnyOf(
                get_all_products.pending,
                get_product_by_id.pending,
                post_product.pending,
                put_product.pending,
                delete_product.pending,
                block_product.pending
            ), (state,) => {
                state.isLoading = true;
            })
        builder.addMatcher(
            isAnyOf(
                get_all_products.rejected,
                get_product_by_id.rejected,
                post_product.rejected,
                put_product.rejected,
                delete_product.rejected,
                block_product.rejected)
            , (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export default ProductPage.reducer;