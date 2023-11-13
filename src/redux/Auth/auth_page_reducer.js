import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {login,register,check_login,check_register,get_session} from "./auth_page_thunk";


const initialState = {
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
           sessionStorage.removeItem("id")     
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
        builder.addCase(register.rejected ,check_login.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
        });       
        builder.addCase(check_login.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
        });
        builder.addCase(check_register.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
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
            isAnyOf(check_login.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.error = false;
            }
        );

        builder.addMatcher(
            isAnyOf(check_register.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.error = false;
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

export const { logout, turnOffRegisterSuccess, turnOffError} =
AuthPage.actions;

export default AuthPage.reducer;
