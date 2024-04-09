import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBooking, getBookingDetails } from '../../api/booking';
import { useState } from 'react';
import { createPayment } from '../../api/payment';
import { Link, useNavigate } from 'react-router-dom';

function Payments({closeModel, show, theaterDetails, movieDetails, selectedSeats}) {
    const [showPaymentButton, setShowPaymentButton] = useState(false)
    const [bookingDetails, setBookingDetails] = useState(null)
    const isBookingCompleted = bookingDetails && bookingDetails.status === "COMPLETED"

    const navigate = useNavigate()

    console.log(movieDetails)
    const createBookingFn = async () => {
        const bookingReq = {
            theatreId: theaterDetails._id,
            movieId: movieDetails._id,
            showDate: "10/02/2024",
            showTimings: "7.00 A.M",
            seats: selectedSeats
        }
        const booking = await createBooking(bookingReq)
        console.log(booking)

        if(booking.status === "IN_PROGRESS"){
          setShowPaymentButton(true)
          setBookingDetails(booking)
        }
    }

    const makePayment = async () => {
      const bookingId = bookingDetails._id
      const paymentReq = {
        amount: selectedSeats.length * 1000,
        status: "SUCCESS"
      }
      const payment = await createPayment(bookingId, paymentReq)
      console.log(payment)
      const bookingDetailsafterpay = await getBookingDetails(bookingId)
      console.log(bookingDetailsafterpay)
      setBookingDetails(bookingDetailsafterpay)
    }

    const showLandingPage = () => {
      navigate("/")
    }
  return (
    <div className='m-5'>
            <Modal show={show} onHide={closeModel}>
        <Modal.Header closeButton>
          <Modal.Title>ORDER SUMMARY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div className='col'>
                    <h5>{movieDetails.name}</h5>
                    <small>{movieDetails.language}</small>
                    <br/>
                    <small className='text-success'>m-tickets</small>
                </div>
                <div className='col-5'>
                    <h5>{selectedSeats.length} - tickets</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col'>Theatre</div>
                <div className='col-5'>{theaterDetails.name}</div>
            </div>
            <hr/>
            <div className='row'>
                <div className='col'>
                    Total
                </div>
                <div className='col-5'>Rs.{selectedSeats.length*1000}</div>
                {

                  isBookingCompleted &&

                  <div>


                  <p className="fw-bolder"> Your Booking is confirmed </p>


                  <div className='row'>

                  <div className='col-6'>
                      <p> BookingId </p>
                  </div>

                  <div className='col-6'>
                      <p> {bookingDetails._id} </p>
                  </div>

                  </div>


                  <div className='row'>

                      <div className='col-6'>
                      <img src={movieDetails.posterUrl} height={100} width={100} /> 
                  </div>


                  <div className='col-6'>
                      <p> {movieDetails.name} </p>
                  </div>


                  </div>

                  </div>

                }
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModel}>
            Cancel
          </Button>
          {
            !isBookingCompleted && !showPaymentButton && <Button variant="success" onClick={createBookingFn}>
                Confirm Payment
              </Button>
          }
          {
            !isBookingCompleted && showPaymentButton && <Button variant="success" onClick={makePayment}>
                Make Payment
              </Button>
          }
          {
            isBookingCompleted && <Button variant="danger" onClick={showLandingPage}>
                More movies
              </Button>
          }
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default Payments;