import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Nav from "react-bootstrap/Nav";
import { onError } from "./lib/errorLib.ts";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext, AppContextType } from "./lib/contextLib.ts";
import Routes from "./Routes.tsx";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userName, setUserName] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      const userData = await Auth.currentUserInfo();
      setUserName(userData.username);
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }

    setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    nav("/login");
  }
  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar
          collapseOnSelect
          bg="light"
          expand="md"
          className="mb-3 px-3 alignElements"
        >
          {isAuthenticated === false ? (
            <Nav className="fw-bold">Loan App</Nav>
          ) : (
            <>
              <LinkContainer to={`/${userName}`} activeClassName="active-link">
                <Nav.Link className="spacer">Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={`/loan-app-form/${userName}`}
                activeClassName="active-link"
              >
                <Nav.Link>Loan-Application-Form</Nav.Link>
              </LinkContainer>
            </>
          )}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup" activeClassName="active-link">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login" activeClassName="active-link">
                    <Nav.Link>Log in</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={
            {
              isAuthenticated,
              userHasAuthenticated,
              userName,
              setUserName,
            } as AppContextType
          }
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
