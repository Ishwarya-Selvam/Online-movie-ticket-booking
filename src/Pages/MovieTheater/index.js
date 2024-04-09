import { Link, useParams } from "react-router-dom"
import NavbarComp from "../../Components/Navbar"
import { useEffect, useState } from "react"
import Loader from "../../Components/common/Spinner"
import { getAllTheater, getTheatresForAMovie } from "../../api/theater"
import Theater from "../../Components/Theater"

function MovieTheater(){
    const {movieid:selectedMovie } = useParams();
    const [theaterDetails, setTheaterDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    console.log("movitheatre", selectedMovie)

    const init = async ()=>{
        const theatres = await getTheatresForAMovie(selectedMovie);
        setIsLoading(false)
        setTheaterDetails(theatres)    
    }

    useEffect(() => {
        init()
    },[])

    return <div>
        <NavbarComp/>
        {isLoading && <Loader/>}
        { 
         
         !isLoading && 

         <div>

                {

                    theaterDetails.map((theatre) =>  <Link style={{textDecoration: 'none'}} to={`/buyTickets/${selectedMovie}/${theatre._id}`}><Theater theater={theatre} movieId={selectedMovie} /></Link> 
                    )
                }

            </div>     


     }

    </div>
}

export default MovieTheater
