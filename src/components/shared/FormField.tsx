import type { ComponentProps } from "react";
import "./FormField.css";

interface Props extends ComponentProps<"input"> {
  label: string;
}

const FormField = ({ label, ...props }: Props) => {
  return (
    <div className="formField">
      <label className="formField-label">
        <span>{label}</span>
        <input className="formField-input" autoComplete="off" {...props} />
      </label>
    </div>
  );
};

export default FormField;
