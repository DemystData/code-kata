import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import Login from "./containers/Login.tsx";
import NotFound from "./containers/NotFound.tsx";
import Signup from "./containers/Signup.tsx";
import LoanApplicationForm from "./containers/LoanApplicationForm.tsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.tsx";
import ResetPassword from "./containers/ResetPassword.tsx";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute.tsx";

export default function Links() {
  return (
    <Routes>
      <Route
        path="/:id"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/login/reset"
        element={
          <UnauthenticatedRoute>
            <ResetPassword />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/loan-app-form/:id"
        element={
          <AuthenticatedRoute>
            <LoanApplicationForm />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/"
        element={
            <Login />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
