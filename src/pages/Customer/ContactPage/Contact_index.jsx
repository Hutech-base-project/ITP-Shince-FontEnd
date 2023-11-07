import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import ContactBody from './Components/Contact_body';

function ContactIndex() {
  return (
    <>
      <CustomerHeader />
      <ContactBody />
      <CustomerFooter />
    </>
  );
}

export default ContactIndex