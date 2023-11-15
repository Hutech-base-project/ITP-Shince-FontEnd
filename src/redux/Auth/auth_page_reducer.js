import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {login,register,check_login,check_register,get_session} from "./auth_page_thunk";


const initialState = {
    isLoading: false,
    error: false,
    loginError: false,
    registerError: false,
};

export const AuthPage = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
           sessionStorage.removeItem("id")     
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected,check_login.rejected, (state,action ) => {
            state.isLoading = false;
            state.loginError = true;
        });
        builder.addCase(register.rejected, (state,)=> {
            state.isLoading = false;
            state.registerError = true;
        });       
        builder.addCase(check_login.rejected, (state,)=> {
            state.isLoading = false;
            state.loginError = true;
        });
        builder.addCase(check_register.rejected, (state,)=> {
            state.isLoading = false;
            state.registerError = true;
        });
        builder.addCase(get_session.rejected, (state,action ) => {
            state.isLoading = false;
            state.error = true;
            state.auth  = state.payload;
        });

        builder.addMatcher(
            isAnyOf(login.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.auth = action.payload;
                state.loginError = false;
            }
        );
        builder.addMatcher(
            isAnyOf(register.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.registerError = false;
            }
        );
        builder.addMatcher(
            isAnyOf(check_login.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.loginError = false;
            }
        );

        builder.addMatcher(
            isAnyOf(check_register.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.registerError = false;
            }
        );
        builder.addMatcher(
            isAnyOf(get_session.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.auth = action.payload;
                state.error = false;
            }
        );     
        builder.addMatcher(
            isAnyOf(
                login.pending,
                register.pending,                             
                check_login.pending,
                check_register.pending,
                get_session.pending,
            ),(state ) => {
                state.isLoading = true;
            }
        );

    },
});

export const { logout} =
AuthPage.actions;

export default AuthPage.reducer;
