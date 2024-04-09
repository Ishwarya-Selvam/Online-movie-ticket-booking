const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const createBooking = async (bookingReq) =>{
    const token = localStorage.getItem("accessToken")
    const bookingPromise = await fetch(`${BASE_URL}/mba/api/v1/bookings`, {
        method: "POST",
        body: JSON.stringify(bookingReq),
        headers:{
            "X-Access-Token": token,
            "Content-Type":"application/json"
        }
    })
    const bookingData = await bookingPromise.json()
    return bookingData
}

export const getBookingDetails = async (bookingId) =>{
    const token = localStorage.getItem("accessToken")
    const bookingDeatilsPromise = await fetch(`${BASE_URL}/mba/api/v1/bookings/${bookingId}`, {
        headers:{
            "X-Access-Token": token
        }
    })
    const bookingDetailsData = await bookingDeatilsPromise.json()
    return bookingDetailsData
}

