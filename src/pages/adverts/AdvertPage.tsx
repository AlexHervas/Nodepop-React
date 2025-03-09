import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/layout/Page";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import "./AdvertPage.css";

// Importamos nuestros hooks y acciones del store
import { useAppDispatch, useAppSelector } from "../../store";
import { advertLoaded, advertsDeletedFulfilled } from "../../store/actions";
// Importamos el selector para obtener un advert por id
import { getAdvert } from "../../store/selectors";
import { deleteAdvert } from "./service";

function AdvertPage() {
  // Extraemos advertId de la URL (se espera un string)
  const { advertId } = useParams<{ advertId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Estados locales para el diálogo de confirmación y para el proceso de eliminación
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Usamos el selector para obtener el advert, solo si advertId está definido
  const advert = advertId ? useAppSelector(getAdvert(advertId)) : null;

  // Efecto para cargar el anuncio si advertId está definido
  useEffect(() => {
    if (advertId) {
      dispatch(advertLoaded(advertId));
    }
  }, [advertId, dispatch]);

  // Función para eliminar el anuncio
  const handleDelete = async () => {
    if (advertId) {
      setLoadingDelete(true);
      try {
        await deleteAdvert(advertId);
        // Despachamos la acción para eliminar el anuncio del store
        dispatch(advertsDeletedFulfilled(advertId));
        navigate("/adverts");
      } catch (error) {
        console.error("Error deleting advert:", error);
      } finally {
        setLoadingDelete(false);
        setShowConfirmation(false);
      }
    }
  };

  return (
    <Page title="ADVERT DETAIL">
      {advert ? (
        <div className="advert-details">
          <h2>{advert.name}</h2>
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
          <button
            className="delete-button"
            onClick={() => setShowConfirmation(true)}
            disabled={loadingDelete}
          >
            {loadingDelete ? "Deleting..." : "Delete Advert"}
          </button>
          <ConfirmDialog
            isOpen={showConfirmation}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirmation(false)}
            disabled={loadingDelete}
            title="Delete Advert"
            confirmButtonText="Delete"
            message="Do you want to delete the advert? This action is permanent."
          />
        </div>
      ) : (
        <p>Loading advert details... ⏳</p>
      )}
    </Page>
  );
}

export default AdvertPage;
