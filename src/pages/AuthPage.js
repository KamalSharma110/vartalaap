import AuthForm from "../components/AuthForm";
import ReactGA from "react-ga";
import { useEffect } from "react";

const AuthPage = () => {
  useEffect(() => {
    ReactGA.pageview("/auth");
  }, []);

  return <AuthForm />;
};

export default AuthPage;
