import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageRender from "./PageRender";
import Navbar from "./components/global/Navbar";

const App = () => {
  return (
    <div className="container mx-auto px-4">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
