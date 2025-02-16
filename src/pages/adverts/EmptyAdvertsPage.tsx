import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import "./Advert.css";

const EmptyAdvertsPage: React.FC = () => (
  <div className="advertsPage-empty">
    {/* Mensaje informativo cuando no hay anuncios disponibles */}
    <p>No adverts have been created yet, be the first one!</p>

    {/* Botón para crear un nuevo anuncio, enlazando a la página de creación */}
    <Link to="/adverts/new">
      <Button>Create advert</Button>
    </Link>
  </div>
);

export default EmptyAdvertsPage;
