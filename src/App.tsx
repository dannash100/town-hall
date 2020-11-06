import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Blog from "./components/Blog";
import { UserProvider } from "./state";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Blog />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
