import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {get__all_vouchers ,post_voucher ,put_voucher ,delete_voucher, post_check_voucher, get__vouchers_by_id, put_use_voucher, post_voucher_auto, get__vouchers_by_user_id} from "./voucher_page_thunk"

const initialState = {
    listVouchers: [],
    isLoading: false,
    error: ""
}

const VoucherPage = createSlice({
    name: 'vouchers',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(get__all_vouchers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listVouchers = action.payload
        })
        builder.addMatcher(
            isAnyOf(
                get__vouchers_by_id.fulfilled,
                get__vouchers_by_user_id.fulfilled,
                post_voucher.fulfilled,
                post_voucher_auto.fulfilled,
                post_check_voucher.fulfilled,
                put_use_voucher.fulfilled,
                put_voucher.fulfilled,
            ), (state,) => {
                state.isLoading = false;
            })
        builder.addMatcher(
            isAnyOf(
                get__all_vouchers.pending,
                get__vouchers_by_user_id.pending,
                get__vouchers_by_id.pending,
                post_voucher.pending,
                post_voucher_auto.pending,
                post_check_voucher.pending,
                put_use_voucher.pending,
                put_voucher.pending,
                delete_voucher.pending), (state,) => {
                    state.isLoading = true;
                })
        builder.addMatcher(
            isAnyOf(
                get__all_vouchers.rejected,
                get__vouchers_by_user_id.rejected,
                get__vouchers_by_id.rejected,
                post_voucher.rejected,
                post_voucher_auto.rejected,
                post_check_voucher.rejected,
                put_use_voucher.rejected,
                put_voucher.rejected,
                delete_voucher.rejected), (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
    }
})

export default VoucherPage.reducer;