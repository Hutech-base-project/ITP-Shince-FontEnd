import React from 'react'
import "../../../assets/scss/Admin/Booking/BookingPage.scss"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment) 
const BookingPage = () => {
    return (
        <>
            <div className="myCustomHeight">
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </>
    )
}

export default BookingPage