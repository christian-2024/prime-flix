import { Link } from "react-router-dom";
import "./style.css";
function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Json Flix
      </Link>{" "}
      <div className="menu">
        <Link className="filmes" to="/">
          Filmes
        </Link>
        <Link className="favoritos" to="/favoritos">
          Favoritos
        </Link>
      </div>
    </header>
  );
}

export default Header;
