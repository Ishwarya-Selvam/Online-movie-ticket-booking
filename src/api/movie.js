
const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const getAllMovies = async () =>{
    const moviePromise = await fetch(`${BASE_URL}/mba/api/v1/movies`)
    const moviesData = await moviePromise.json()
    return moviesData
}

export const getMovieDetails = async (id) =>{
    const token = localStorage.getItem("accessToken")
    console.log("geting movie data", id)
    const moviePromise = await fetch(`${BASE_URL}/mba/api/v1/movies/${id}`, {
        headers:{
            "X-Access-Token": token
        }
    })
    const moviesData = await moviePromise.json()
    console.log("got movie data", moviesData)
    return moviesData
}