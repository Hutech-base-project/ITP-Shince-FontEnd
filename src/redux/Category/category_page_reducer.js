import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { get__all_categories, post_category, put_category, delete_category } from "./category_page_thunk"

const initialState = {
    listCategories: [],
    isLoading: false,
    error: ""
}

const CategoriesPage = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get__all_categories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listCategories = action.payload
        })
        builder.addMatcher(
            isAnyOf(
                post_category.fulfilled,
                put_category.fulfilled
            ), (state,) => {
                state.isLoading = false;
            })
        builder.addMatcher(
            isAnyOf(
                get__all_categories.pending,
                post_category.pending,
                put_category.pending,
                delete_category.pending), (state,) => {
                    state.isLoading = true;
                })
        builder.addMatcher(
            isAnyOf(
                get__all_categories.rejected,
                post_category.rejected,
                put_category.rejected,
                delete_category.rejected), (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
    }
})

export default CategoriesPage.reducer;