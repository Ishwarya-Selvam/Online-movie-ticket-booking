import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';




function NavbarComp() {
  const navigate = useNavigate()

  const themeContextValue = useContext(ThemeContext)
  const isLightTheme = themeContextValue.theme ==='Light'
  const {changeTheme} = themeContextValue

  const onThemeToggle = () => {
    if(isLightTheme){
      changeTheme("dark")
    }
    else{
      changeTheme("Light")
    }
  }

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Navbar className={(isLightTheme) ? "bg-dark" : "bg-light "} expand="lg">
      <Container>
        <Navbar.Brand className={(isLightTheme)?'text-light':"text-dark"} href="#home">Movie Booking Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={(isLightTheme)?'text-light':"text-dark"}> 
            <Nav.Link href="/" className={(isLightTheme)?'text-light':"text-dark"}>Home</Nav.Link>
            <Nav.Link href="/theatres" className={(isLightTheme)?'text-light':"text-dark"}>Theatres</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button onClick={onLogout} className='bg-danger'>
          Logout
        </Button>
        <Button onClick={onThemeToggle} className='bg-danger'>
          Toggle Theme
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;