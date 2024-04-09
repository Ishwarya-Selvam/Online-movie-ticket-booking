function Theater(props){
    const {theater, movieId} = props

    const name = theater.name
    console.log("theatre", name)
    console.log(movieId)
    return  <div style={{border: "2px solid grey", cursor: "pointer"}} className="m-5 px-5 py-5 row">
                <div className="col">
                    <h5>{name}</h5>
                </div>
                <div className="col">
                    <div>

                        <i className="bi bi-phone text-success fw-bold"> </i>
                        <span className="text-success">M-Ticket</span>
                    </div>

                </div>



                <div className="col">
                    <div>

                        <i className="bi bi-cup-straw fw-bold text-danger"> </i>
                        <span className="text-success">Food & Beverage</span>

                    </div>

                </div>


            </div>
}

export default Theater