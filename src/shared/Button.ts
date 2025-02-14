import styled from "styled-components";

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  cursor: pointer;
  border-radius: 9999px;
  border: 1px solid;
  background-color: ${(props) =>
    props.$variant === "primary" ? "#4a4a4a" : "#7a7a7a"};
  border-color: #4a4a4a;
  color: ${(props) => (props.$variant === "primary" ? "white" : "#fff")};
  display: inline-flex;
  align-items: center;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  outline: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary" ? "#3a3a3a" : "#9a9a9a"};
  }
`;

export default Button;
