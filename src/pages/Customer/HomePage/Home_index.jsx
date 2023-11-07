import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerCarousel from '../../../global_components/Customer_components/Customer_carousel'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import HomeBody from './Components/Home_body'
const HomeIndex = () => {
  return (
    <>	
      <CustomerHeader/>
      <CustomerCarousel/>
      <HomeBody/>
      <CustomerFooter/>
    </>
  )
}

export default HomeIndex