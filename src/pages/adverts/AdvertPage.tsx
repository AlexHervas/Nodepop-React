import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Advert } from "./types";
import { deleteAdvert, getAdvert } from "./service";
import { isApiClientError } from "../../api/client";
import Page from "../../components/layout/Page";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import "./AdvertPage.css";

function AdvertPage() {
  // Obtener parámetros de la URL
  const params = useParams();
  const navigate = useNavigate();

  // Estado para almacenar la información del anuncio
  const [advert, setAdvert] = useState<Advert | null>(null);

  // Estado para controlar la visibilidad del cuadro de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Estado para gestionar la carga durante la eliminación
  const [loading, setLoading] = useState(false);

  // Efecto para obtener los datos del anuncio cuando cambia el ID en los parámetros
  useEffect(() => {
    if (params.advertId) {
      getAdvert(params.advertId)
        .then((advert) => setAdvert(advert)) // Guardar los datos del anuncio en el estado
        .catch((error) => {
          if (isApiClientError(error)) {
            if (error.code === "NOT_FOUND") {
              navigate("/404"); // Redirigir a página 404 si no se encuentra el anuncio
            }
          }
        });
    }
  }, [params.advertId, navigate]);

  // Función para eliminar el anuncio
  const handleDelete = async () => {
    if (advert && params.advertId) {
      setLoading(true); // Indicar que la eliminación está en progreso
      try {
        await deleteAdvert(params.advertId);
        navigate("/adverts"); // Redirigir a la lista de anuncios tras la eliminación
      } catch (error) {
        console.error("Error deleting advert:", error);
      } finally {
        setLoading(false);
        setShowConfirmation(false); // Ocultar el cuadro de confirmación tras la eliminación
      }
    }
  };

  return (
    <Page title="ADVERT DETAIL">
      {advert ? (
        <div className="advert-details">
          <h2>{advert.name}</h2>

          {/* Mostrar la imagen del anuncio o un placeholder si no tiene imagen */}
          <img
            src={advert.photo || "https://placehold.co/600x400"}
            alt={advert.name || "Placeholder Image"}
          />

          <p>
            <strong>Price:</strong> {advert.price} €
          </p>
          <p>
            <strong>Type:</strong> {advert.sale ? "SALE" : "BUY"}
          </p>
          <p>
            <strong>Tags:</strong> {advert.tags.join(", ")}
          </p>

          {/* Botón para eliminar el anuncio, muestra mensaje de carga si está en proceso */}
          <button
            className="delete-button"
            onClick={() => setShowConfirmation(true)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Advert"}
          </button>

          {/* Diálogo de confirmación para eliminar el anuncio */}
          <ConfirmDialog
            isOpen={showConfirmation}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirmation(false)}
            disabled={loading}
            title="Delete Advert"
            confirmButtonText="Delete"
            message="Do you want to delete the advert, the action is permanent"
          />
        </div>
      ) : (
        <p>Loading advert details... ⏳</p> // Mensaje de carga mientras se obtiene el anuncio
      )}
    </Page>
  );
}

export default AdvertPage;
