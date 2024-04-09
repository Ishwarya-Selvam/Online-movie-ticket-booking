import { useEffect, useState } from "react"
import Loader from "../../Components/common/Spinner"
import { getAllTheater } from "../../api/theater"
import Theater from "../../Components/Theater"
import { Navbar } from "react-bootstrap"
import NavbarComp from "../../Components/Navbar"
import { Link } from "react-router-dom"

function AllTheatres(){
    const [theatre, setTheatre] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const init = async () => {
        const allTheatres =  await getAllTheater()
        console.log(allTheatres)
        setIsLoading(false)
        setTheatre(allTheatres)
        console.log(theatre)
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
                    theatre.map((t) => <Link to={`/${t._id}/movies`}><Theater theater={t}/></Link>)
                }
            </div>
        }
    </div>
}

export default AllTheatres