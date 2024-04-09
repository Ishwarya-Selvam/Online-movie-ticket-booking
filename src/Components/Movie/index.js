import { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';

function Movie(props){
    const {movieDetails} = props

    const {name, director, language, posterUrl, releaseDate, description, _id} = movieDetails

    const themeContextValue = useContext(ThemeContext)
    console.log(themeContextValue)
    const isLightTheme = themeContextValue.theme === 'Light'

    return <div style={{ height: '500px' }}>
                <Link style={{textDecoration: 'none'}} to={`/movie/${_id}`}>
                    <Card style={{ width: '300px' }}>
                    <Card.Img variant="top" src={posterUrl} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text className='scroll'>
                        {description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Language: {language}</ListGroup.Item>
                        <ListGroup.Item>Director: {director}</ListGroup.Item>
                        <ListGroup.Item>Release Date: {releaseDate}</ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Link>
            </div>
}

export default Movie