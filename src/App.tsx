import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch,
  HashRouter,
} from "react-router-dom";
import "./App.css";
import Blog from "./components/Blog";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/posts/Create";
import CreateTag from "./components/tags/Create";
import { BlogProvider, UserProvider } from "./state";
import OpenHall from "./components/OpenHall";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BlogProvider>
          <HashRouter basename="/">
            <Route exact path="/tags/create">
              <CreateTag />
            </Route>
            <Route exact path="/posts/create">
              <CreatePost />
            </Route>
            <Route exact path="/open-hall">
              <OpenHall />
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
          </HashRouter>
        </BlogProvider>
      </UserProvider>
    </div>
  );
}

export default App;
