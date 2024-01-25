import { cloneElement, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

interface Props {
  children: ReactElement;
}

export default function UnauthenticatedRoute(props: Props): ReactElement {
  const { isAuthenticated } = useAppContext();
  const { children } = props;

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return cloneElement(children, props);
}