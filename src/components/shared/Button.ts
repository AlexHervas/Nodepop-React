import styled from "styled-components";

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  cursor: pointer;
  border-radius: 9999px;
  border: 2px solid;
  background-color: ${(props) =>
    props.$variant === "primary" ? "#4a4a4a" : "#7a7a7a"};
  border-color: ${(props) =>
    props.$variant === "primary" ? "#3a3a3a" : "#7a7a7a"};
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-weight: bold;
  min-height: 40px;
  min-width: 90px;
  padding: 10px 25px;
  outline: none;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary" ? "#3a3a3a" : "#9a9a9a"};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid #9a9a9a;
  }
`;

export default Button;
