import React from 'react'

const BookingEmployee = () => {
    return (
        <>
            <div className='employees-section'>
                <div className='employee-section'>
                    {/* <img src={require("../../../../assets/images/ITPShince-logos.jpeg")} alt=""
                        style={{
                            backgroundColor: "#22d3ee",
                            color: "white",
                            borderRadius: "30px",
                            padding: 6,
                            cursor: "pointer",
                            height: 200,
                            width: 200,
                        }}
                    /> */}
                    <p>Thien Nguyen</p>
                    <button className='btn btn-add-em'>Select</button>
                </div>
                <div className='employee-section'>
                    {/* <img src={require("../../../../assets/images/clearmen2.jpg")} alt=""
                        style={{
                            backgroundColor: "#22d3ee",
                            color: "white",
                            borderRadius: "30px",
                            padding: 6,
                            cursor: "pointer",
                            height: 200,
                            width: 200,
                        }}
                    /> */}
                    <p>Maria Selena</p>
                    <button className='btn btn-add-em'>Select</button>
                </div>
                
            </div>
            <div className='selected-ems'>
                <div className='selected-em'>
                <b>Thien Nguyen</b>
                <button className='btn btn-remove'>X</button>
                </div>        
            </div>
        </>
    )
}

export default BookingEmployee