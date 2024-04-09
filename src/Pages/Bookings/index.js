import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTheaterDetails } from "../../api/theater"
import { getMovieDetails } from "../../api/movie"
import NavbarComp from "../../Components/Navbar"
import Loader from "../../Components/common/Spinner"
import "./style.css"
import Cinema from "../../Components/Cinema/cinema"
import { Button } from "react-bootstrap"
import Payments from "../../Components/Payments/Payments"

function Bookings(){
    const {movieid, theaterid} = useParams()
    console.log("movieid",movieid)
    console.log(theaterid)

    const [movieDetails, setMovieDetails] = useState(null)
    const [theaterDetails, setTheaterDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [showPaymentsModel, setShowPaymentsModel] = useState(false)

    const init = async () => {
        await Promise.all([fetchTheaterDetails(), fetchmovieDetails()])
        setIsLoading(false)
    }

    const fetchTheaterDetails = async () => {
        const theatreData = await getTheaterDetails(theaterid)
        console.log(theatreData)
        setTheaterDetails(theatreData)
    }

    const fetchmovieDetails = async () => {
        const movieData = await getMovieDetails(movieid)
        console.log(movieData)
        setMovieDetails(movieData)
    }
 
    const openModel = () => {
        setShowPaymentsModel(true)
    }

    const onPaymentClick = () => {
        openModel()
    }

    const closeModel = () => {
        setShowPaymentsModel(false)
    }

    useEffect(() => {
        init()
    }, [])
    return <div className="vh-100">
        {isLoading && <Loader/>}
        {
            !isLoading && <div>
                <div style={{backgroundColor:"#f5f5fa", fontFamily:"Roboto, sans-serif"}} className="fw-bold">
                    <h4>{movieDetails.name}</h4>
                    <h6>{theaterDetails.name}</h6>
                </div>
                <ShowCase/>
                <Cinema movieDetails={movieDetails} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="info">
                        You have Selected <span className="count">{selectedSeats.length}</span> seat
                    </p>
                    <p className="info">
                        Your price for booking is <span className="count">{(selectedSeats.length) * 1000}</span>
                    </p>
                    <Button onClick={onPaymentClick} variant="success" disabled={selectedSeats.length === 0}>Proceed to Payment</Button>
                </div>
            </div>
        }
        {
            showPaymentsModel && <Payments closeModel={closeModel} show={showPaymentsModel} theaterDetails={theaterDetails} movieDetails={movieDetails} selectedSeats={selectedSeats}/>
        }
        
    </div>
}

function ShowCase(){
    return (
        <ul className="ShowCase">
            <li>
                <span className="seat" /> <small>N/A</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
        </ul>
    )
}
export default Bookings