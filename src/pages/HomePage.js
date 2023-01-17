import Layout from "../components/Layout";
import ReactGA from "react-ga";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    ReactGA.pageview("/home");
  }, []);

  return <Layout />;
};

export default HomePage;
