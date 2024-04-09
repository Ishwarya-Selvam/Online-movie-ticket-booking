import { useContext, useEffect, useState } from "react";
import NavbarComp from "../../Components/Navbar";
import Loader from "../../Components/common/Spinner";
import Movie from "../../Components/Movie";
import "./style.css";
import { getAllMovies } from "../../api/movie";
import { ThemeContext } from "../../App";

let allMovieData = []

function Landing(){
    console.log("Landing Page")

    const themeContextValue = useContext(ThemeContext)
    console.log(themeContextValue)
    const isLightTheme = themeContextValue.theme === 'Light'

    const [isLoading, setIsLoading] = useState(true)
    const [movieData, setMovieData] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const fetchMOviesData = async() => {
        const movieData = await getAllMovies()
        console.log(movieData)
        setIsLoading(false)
        setMovieData(movieData)
        allMovieData = movieData
    }

    const onSearChange = (e) => {
        setSearchValue(e.target.value)
    }

    const filterMovies = () => {
        console.log(allMovieData)
        if(!allMovieData.length)
            return
        const newMovie = allMovieData.filter((movie) => {
            return movie.name.toLowerCase().startsWith(searchValue.toLowerCase())
        })

        setMovieData(newMovie)
    }

    useEffect(() => {
        console.log("use effect is called")
        fetchMOviesData()
    }, [])

    useEffect(() => {
        filterMovies()
    }, [searchValue])

    console.log("rendering UI")
    return <div className={(isLightTheme) ? "bg-light text-dark" : "bg-dark text-light"}>
        <NavbarComp/>
        <div className="searchbox">
            <form>
                <input value={searchValue} type="text" onInput={onSearChange} placeholder="Search movie"></input>
            </form>
        </div>
        {
            isLoading ? <Loader/> : <div className="movieList">
                    {
                        movieData.map((movie) => {
                            return <Movie movieDetails = {movie}/>
                        })
                    }
                </div>
        }
    </div>
}

export default Landing