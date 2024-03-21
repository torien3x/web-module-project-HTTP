import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route,Navigate, redirect } from 'react-router-dom';

import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    setMovies(movies.filter(item => (item.id !== Number(id))));
    // Make a DELETE request using Axios
    // On success update the movies list in state
    // and navigate the user to /movies
    // Hand this function down to the correct component
  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Router>
            <Route path="movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>  

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies}/>
            </Route>
            <Route path="movies/:id">
              <Movie deleteMovie={deleteMovie}/>
            </Route>  

            <Route path="movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <redirect to="/movies" />
            </Route>
          </Router>
        </div>
      </div>
    </div>
  );
};


export default App;
