import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import ProductBody from './components/Product_body'
const ProductIndex = () => {
  return (
    <>
      <CustomerHeader />
      <main>
        <ProductBody />
      </main>
      <CustomerFooter />
    </>
  )
}

export default ProductIndex