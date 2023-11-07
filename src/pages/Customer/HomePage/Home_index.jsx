import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerCarousel from '../../../global_components/Customer_components/Customer_carousel'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import HomeBody from './Components/Home_body'

function HomeIndex() {
  return (
    <>
        {/* <-- Preloader --> */}
	{/* <div className="preloader">
		<div className="preloader-inner">
			<div className="preloader-icon">
				<span></span>
				<span></span>
			</div>
		</div>
	</div> */}
	{/* <!-- End Preloader --> */}
	
	<CustomerHeader/>
	<CustomerCarousel/>
	<HomeBody/>
	<CustomerFooter/>
    </>
  )
}

export default HomeIndex