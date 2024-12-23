import "../../index.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "039664d6a1181ffddf5360026a38471d",
          language: "pt-BR",
          page: 1,
        },
      });
      //console.log(response.data.results.slice(0, 10));
      setMovies(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="movies">
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img
                className="img"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
              <Link to={`/filme/${movie.id}`} className="botao">
                Acessar
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
