import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {checkLogin, getSession, login, register } from "./auth_page_thunk";


const initialState = {
    auth: null,
    isLoading: false,
    error: false,
    alertSuccess: false,
};

export const AuthPage = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            if(localStorage.getItem("ck") === null){
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("uId");
            }else{
                localStorage.removeItem("ck");
                localStorage.removeItem("uId");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
            }         
        },
        turnOffRegisterSuccess: (state, ) => {
            state.alertSuccess = false;
        },
        turnOffError: (state, ) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.rejected, (state,action ) => {
            state.isLoading = false;
            state.error = true;
            state.auth  = state.payload;
        });
        builder.addCase(getSession.rejected, (state,action ) => {
            state.isLoading = false;
            state.error = true;
            state.auth  = state.payload;
        });
        builder.addCase(register.rejected ,checkLogin.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
        });
        builder.addCase(checkLogin.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
        });
        builder.addMatcher(
            isAnyOf(login.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.auth = action.payload;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(getSession.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.auth = action.payload;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(register.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.error = false;
            }
        );

        builder.addMatcher(
            isAnyOf(checkLogin.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(
                register.pending,
                login.pending,
                getSession.pending,
                checkLogin.pending
            ),(state ) => {
                state.isLoading = true;
            }
        );

    },
});

export const { logout, turnOffRegisterSuccess, turnOffError} =
AuthPage.actions;

export default AuthPage.reducer;
