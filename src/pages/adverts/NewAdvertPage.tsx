import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/layout/Page";
import FormField from "../../components/shared/FormField";
import Button from "../../components/shared/Button";
import "./NewAdvertPage.css";

// Importamos los hooks tipados y las acciones/thunks del store
import { useAppDispatch, useAppSelector } from "../../store";
import { advertsCreate, tagsLoaded } from "../../store/actions";
import { isApiClientError } from "../../api/client";

// Importamos el tipo para el nuevo anuncio
import { NewAdvert } from "./types";

function NewAdvertPage() {
  // Estado local para el nuevo anuncio
  const [advert, setAdvert] = useState<NewAdvert>({
    name: "",
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Obtenemos las opciones de tags desde el store
  const tagOptions = useAppSelector((state) => state.adverts.tags);
  // Si el array de tags está vacío, consideramos que aún se están cargando
  const loadingTags = tagOptions.length === 0;

  // Al montar, se despacha la acción para cargar los tags globalmente
  useEffect(() => {
    dispatch(tagsLoaded() as any);
  }, [dispatch]);

  // Maneja el envío del formulario para crear el anuncio
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Preparamos los datos en FormData para enviar, ya que el servicio espera FormData
    const formData = new FormData();
    formData.append("name", advert.name);
    formData.append("sale", String(advert.sale));
    formData.append("price", String(advert.price));
    formData.append("tags", advert.tags.join(","));
    if (advert.photo) {
      formData.append("photo", advert.photo);
    }

    try {
      // Despachamos la acción asíncrona para crear el anuncio.
      // Se espera que advertsCreate retorne el anuncio creado.
      const createdAdvert = await dispatch(advertsCreate(formData) as any);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (isApiClientError(error)) {
        if (error.code === "UNAUTHORIZED") {
          navigate("/login");
        } else {
          setErrorMessage(
            error.message || "An error occurred. Please try again.",
          );
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Maneja cambios en los inputs del formulario
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files, checked } =
      event.target as HTMLInputElement;

    setAdvert((prevAdvert) => {
      if (type === "file" && files) {
        return { ...prevAdvert, photo: files[0] };
      }
      if (type === "checkbox") {
        // Actualiza el array de tags
        const newTags = checked
          ? [...prevAdvert.tags, value]
          : prevAdvert.tags.filter((tag) => tag !== value);
        return { ...prevAdvert, tags: newTags };
      }
      return {
        ...prevAdvert,
        [name]: name === "sale" ? value === "true" : value,
      };
    });
  };

  const { name, price, tags } = advert;
  // Deshabilita el botón si faltan campos obligatorios o si está en proceso
  const isDisabled = !name || price <= 0 || tags.length === 0 || isLoading;

  return (
    <Page title="Create your advert">
      <form className="newAdvertPage-form" onSubmit={handleSubmit}>
        {/* Campo para el nombre */}
        <FormField
          type="text"
          name="name"
          label="Name of your item"
          className="name"
          value={advert.name}
          onChange={handleChange}
          required
        />

        {/* Opciones para seleccionar si se vende o se compra */}
        {["true", "false"].map((value) => (
          <FormField
            key={value}
            type="radio"
            name="sale"
            label={value === "true" ? "Sell" : "Buy"}
            className="sale"
            value={value}
            onChange={handleChange}
            checked={advert.sale.toString() === value}
          />
        ))}

        {/* Campo para ingresar el precio */}
        <FormField
          type="number"
          name="price"
          label="Price of your item"
          className="price"
          value={advert.price}
          onChange={handleChange}
          required
        />

        {/* Sección para seleccionar etiquetas */}
        <div className="formField">
          <span>Tags</span>
          {loadingTags && <p>Loading tags...</p>}
          {!loadingTags &&
            tagOptions.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  name="tags"
                  value={tag}
                  checked={advert.tags.includes(tag)}
                  onChange={handleChange}
                />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ))}
        </div>

        {/* Campo para subir foto */}
        <FormField
          type="file"
          name="photo"
          label="Photo"
          className="photo"
          onChange={handleChange}
        />

        {/* Mensaje de error */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Botón para enviar */}
        <Button
          className="button"
          type="submit"
          $variant="primary"
          disabled={isDisabled}
        >
          {isLoading ? "Creating..." : "Create Advert"}
        </Button>
      </form>
    </Page>
  );
}

export default NewAdvertPage;
