import { createSlice ,isAnyOf} from "@reduxjs/toolkit";
 import {get_all_orders , get_order_by_user_id, post_order, put_order} from "./order_page_thunk";

const initialState = {
    orders:[],
    isLoading:false,
    error:"",
    success:false
}

export const OrderProPage = createSlice({
    name:'orderPro',
    initialState,
    reducers: {
        offSuccess: (state, action) => {
          state.success = false;
        },
      },
    extraReducers:(builder) =>{
    builder.addCase(get_all_orders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
    })
    builder.addCase(get_order_by_user_id.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
  })
     builder.addCase(post_order.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.success = true;
     })

     builder.addMatcher(isAnyOf(
      put_order.fulfilled,
      get_all_orders.fulfilled,
      get_order_by_user_id.fulfilled,
      ),(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(
      get_all_orders.pending,
      get_order_by_user_id.pending,
      post_order.pending,    
      put_order.pending,      
      ),(state,action)=>{
      state.isLoading = true;
   })
     builder.addMatcher(isAnyOf(
      get_all_orders.rejected,
      get_order_by_user_id.rejected,
      post_order.rejected,
      put_order.rejected,   
      ),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
        state.success = false
     })
    }   
})
export const { offSuccess } = OrderProPage.actions;

export default OrderProPage.reducer;