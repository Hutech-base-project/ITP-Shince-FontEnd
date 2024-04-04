import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {generate_otp, validate_otp} from "./otp_page_thunk";


const initialState = {
    isLoading: false,
    error: false,
};

export const OtpPage = createSlice({
    name: "otp",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(generate_otp.rejected, (state,action ) => {
            state.isLoading = false;
            state.error = true;
        });
        builder.addCase(validate_otp.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
        });
        builder.addMatcher(
            isAnyOf(generate_otp.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.error = false;
            }
        );

        builder.addMatcher(
            isAnyOf(validate_otp.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(
                generate_otp.pending,
                validate_otp.pending,
            ),(state ) => {
                state.isLoading = true;
            }
        );

    },
});

export default OtpPage.reducer;
