import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactPlayer from "react-player";
import NavbarComp from "../../Components/Navbar"
import Loader from "../../Components/common/Spinner"
import { getMovieDetails } from "../../api/movie"
import './style.css'
import { ThemeContext } from "../../App";
import Button from "react-bootstrap/esm/Button";

function MovieDetails(){
    const themeContextValue = useContext(ThemeContext)
    console.log(themeContextValue)
    const isLightTheme = themeContextValue.theme === 'Light'

    const params = useParams()
    console.log(params)
    const movieId = params.movieid
    console.log(movieId)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [movieData, setMovieData] = useState(null)

    const name = localStorage.getItem("name")
    const token = localStorage.getItem("accessToken")

    const isLoggedIn = token && name

    if(!isLoggedIn){
        navigate("/login")
    }

    const fetchMovieDetails= async ()=>{

        const movieData= await getMovieDetails(movieId);
        console.log(movieData);
        setIsLoading(false);
        setMovieData(movieData);
    }

    useEffect(()=>{
        fetchMovieDetails();
    },[]);

    return <div className={(isLightTheme) ? "bg-light text-dark" : "bg-dark text-light"}>
        <NavbarComp/>

        {
            (isLoading) ? <Loader/> : <div>
                <div className="moviedetails bg-black">
                    <ReactPlayer url={movieData.trailerUrl} height='80%' width='80%'/>               
                </div>
                <div className="m-3">
                    <h2 className="fw-bolder">About the Movie</h2>
                    <div>
                        <span className="badge rounded-pill text-bg-secondary m-1">{movieData.language}</span>
                        <span className="badge rounded-pill text-bg-secondary m-1">{movieData.releaseStatus}</span>
                        <span className="badge rounded-pill text-bg-secondary m-1">{movieData.releaseDate}</span>
                    </div>
                    <hr/>
                    <div>
                        {movieData.description}
                    </div>
                    <hr/>
                    <div className="d-flex flex-column m-1">


                    <h2> {movieData.name}</h2>
                    <span>directed by</span><h5> {movieData.director} </h5>

                     <hr/>

                    <h3 className="m-2"> Cast </h3>

                    {
                        (movieData.cast.length === 0)? <div>Not available</div> :
                         movieData.cast &&  movieData.cast.map((name)=>{
                            return <li className="list-group-item"> <h5>{name}</h5></li>
                        })
                    }



                </div>
                <hr></hr>
                <Button variant="danger" className="col-3 text-light  p-2"><Link className="text-light" to={`/buyTickets/${movieId}`}>Book Ticket</Link></Button>
            </div>
        </div>
        }
    </div>

}

export default MovieDetails