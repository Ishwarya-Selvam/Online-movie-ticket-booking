import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getTheaterDetails } from "../../api/theater"
import NavbarComp from "../../Components/Navbar"
import Loader from "../../Components/common/Spinner"
import { Button } from "react-bootstrap"

function TheatreMOvies(){
    const {theaterid} = useParams()
    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    console.log(theaterid)
    const init = async () => {
        const theaterdetails = await getTheaterDetails(theaterid)
        console.log(theaterdetails.movies)
        setIsLoading(false)
        setMovieDetails(theaterdetails.movies)
    }
    useEffect(() => {
        init()
    }, [])
    return <div>
        <NavbarComp/>
        {isLoading && <Loader/>}
        {
            !isLoading && 
            <div>
                {
                    movieDetails.map((movie) => <div style={{border: "2px solid grey", cursor: "pointer"}} className="m-5 px-5 py-5 row">
                        <div className="col">
                            <img src={movie.posterUrl} height={100} width={100} /> 
                        </div>
                        <div className="col">
                            <h5>{movie.name}</h5>
                        </div>
                        <div className="col">
                            <div>
        
                            <h5>{movie.language}</h5>
                            </div>
        
                        </div>
        
        
        
                        <div className="col">
                            <div>
        
                                <Button variant="danger" className="col-10 text-light  p-2"><Link className="text-light" to={`/buyTickets/${movie._id}/${theaterid}`}>Book Ticket</Link></Button>
        
                            </div>
        
                        </div>
        
        
                    </div>)
                }
            </div>
        }
    </div>
}

export default TheatreMOvies