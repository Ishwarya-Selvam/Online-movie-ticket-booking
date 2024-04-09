import UnAuthenticated from "../Pages/UnAuthenticated"

function AuthHoc(props){
    const name = localStorage.getItem("name")
    const token = localStorage.getItem("accessToken")

    const isLoggedIn = token && name

    if(!isLoggedIn){
        return <UnAuthenticated/>
    }

    return <div>
        {props.children}
    </div>
}

export default AuthHoc