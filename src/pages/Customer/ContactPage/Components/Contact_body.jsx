import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../../../../assets/scss/Customer/Contact/Contact_customer.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ContactBody() {
  return (
   <>
   <div className="contact-body">
    {/* Start Contact  */}
	<section id="contact-us" class="contact-us section">
		<Container>
					<Row>
						<Col lg={8} Col xs={12}>
							<div class="form-main">
								<div class="title">
									<h4>Get in touch</h4>
									<h3>Write us a message</h3>
								</div>
								<form class="form" method="post" action="mail/mail.php">
									<Row>
										<Col lg={6} Col xs = {12}>
											<div class="form-group">
												<label>Your Name<span>*</span></label>
												<input name="name" type="text" placeholder=""/>
											</div>
										</Col>
										<Col lg={6} Col xs = {12}>
											<div class="form-group">
												<label>Your Subjects<span>*</span></label>
												<input name="subject" type="text" placeholder=""/>
											</div>
										</Col>
										<Col lg={6} Col xs = {12}>
											<div class="form-group">
												<label>Your Email<span>*</span></label>
												<input name="email" type="email" placeholder=""/>
											</div>	
										</Col>
										<Col lg={6} Col xs = {12}>
											<div class="form-group">
												<label>Your Phone<span>*</span></label>
												<input name="company_name" type="text" placeholder=""/>
											</div>	
										</Col>
										<Col xs = {12}>
											<div class="form-group message">
												<label>Your Message<span>*</span></label>
												<textarea name="message" placeholder=""></textarea>
											</div>
										</Col>
										<Col xs = {12}>
											<div class="form-group button">
												<button type="submit" class="btn ">Send Message</button>
											</div>
										</Col>
									</Row>
								</form>
							</div>
						</Col>
						<Col lg={4} Col xs = {12}>
							<div class="single-head">
								<div class="single-info">
									<div className ="icon">
                                    <FontAwesomeIcon icon={['fas', 'phone']}  />
                                        </div>
									<h4 class="title">Call us Now:</h4>
									<ul>
										<li>+(028) 5445 7777</li>
									</ul>
								</div>
								<div class="single-info">
                                <div className ="icon">
                                    <FontAwesomeIcon icon={['fas', 'envelope-open']}  />
                                        </div>
									<h4 class="title">Email:</h4>
									<ul>
										<li><a href="mailto:hutech@hutech.edu.vn.">hutech@hutech.edu.vn.</a></li>
									</ul>
								</div>
								<div class="single-info">
									<div className ="icon">
                                    <FontAwesomeIcon icon={['fas', 'location-arrow']}  />
                                        </div>
									<h4 class="title">Our Address:</h4>
									<ul>
										<li>483 Dien Bien Phu, Ward 25, Binh Thanh, Ho Chi Minh city, Viet Nam.</li>
									</ul>
								</div>
							</div>
						</Col>
					</Row>
			</Container>
	</section>
	 {/* End Contact  */}
   </div>
   </>
  )
}

export default ContactBody