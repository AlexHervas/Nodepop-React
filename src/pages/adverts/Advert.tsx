import type { Advert } from "./types";
import "./Advert.css";

const AdvertContainer = ({ id, name, sale, price, tags, photo }: Advert) => {
  const placeholderImage =
    "https://placehold.co/600x400";

  return (
    <div className="advert-container">
      <a href={`/adverts/${id}`}>
        <p className="advert-name">{name}</p>
      </a>

      <img
        src={photo || placeholderImage}
        alt={name}
        className="advert-image"
      />

      <span className="advert-span"></span>
      <p className="advert-price">{price} €</p>
      <p className="advert-sale">{sale ? "For Sale" : "For Buy"}</p>
      <p className="advert-tags">
        {tags.length > 0 ? tags.join(", ") : "No tags available"}
      </p>
    </div>
  );
};

export default AdvertContainer;
