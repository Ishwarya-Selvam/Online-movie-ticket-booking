const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const getAllTheater = async () =>{
    const token = localStorage.getItem("accessToken")
    const theaterPromise = await fetch(`${BASE_URL}/mba/api/v1/theatres`, {
        headers:{
            "X-Access-Token": token
        }
    })
    const theaterData = await theaterPromise.json()
    return theaterData
}

export const getTheatresForAMovie = async (movieId)=>{
    const theatres= await getAllTheater();

    const theatresRunning = theatres.filter((theatre)=>{

        if(theatre.movies){
            const movieIds = theatre.movies.map((movie)=>movie._id);
            return movieIds.includes(movieId);
        }
    })

    return theatresRunning;
}


export const getTheaterDetails = async (id) =>{
    const token = localStorage.getItem("accessToken")
    const theatrePromise = await fetch(`${BASE_URL}/mba/api/v1/theatres/${id}`, {
        headers:{
            "X-Access-Token": token
        }
    })
    const theatreData = await theatrePromise.json()
    return theatreData
}
