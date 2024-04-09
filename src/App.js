import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Auth from './Pages/Auth';
import PageNotFound from './Pages/PageNotFound';
import MovieDetails from './Pages/MovieDetails';
import Bookings from './Pages/Bookings';
import LandingPage from './Pages/LandingPage'
import AuthHoc from './hoc/authhoc';
import { createContext, useState } from 'react';
import MovieTheater from './Pages/MovieTheater';
import AllTheatres from './Pages/AllTheaters';
import TheatreMOvies from './Pages/TheatreMovies';

export const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState("Light")
  return (
    <ThemeContext.Provider value={{theme, changeTheme: setTheme}}>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth/>}/>
          <Route path="/signup" element={<Auth/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path='/movie/:movieid' element={<AuthHoc> <MovieDetails/></AuthHoc>}/> {/*Dynamic route */}
          <Route path="/bookings" element={<AuthHoc> <Bookings/></AuthHoc>}/>
          <Route path='/buyTickets/:movieid' element={<AuthHoc> <MovieTheater/></AuthHoc>}/>
          <Route path='/buyTickets/:movieid/:theaterid' element={<AuthHoc> <Bookings/></AuthHoc>}/>
          <Route path="/theatres" element={<AuthHoc> <AllTheatres/></AuthHoc>}/>
          <Route path="/:theaterid/movies" element={<AuthHoc> <TheatreMOvies/></AuthHoc>}/>
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
