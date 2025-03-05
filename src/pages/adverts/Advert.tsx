import type { Advert } from "./types";
import "./Advert.css";
import { Link } from "react-router-dom";

const AdvertContainer = ({ id, name, sale, price, tags, photo }: Advert) => {
  // Imagen por defecto en caso de que el anuncio no tenga foto
  const placeholderImage = "https://placehold.co/600x400";

  return (
    <div className="advert-container">
      {/* Nombre del anuncio */}
      <p className="advert-name">{name}</p>

      {/* Imagen del anuncio, enlazada a la página de detalles */}
      <Link to={`/adverts/${id}`}>
        <img
          src={photo || placeholderImage} // Si no hay foto, usa la imagen de placeholder
          alt={name} // Descripción alternativa para accesibilidad
          className="advert-image"
        />
      </Link>

      {/* Espacio visual para separar elementos */}
      <span className="advert-span"></span>

      {/* Precio del anuncio */}
      <p className="advert-price">{price} €</p>

      {/* Tipo de transacción (venta o compra) */}
      <p className="advert-sale">{sale ? "For Sale" : "For Buy"}</p>

      {/* Etiquetas del anuncio, mostrando un mensaje si no tiene ninguna */}
      <p className="advert-tags">
        {tags.length > 0 ? tags.join(", ") : "No tags available"}
      </p>
    </div>
  );
};

export default AdvertContainer;
