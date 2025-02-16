import { ChangeEvent, useEffect, useState } from "react";
import { Advert } from "./types";
import { getLatestAdverts } from "./service";
import Page from "../../components/layout/Page";
import FormField from "../../components/shared/FormField";
import AdvertContainer from "./Advert";
import EmptyAdvertsPage from "./EmptyAdvertsPage";
import "./AdvertsPage.css";

function AdvertsPage() {
  // Estados para gestionar los anuncios, filtros y la visibilidad del panel de filtros
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [filteredName, setFilteredName] = useState("");
  const [filteredSale, setFilteredSale] = useState("all");
  const [maxPrice, setMaxPrice] = useState(0);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // useEffect para obtener los anuncios al montar el componente
  useEffect(() => {
    getLatestAdverts()
      .then((response) => {
        setAdverts(response);

        // Calculamos el precio máximo entre los anuncios recibidos
        if (response.length > 0) {
          const maxAdvertPrice = Math.max(...response.map((ad) => ad.price));
          setMaxPrice(maxAdvertPrice);
        }
      })
      .catch((error) => {
        console.error("Error fetching adverts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Función para actualizar el filtro por nombre
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setFilteredName(event.target.value);
  };

  // Función para actualizar el filtro de tipo de venta (compra o venta)
  const handleTypeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setFilteredSale(event.target.value);
  };

  // Función para actualizar el filtro de precio máximo
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  // Función para manejar la selección de tags (agregar o quitar del filtro)
  const handleTagChange = (tag: string) => {
    setFilteredTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  // Cálculo del precio mínimo y máximo entre los anuncios
  const minPrice =
    adverts.length > 0 ? Math.min(...adverts.map((ad) => ad.price)) : 0;
  const maxAdvertPrice =
    adverts.length > 0 ? Math.max(...adverts.map((ad) => ad.price)) : 100;

  // Obtener una lista única de tags disponibles en los anuncios
  const uniqueTags = Array.from(
    new Set(adverts.flatMap((advert) => advert.tags)),
  );

  // Filtrado de anuncios basado en los criterios seleccionados
  const filteredAdverts = adverts.filter((advert) => {
    const matchesName = advert.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());
    const matchesSale =
      filteredSale === "all" || (advert.sale ? "sell" : "buy") === filteredSale;
    const matchesMaxPrice = advert.price <= maxPrice;
    const matchesTags =
      filteredTags.length === 0 ||
      advert.tags.some((tag) => filteredTags.includes(tag));

    return matchesName && matchesSale && matchesMaxPrice && matchesTags;
  });

  // Opciones de venta disponibles
  const saleOptions = ["sell", "buy", "all"];

  // Alternar la visibilidad del panel de filtros
  const toggleFilters = () => setIsFiltersVisible((prev) => !prev);

  // Cálculo del porcentaje del slider para mostrar la posición del precio seleccionado
  const pricePercentage =
    ((maxPrice - minPrice) / (maxAdvertPrice - minPrice)) * 100 || 0;

  return (
    <Page title="Advert List">
      <div className="advert-filters-container">
        <button className="advert-filters-toggle" onClick={toggleFilters}>
          {isFiltersVisible ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>

        {isFiltersVisible && (
          <div className="advert-filters">
            {/* Filtro por nombre */}
            <FormField
              type="text"
              name="query"
              value={filteredName}
              onChange={handleSearch}
              label="Filter by name"
            />

            {/* Filtro por precio máximo con slider */}
            <p>Filter by price:</p>
            <div className="price-slider">
              <div className="slider-container">
                <input
                  type="range"
                  min={minPrice}
                  max={maxAdvertPrice}
                  value={maxPrice}
                  onChange={handlePriceChange}
                  className="slider"
                />
                <span
                  className="slider-value"
                  style={{ left: `calc(${pricePercentage}% - 15px)` }}
                >
                  ${maxPrice}
                </span>
              </div>
            </div>

            {/* Filtro por tipo de venta */}
            <p>Filter by sale type:</p>
            {saleOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="sale"
                  value={option}
                  onChange={handleTypeRadio}
                  checked={filteredSale === option}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}

            {/* Filtro por tags */}
            <p>Filter by tags:</p>
            <div className="tag-filters">
              {uniqueTags.map((tag) => (
                <label key={tag} className="tag-option">
                  <input
                    type="checkbox"
                    value={tag}
                    onChange={() => handleTagChange(tag)}
                    checked={filteredTags.includes(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Renderizado de la lista de anuncios */}
      <div className="adverts-container">
        {loading ? (
          <p className="adverts-loading">Loading adverts... ⏳</p>
        ) : filteredAdverts.length !== 0 ? (
          <div className="advert-div">
            {filteredAdverts.map((advert) => (
              <AdvertContainer key={advert.id} {...advert} />
            ))}
          </div>
        ) : (
          <EmptyAdvertsPage />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
