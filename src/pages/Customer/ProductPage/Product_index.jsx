import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import ProductBody from './Components/Product_body'

function ProductIndex() {
  return (
    <>
        <CustomerHeader/>
        <ProductBody/>
        <CustomerFooter/>
    </>
  )
}

export default ProductIndex