import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

export default function LoaderButton({
  className = "",
  disabled = false,
  isLoading = false,
  ...props
}) {
  const customStyle = className=== 'true' ? 'customColor' : ''
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${customStyle}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children}
    </Button>
  );
}