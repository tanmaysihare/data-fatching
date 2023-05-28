import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoviesHandler() {
    setIsLoading(true);
    fetch("http://swapi.dev/api/films/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedMovies = data.results.map(moviesData => {
        return {
          id: moviesData.episode_id,
          title:moviesData.title,
          openingText:moviesData.opening_crawl,
          releaseDate: moviesData.release_date
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
       {!isLoading && movies.length === 0 && <p> No Movies Found</p>}
       {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
