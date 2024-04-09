
const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const userSignIn = async (data)=>{
    const loginResp=  await fetch(`${BASE_URL}/mba/api/v1/auth/signin`,{

        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    });
    
    return loginResp;
}