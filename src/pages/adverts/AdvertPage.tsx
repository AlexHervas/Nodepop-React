import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advert } from "./types";
import { deleteAdvert, getAdvert } from "./service";
import { isApiClientError } from "../../api/client";
import Page from "../../components/layout/Page";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import "./AdvertPage.css";

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.advertId) {
      getAdvert(params.advertId)
        .then((advert) => setAdvert(advert))
        .catch((error) => {
          if (isApiClientError(error)) {
            if (error.code === "NOT_FOUND") {
              navigate("/404");
            }
          }
        });
    }
  }, [params.advertId, navigate]);

  const handleDelete = async () => {
    if (advert && params.advertId) {
      setLoading(true);
      try {
        await deleteAdvert(params.advertId);
        navigate("/adverts");
      } catch (error) {
        console.error("Error deleting advert:", error);
      } finally {
        setLoading(false);
        setShowConfirmation(false);
      }
    }
  };

  return (
    <Page title="ADVERT DETAIL">
      {advert ? (
        <div className="advert-details">
          <h2>{advert.name}</h2>

          {advert.photo && <img src={advert.photo} alt={advert.name} />}

          <p>
            <strong>Price:</strong> {advert.price} €
          </p>
          <p>
            <strong>Type:</strong> {advert.sale ? "SALE" : "BUY"}
          </p>
          <p>
            <strong>Tags:</strong> {advert.tags.join(", ")}
          </p>

          <button
            className="delete-button"
            onClick={() => setShowConfirmation(true)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Advert"}
          </button>

          <ConfirmDialog
            isOpen={showConfirmation}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirmation(false)}
            disabled={loading}
          />
        </div>
      ) : (
        <p>Loading advert details...</p>
      )}
    </Page>
  );
}
export default AdvertPage;
