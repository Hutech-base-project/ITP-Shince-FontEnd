import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { delete_whish_list, get__all_whish_list_by_user_id, post_whish_list } from "./whish_list_page_thunk";
const initialState = {
    lisWhishList: [],
    isLoading: false,
    error: ""
}

const WhishList = createSlice({
    name: 'whish_list',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get__all_whish_list_by_user_id.fulfilled, (state, action) => {
            state.isLoading = false;
            state.lisWhishList = action.payload
        })
        builder.addMatcher(
            isAnyOf(
                post_whish_list.fulfilled,
                delete_whish_list.fulfilled
            ), (state,) => {
                state.isLoading = false;
            })
        builder.addMatcher(
            isAnyOf(
                get__all_whish_list_by_user_id.pending,
                post_whish_list.pending,
                delete_whish_list.pending
            ), (state,) => {
                state.isLoading = true;
            })
        builder.addMatcher(
            isAnyOf(
                get__all_whish_list_by_user_id.rejected,
                post_whish_list.rejected,
                delete_whish_list.rejected), (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
    }
})

export default WhishList.reducer;