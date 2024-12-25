import "./style.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMovies = localStorage.getItem("filmesSalvos");

    if (savedMovies) {
      setMovies(JSON.parse(savedMovies) || []);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando favoritos...</h2>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="loading">
        <h2>Não há filmes favoritos</h2>
      </div>
    );
  }

  function removeMovieById(movieId) {
    const removeMovies = movies.filter((movie) => {
      return movie.id !== movieId;
    });
    setMovies(removeMovies);
    localStorage.setItem("filmesSalvos", JSON.stringify(removeMovies));
    toast.success("Filme removido com sucesso!");
  }
  return (
    <div className="favoritos">
      <h1>Favoritos</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <h2>{movie.original_title}</h2>
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.original_title}
            />
            <div className="overviwer-contanier">
              <p>{movie.overview}</p>
            </div>
            <div>
              <span>Avaliação: {movie.vote_average} / 10 </span>
            </div>
            <div className="buttons-princ">
              <div className="area-buttons">
                <Link className="details" to={`/filme/${movie.id}`}>
                  Ver detalhes
                </Link>
              </div>
              <div className="area-buttons">
                <Link
                  className="delete"
                  onClick={() => removeMovieById(movie.id)}
                >
                  Excluir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Favoritos;
