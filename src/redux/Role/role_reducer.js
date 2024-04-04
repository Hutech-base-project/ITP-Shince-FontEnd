import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { get_all_roles } from "./role_thunk";


const initialState = {
    listRoles: [],
    isLoading: false,
    error: ""
}

const Roles = createSlice({
    name: 'roles',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get_all_roles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listRoles = action.payload
        })
        builder.addMatcher(isAnyOf(get_all_roles.pending, ), (state,) => {
            state.isLoading = true;
        })
        builder.addMatcher(isAnyOf(get_all_roles.rejected,), (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default Roles.reducer;