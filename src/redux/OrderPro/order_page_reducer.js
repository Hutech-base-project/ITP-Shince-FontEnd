import { createSlice ,isAnyOf} from "@reduxjs/toolkit";
 import { postOrderPro,putOrderPro, getOrderProduct, getOrderProDetail, getOrderProByUser } from "./order_page_thunk";

const initialState = {
    isLoading:false,
    error:"",
    success:false
}

export const OrderProPage = createSlice({
    name:'orderPro',
    initialState,
    reducers: {
        offSuccess: (state, action) => {
          state.success = false
        },
      },
    extraReducers:(builder) =>{
     builder.addCase( postOrderPro.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.success = true
     })

     builder.addMatcher(isAnyOf(
      putOrderPro.fulfilled,
      getOrderProduct.fulfilled,
      getOrderProDetail.fulfilled,
      getOrderProByUser.fulfilled,
      ),(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(
      postOrderPro.pending,
      getOrderProduct.pending,
      putOrderPro.pending,
      getOrderProDetail.pending,
      getOrderProByUser.pending,
      ),(state,action)=>{
      state.isLoading = true;
   })
     builder.addMatcher(isAnyOf(
      postOrderPro.rejected,
      getOrderProduct.rejected,
      putOrderPro.rejected,
      getOrderProDetail.rejected,
      getOrderProByUser.rejected,
      ),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
        state.success = false
     })
    }   
})
export const { offSuccess } = OrderProPage.actions;

export default OrderProPage.reducer;