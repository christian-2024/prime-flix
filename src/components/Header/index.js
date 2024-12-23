import { Link } from "react-router-dom";
import "./style.css";
function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        Json Flix
      </Link>{" "}
      <div className="menu">
        <Link className="favoritos" to="/favoritos">
          Filmes
        </Link>
      </div>
    </header>
  );
}

export default Header;
