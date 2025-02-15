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

  return (
    <Page title="Advert List">
      <FormField
        type="text"
        name="query"
        value={filteredName}
        onChange={handleSearch}
        label={"Filter by name"}
      ></FormField>

      <div className="advert-filters">
        <p>Filter by sale type:</p>

        <label>
          <input
            type="radio"
            name="sale"
            value="sell"
            onChange={handleTypeRadio}
          />
          Sell
        </label>

        <label>
          <input
            type="radio"
            name="sale"
            value="buy"
            onChange={handleTypeRadio}
          />
          Buy
        </label>

        <label>
          <input
            type="radio"
            name="sale"
            value="all"
            onChange={handleTypeRadio}
          />
          All
        </label>
      </div>

      <div className="adverts-container">
        {loading ? (
          <p>Loading adverts...</p>
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
