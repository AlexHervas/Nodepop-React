import { useState } from "react";
import { NewAdvert } from "./types";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import { isApiClientError } from "../../api/client";
import Page from "../../components/layout/Page";
import FormField from "../../components/shared/FormField";
import Button from "../../components/shared/Button";
import "./NewAdvertPage.css"

function NewAdvertPage() {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", advert.name);
    formData.append("sale", String(advert.sale));
    formData.append("price", String(advert.price));
    formData.append("tags", advert.tags.join(","));

    if (advert.photo) {
      formData.append("photo", advert.photo);
    }

    try {
      const createdAdvert = await createAdvert(formData);
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

  const tagOptions = ["lifestyle", "mobile", "motor", "work"];
  const { name, price, tags } = advert;
  const isDisabled = !name || price <= 0 || tags.length === 0 || isLoading;

  return (
    <Page title="Create your advert">
      <form className="newAdvertPage-form" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="name"
          label="Name of your item"
          className="name"
          value={advert.name}
          onChange={handleChange}
          required
        />

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

        <FormField
          type="number"
          name="price"
          label="Price of your item"
          className="price"
          value={advert.price}
          onChange={handleChange}
          required
        />

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

        <FormField
          type="file"
          name="photo"
          label="Photo"
          className="photo"
          onChange={handleChange}
        />

        {errorMessage && <div className="error">{errorMessage}</div>}

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
