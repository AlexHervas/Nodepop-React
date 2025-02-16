import { useState } from "react";
import { NewAdvert } from "./types";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import { isApiClientError } from "../../api/client";
import Page from "../../components/layout/Page";
import FormField from "../../components/shared/FormField";
import Button from "../../components/shared/Button";
import "./NewAdvertPage.css";

function NewAdvertPage() {
  // Estado para almacenar los datos del nuevo anuncio
  const [advert, setAdvert] = useState<NewAdvert>({
    name: "",
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });

  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Estado para controlar el estado de carga del formulario
  const [isLoading, setIsLoading] = useState(false);
  // Hook para la navegación de páginas
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Crea un objeto FormData para enviar los datos del anuncio
    const formData = new FormData();
    formData.append("name", advert.name);
    formData.append("sale", String(advert.sale));
    formData.append("price", String(advert.price));
    formData.append("tags", advert.tags.join(","));

    // Si hay una foto, se añade al FormData
    if (advert.photo) {
      formData.append("photo", advert.photo);
    }

    try {
      // Llama a la API para crear el anuncio
      const createdAdvert = await createAdvert(formData);
      // Redirige a la página del anuncio recién creado
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      // Manejo de errores de la API
      if (isApiClientError(error)) {
        if (error.code === "UNAUTHORIZED") {
          // Si el usuario no está autenticado, lo redirige a login
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

  // Maneja los cambios en los campos del formulario
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files, checked } =
      event.target as HTMLInputElement;

    setAdvert((prevAdvert) => {
      if (type === "file" && files) {
        // Si se sube una imagen, se almacena en el estado
        return { ...prevAdvert, photo: files[0] };
      }

      if (type === "checkbox") {
        // Manejo de selección de etiquetas (tags)
        const newTags = checked
          ? [...prevAdvert.tags, value]
          : prevAdvert.tags.filter((tag) => tag !== value);
        return { ...prevAdvert, tags: newTags };
      }

      // Actualiza el estado según el tipo de input
      return {
        ...prevAdvert,
        [name]: name === "sale" ? value === "true" : value,
      };
    });
  };

  // Opciones de etiquetas disponibles
  const tagOptions = ["lifestyle", "mobile", "motor", "work"];
  const { name, price, tags } = advert;
  // Deshabilita el botón de envío si los campos obligatorios no están completos
  const isDisabled = !name || price <= 0 || tags.length === 0 || isLoading;

  return (
    <Page title="Create your advert">
      {/* Formulario de creación de anuncio */}
      <form className="newAdvertPage-form" onSubmit={handleSubmit}>
        {/* Campo para el nombre del producto */}
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
          {tagOptions.map((tag) => (
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

        {/* Campo para subir una foto */}
        <FormField
          type="file"
          name="photo"
          label="Photo"
          className="photo"
          onChange={handleChange}
        />

        {/* Muestra un mensaje de error si existe */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Botón para crear el anuncio */}
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
