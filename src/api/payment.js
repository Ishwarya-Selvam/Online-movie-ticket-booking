const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const createPayment = async (bookingId, paymentReq) =>{
    const token = localStorage.getItem("accessToken")
    const paymentPromise = await fetch(`${BASE_URL}/mba/api/v1/bookings/${bookingId}/payments`, {
        method: "POST",
        body: JSON.stringify(paymentReq),
        headers:{
            "X-Access-Token": token,
            "Content-Type":"application/json"
        }
    })
    const paymentData = await paymentPromise.json()
    return paymentData
}