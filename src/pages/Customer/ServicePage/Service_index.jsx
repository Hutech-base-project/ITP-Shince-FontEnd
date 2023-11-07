import React from 'react'
import ServiceBody from './Components/Service_body'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'

const ServiceIndex = () => {
  return (
    <>
      <CustomerHeader />
      <main>
        <ServiceBody />
      </main>
      <CustomerFooter />
    </>
  )
}

export default ServiceIndex
