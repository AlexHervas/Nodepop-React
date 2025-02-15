import type { Advert } from "./types";
import "./Advert.css";

const AdvertContainer = ({ id, name, sale, price, tags }: Advert) => {
  return (
    <div className="advert-container">
      <a href={`/adverts/${id}`}>
        <p className="advert-name">{name}</p>
      </a>

      <span className="advert-span"></span>
      <p className="advert-price">{price}</p>
      <p className="advert-sale">{sale ? "sell" : "buy"}</p>
      <p className="advert-tags">{tags.length > 0 ? tags.join(', ') : 'No tags available'}</p>
    </div>
  );
};

export default AdvertContainer;
