import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { change_password, get_all_user, get_user_by_id, post_user, put_user, update_password } from "./account_page_thunk";


const initialState = {
    Account: null,
    listUser:[],
    isLoading: false,
    error: false,
    alertSuccess: false,
};

export const AccountPage = createSlice({
    name: "Account",
    initialState,
    reducers: {
      AddAdress: (state, action) => {
        state.usAddress = action.payload;
      },
    },
    extraReducers: (builder) => {
          builder.addCase(get_all_user.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listUser = action.payload;
            state.error = false;
          });
          builder.addMatcher(
            isAnyOf(
              get_user_by_id.rejected,
              get_all_user.rejected,
              post_user.rejected,
              put_user.rejected,
              change_password.rejected
            ),
            (state, action) => {
              state.isLoading = false;
            }
          );
          builder.addMatcher(
            isAnyOf(get_user_by_id.fulfilled),
            (state, action) => {
              state.isLoading = false;
              state.user = action.payload;
              state.error = false;
            }
          );
          builder.addMatcher(
            isAnyOf(
                post_user.fulfilled,
                update_password.fulfilled,
                change_password.fulfilled,
                put_user.fulfilled,
            ),
            (state,) => {
              state.isLoading = false;
              state.error = false;
            }
          );
          builder.addMatcher(
            isAnyOf(
              get_user_by_id.pending,
              get_all_user.pending,
              post_user.pending,
              update_password.pending,
              change_password.pending,
              put_user.pending,
            ),
            (state, action) => {
              state.isLoading = true;
            }
          );   
        },
});
export const {
  AddAdress
} = AccountPage.actions;
export default AccountPage.reducer;
