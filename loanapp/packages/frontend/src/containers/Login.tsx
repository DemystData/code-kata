import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib.ts";
import { useFormFields } from "../lib/hooksLib.ts";
import { onError } from "../lib/errorLib.ts";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import LoaderButton from "../components/LoaderButton.tsx";
import "./Login.css";

export default function Login() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated, setUserName, isAuthenticated, userName } =
    useAppContext();
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = `${userName}`;
    }
  }, []);
  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const userData = await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      setUserName(userData.username);
      nav(`/${userData.username}`);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              size="lg"
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              value={fields.password}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Link to="/login/reset">Forgot password?</Link>
          <LoaderButton
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
        </Stack>
      </Form>
    </div>
  );
}
