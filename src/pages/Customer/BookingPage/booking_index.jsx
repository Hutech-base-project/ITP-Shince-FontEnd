import React from 'react'
import BookingBody from './components/booking_body'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'

const BookingIndex = () => {
    return (
        <>
            <CustomerHeader />
            <main>
            <BookingBody/>
            </main>
            <CustomerFooter />
        </>
    )
}

export default BookingIndex
