import { useNavigate, useSearchParams } from "react-router-dom"
import "./style.css"
import { useState } from "react"
import { userSignIn } from "../../api/auth";

function Login(){

    const [userId, setUserId]= useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const onFormDataChange=(e)=>{
        console.log(e.target)
        const id = e.target.id;

        if(id==="userId"){
            setUserId(e.target.value)
        }
        else if(id==="password"){
            setPassword(e.target.value);
        }
    }

    const onLogin = async (e) => {
        e.preventDefault()
        const data = {userId, password}
        const signInRes = await userSignIn(data)
        console.log(signInRes)

        const statusCode = signInRes.status

        if(statusCode == 200){
            setErrorMessage("")
            const resBody = await signInRes.json()
            console.log(resBody)
            const {name, email, userId, userStatus, accessToken, userType} = resBody

            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("userId", userId)
            localStorage.setItem("userStatus", userStatus)
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("userType", userType)

            navigate("/")
        }else{
            setErrorMessage("Invalid Credentials")
        }
    }

    return <div className="bg-dark vh-100 d-flex
    justify-content-center align-items-center">

       <div style={{width:"50rem"}} className="card p-5">

           <h4>
               Log In 
           </h4>

       <form onSubmit={onLogin}>

           <div className="input-group">
               <input className="form-control m-3" 
               type="text"
               value={userId}
               onChange={onFormDataChange}
               id="userId"
               placeholder="UserId"/>
           </div>


           <div className="input-group">
               <input className="form-control m-3" 
               onChange={onFormDataChange}
               value={password}
               type="password"
               id="password"
               placeholder="Password"/>
           </div>

           <div className="input-group">
               <input className="btn btn-dark m-3"
                  type="submit"
                  value="LogIn"
                  />

           </div>

       </form>

       <span className="text-danger"> {errorMessage}  </span>

   </div>

   </div>
}

export default Login