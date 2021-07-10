import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import Loading from "./components/alert/Loading";

const App = () => {
  return (
    <div className="container mx-auto px-4">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/loading" component={Loading} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
