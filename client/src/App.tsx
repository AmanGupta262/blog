import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PageRender from './PageRender'

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
