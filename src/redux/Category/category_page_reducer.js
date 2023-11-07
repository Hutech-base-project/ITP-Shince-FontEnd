import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { deleteCategories, getCategories, postCategories, putCategories } from "./category_page_thunk"

const initialState = {
    categories: [],
    isLoading: false,
    error: ""
}

const CategoriesPage = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload
        })
        builder.addMatcher(isAnyOf(postCategories.fulfilled, putCategories.fulfilled), (state,) => {
            state.isLoading = false;
        })
        builder.addMatcher(isAnyOf(getCategories.pending, postCategories.pending, putCategories.pending,deleteCategories.pending), (state,) => {
            state.isLoading = true;
        })
        builder.addMatcher(isAnyOf(getCategories.rejected, postCategories.rejected, putCategories.rejected,deleteCategories.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default CategoriesPage.reducer;