import { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import SearchIcon from "./search.svg";
//237d6975
const API_URL='http://www.omdbapi.com?apikey=237d6975';
export default function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState([])

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Avatar')
  }, [])

  return (
    <div className="app">
      <h1>Cinema.com</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  );
}

