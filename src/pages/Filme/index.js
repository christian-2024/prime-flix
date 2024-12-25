import "../../index.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function Filme() {
  const [movies, setMovies] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function Movies() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: "039664d6a1181ffddf5360026a38471d",
            language: "pt-BR",
          },
        });

        console.log(response.data);
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Filme não encontrado");
        navigate("/");
      }
    }
    Movies();

    return () => {
      console.log("Desmontou");
    };
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }
  function saveFilme() {
    const minhalista = localStorage.getItem("filmesSalvos");
    let filmesSalvos = JSON.parse(minhalista) || [];
    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === movies.id
    );
    if (hasFilme) {
      toast.warn("Filme já está salvo.");
      return;
    } else {
      filmesSalvos.push(movies);
      localStorage.setItem("filmesSalvos", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!");
    }
  }

  return (
    <div className="filme-info">
      <strong>{movies.original_title}</strong>
      <img
        className="img"
        src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
        alt={movies.original_title}
      />
      <div className="assessment">
        <a>Avaliação </a>
        <a>{movies.vote_average} /10</a>
        <a> Cont.: {movies.vote_count}</a>
      </div>
      <h3>Sinopse</h3>
      <h4>{movies.overview}</h4>
      <h3>Gêneros</h3>
      <p>
        {movies.genres && movies.genres.map((genre) => genre.name).join(", ")}
      </p>
      <div className="buttons-princ">
        <div className="area-buttons">
          <Link onClick={saveFilme} className="save">
            Salvar
          </Link>
        </div>
        <div className="area-buttons">
          <a
            className="trailer"
            href={`https://www.youtube.com/results?search_query=${movies.original_title} Trailer`}
            target="blank"
            rel="external"
          >
            Trailer
          </a>
        </div>
      </div>
    </div>
  );
}

export default Filme;
