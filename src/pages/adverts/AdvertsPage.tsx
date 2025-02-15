import { ChangeEvent, useEffect, useState } from "react";
import { Advert } from "./types";
import { getLatestAdverts } from "./service";
import Page from "../../components/layout/Page";
import FormField from "../../components/shared/FormField";
import AdvertContainer from "./Advert";
import EmptyAdvertsPage from "./EmptyAdvertsPage";
import "./AdvertsPage.css";

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [filteredName, setFilteredName] = useState("");
  const [filteredSale, setFilteredSale] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  useEffect(() => {
    getLatestAdverts()
      .then((response) => {
        setAdverts(response);
      })
      .catch((error) => {
        console.error("Error fetching adverts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilteredName(event.target.value);
  };

  const handleTypeRadio = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilteredSale(event.target.value);
  };

  const filteredAdverts = adverts.filter((advert) => {
    const matchesName = advert.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());
    const matchesSale =
      filteredSale === "all" || (advert.sale ? "sell" : "buy") === filteredSale;
    return matchesName && matchesSale;
  });

  const saleOptions = ["sell", "buy", "all"];

  const toggleFilters = () => setIsFiltersVisible((prev) => !prev);

  return (
    <Page title="Advert List">
      <div className="advert-filters-container">
        <button className="advert-filters-toggle" onClick={toggleFilters}>
          {isFiltersVisible ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>

        {isFiltersVisible && (
          <div className="advert-filters">
            <FormField
              type="text"
              name="query"
              value={filteredName}
              onChange={handleSearch}
              label={"Filter by name"}
            ></FormField>
            <p>Filter by sale type:</p>
            {saleOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="sale"
                  value={option}
                  onChange={handleTypeRadio}
                />
                {option.toUpperCase().slice(0, 1) + option.slice(1)}
              </label>
            ))}
          </div>
        )}
      </div>

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
