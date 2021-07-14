import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Alert } from "./components/alert/Alert";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refresh_token } from "./redux/actions/auth";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh_token());
  }, [dispatch]);
  return (
    <div className="container mx-auto px-4">
      <Router>
        <Navbar />

        <Alert />

        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
