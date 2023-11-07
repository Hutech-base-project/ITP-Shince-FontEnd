import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {generateOTP, validateOtp} from "./otp_page_thunk";


const initialState = {
    otp:[],
    isLoading: false,
    error: false,
};

export const OtpPage = createSlice({
    name: "otp",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(generateOTP.rejected, (state,action ) => {
            state.isLoading = false;
            state.error = true;
            state.otp = action.payload
        });
        builder.addCase(validateOtp.rejected, (state,)=> {
            state.isLoading = false;
            state.error = true;
        });
        builder.addMatcher(
            isAnyOf(generateOTP.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.error = false;
            }
        );

        builder.addMatcher(
            isAnyOf(validateOtp.fulfilled),
            (state,) => {
                state.isLoading = false;
                state.error = false;
            }
        );
        builder.addMatcher(
            isAnyOf(
                generateOTP.pending,
                validateOtp.pending,
            ),(state ) => {
                state.isLoading = true;
            }
        );

    },
});

export default OtpPage.reducer;
