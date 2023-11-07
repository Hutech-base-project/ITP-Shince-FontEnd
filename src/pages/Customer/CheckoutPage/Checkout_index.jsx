import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import CheckoutBody from './Components/Checkout_body'

function CheckoutIndex() {
  return (
    <>
      <CustomerHeader />
      <CheckoutBody />
      <CustomerFooter />
    </>  
  ) 
}

export default CheckoutIndex