import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../../../../assets/scss/Customer/Checkout/Checkout_customer.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CheckoutBody() {
  return (
    <>
    <div className="checkout-body">
     {/* Start Checkout  */}
     <section id="checkout" class="shop checkout section">
		  <Container>
				<Row> 
          			<Col lg={8} Col xs={12}>
						<div class="checkout-form">
							<h2>Make Your Checkout Here</h2>
							<p>Please register in order to checkout more quickly</p>
							 {/* Form  */}
							<form class="form" method="post" action="!#">
								<Row>
									<Col lg={6} md={6} xs={12}>
										<div class="form-group">
											<label>First Name<span>*</span></label>
											<input type="text" name="name" placeholder="" required="required"/>
										</div>
									</Col>
									<Col lg={6} md={6} xs={12}>
										<div class="form-group">
											<label>Last Name<span>*</span></label>
											<input type="text" name="name" placeholder="" required="required"/>
										</div>
									</Col>
									<Col lg={6} md={6} xs={12}>
										<div class="form-group">
											<label>Email Address<span>*</span></label>
											<input type="email" name="email" placeholder="" required="required"/>
										</div>
									</Col>
									<Col lg={6} md={6} xs={12}>
										<div class="form-group">
											<label>Phone Number<span>*</span></label>
											<input type="text" name="number" placeholder="" required="required"/>
										</div>
									</Col>
									
									<Col lg={6} md={6} xs={12}>
										<div class="form-group">
											<label>Address<span>*</span></label>
											<input type="text" name="address" placeholder="" required="required"/>
										</div>
									</Col>
									<Col xs={12}>
										<div class="form-group create-account">
											<input id="cbox" type="checkbox"/>
											<label>Create an account?</label>
										</div>
									</Col>
								</Row>
							</form>
							 {/* End Form  */}
						</div>
					</Col>
					<Col lg={4} xs={12}>
						<div class="order-details">
							 {/* Order Widget  */}
							<div class="single-widget">
								<h2>CART  TOTALS</h2>
								<div class="content">
									<ul>
										<li>Sub Total<span>$330.00</span></li>
										<li>(+) Shipping<span>$10.00</span></li>
										<li class="last">Total<span>$340.00</span></li>
									</ul>
								</div>
							</div>
							 {/* End Order Widget  */}
							 {/* Order Widget  */}
							<div class="single-widget">
								<h2>Payments</h2>
								<div class="content">
									<div class="checkbox">
										<label class="checkbox-inline" for="1"><input name="updates" id="1" type="checkbox"/> Check Payments</label>
										<label class="checkbox-inline" for="2"><input name="news" id="2" type="checkbox"/> Cash On Delivery</label>
										<label class="checkbox-inline" for="3"><input name="news" id="3" type="checkbox"/> PayPal</label>
									</div>
								</div>
							</div>
							 {/* End Order Widget  */}
							{/* Payment Method Widget  */}
							<div class="single-widget payement">
								<div class="content">
									<img src={require("../../../../assets/template/images/payment-method.png")} alt="logo"/>
								</div>
							</div>
							 {/* End Payment Method Widget  */}
							 {/* Button Widget  */}
							<div class="single-widget get-button">
								<div class="content">
									<div class="button">
										<a href="!#" class="btn">proceed to checkout</a>
									</div>
								</div>
							</div>
							 {/* End Button Widget  */}
						</div>
            			</Col>
					</Row>
			</Container>
		</section>
		 {/* End Checkout  */}
    

	<section id="shop-service" class="shop-services section home">
			<Container>
				<Row>
					<Col lg={3} md={6} xs={12}>
						{/* <!-- Start Single Service --> */}
						<div class="single-service">
							<FontAwesomeIcon icon={['fas', 'rocket']}  />
							<h4>Free shiping</h4>
							<p>Orders over $100</p>
						</div>
						{/* <!-- End Single Service --> */}
					</Col>
					<Col lg={3} md={6} xs={12}>
						{/* <!-- Start Single Service --> */}
						<div class="single-service">
							<FontAwesomeIcon icon={['fas', 'rotate']}  />
							<h4>Free Return</h4>
							<p>Within 30 days returns</p>
						</div>
						{/* <!-- End Single Service --> */}
					</Col>
					<Col lg={3} md={6} xs={12}>
						{/* <!-- Start Single Service --> */}
						<div class="single-service">
							<FontAwesomeIcon icon={['fas', 'lock']}  />
							<h4>Secure Payment</h4>
							<p>100% secure payment</p>
						</div>
						{/* <!-- End Single Service --> */}
					</Col>
					<Col lg={3} md={6} xs={12}>
						{/* <!-- Start Single Service --> */}
						<div class="single-service">
							<FontAwesomeIcon icon={['fas', 'tag']}  />
							<h4>Best Price</h4>
							<p>Guaranteed price</p>
						</div>
						{/* <!-- End Single Service --> */}
					</Col>
				</Row>
			</Container>
		</section>
		{/* <!-- End Shop Services --> */}
		
		{/* <!-- Start Shop Newsletter  --> */}
		<section class="shop-newsletter section">
			<Container>
				<div class="inner-top">
					<Row>
						<Col xs={12} md={{offset:2}} lg={8}>
							{/* <!-- Start Newsletter Inner --> */}
							<div class="inner">
								<h4>Newsletter</h4>
								<p> Subscribe to our newsletter and get <span>10%</span> off your first purchase</p>
								<form action="mail/mail.php" method="get" target="_blank" class="newsletter-inner">
									<input name="EMAIL" placeholder="Your email address" required="" type="email"/>
									<button class="btn">Subscribe</button>
								</form>
							</div>
							{/* <!-- End Newsletter Inner --> */}
						</Col>
					</Row>
				</div>
			</Container>
		</section>
		{/* <!-- End Shop Newsletter --> */}	
	</div>
    </>
  )
}

export default CheckoutBody