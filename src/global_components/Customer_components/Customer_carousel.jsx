import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'


const CustomerCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <div className="carousel-cus">
                {/* <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img src={require("../../assets/template/images/slider1.jpg")} alt="logo" width={1903} />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../../assets/template/images/slider1.jpg")} alt="logo" width={1903} />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../../assets/template/images/slider1.jpg")} alt="logo" width={1903} />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> */}

                <Carousel fade>
                    <Carousel.Item>
                        <img src={require("../../assets/images/slider1.jpg")} alt="logo" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../../assets/images/slider2.jpg")} alt="logo" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../../assets/images/slider3.jpg")} alt="logo" />
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    )
}

export default CustomerCarousel