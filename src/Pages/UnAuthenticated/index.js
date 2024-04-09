import { useContext } from "react"
import Button from "react-bootstrap/esm/Button"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"

function UnAuthenticated(){
    const themeContextValue = useContext(ThemeContext)
    console.log(themeContextValue)

    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate("/login")
    }

    return <div className="vh-100 bg-light text-dark d-flex justify-content-center align-items-center flex-column">
        <h4>Oops!You have to login first</h4>
        <Button onClick={navigateToLogin} className="bg-success">Login</Button>
    </div>
}

export default UnAuthenticated