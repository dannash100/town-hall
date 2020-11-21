import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Blog from "./components/Blog";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/posts/Create";
import { BlogProvider, UserProvider } from "./state";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BlogProvider>
          <Router>
            <Switch>
              <Route exact path="/posts/create">
                <CreatePost />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/">
                <Blog />
              </Route>
            </Switch>
          </Router>
        </BlogProvider>
      </UserProvider>
    </div>
  );
}

export default App;
