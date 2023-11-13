import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { get_all_services, post_services, put_services, delete_services, block_services } from "./service_page_thunk"


const initialState = {
    services: [],
    isLoading: false,
    error: ""
}

const ServicesPage = createSlice({
    name: 'services',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get_all_services.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services = action.payload
        })
        builder.addMatcher(
            isAnyOf(
                post_services.fulfilled,
                put_services.fulfilled,
                block_services.fulfilled
            ), (state,) => {
                state.isLoading = false;
            })
        builder.addMatcher(
            isAnyOf(
                get_all_services.pending,
                post_services.pending,
                put_services.pending,
                delete_services.pending,
                block_services.pending), (state,) => {
                    state.isLoading = true;
                })
        builder.addMatcher(
            isAnyOf(
                get_all_services.rejected,
                post_services.rejected,
                put_services.rejected,
                delete_services.rejected,
                block_services.rejected
            ), (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export default ServicesPage.reducer;