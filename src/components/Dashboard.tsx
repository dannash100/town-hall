import React, { useEffect } from "react";
import Header from "./Header";
import "./Dashboard.css";

import { useUserStore } from "../state";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();
  const userStore = useUserStore();

  const handleLogoutDashboard = () => history.push("/login");
  const handleCreatePost = () => history.push("/posts/create");
  const handleCreateTag = () => {}

  const login = async () => {
    try {
      await userStore.login();
    } catch (err) {
      handleLogoutDashboard();
      console.log(err);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="Register">
      <Header onLogout={handleLogoutDashboard} />
      <div className="container">
        <div className="title-container">
          <div className="line" />
          <h4 className="dashboard-title">Dashboard</h4>
          <div className="line" />
        </div>
        <div className="dashboard-content">
          <div className="dashboard-category">
            <div className="category-title-container">

            <p className="category-title">Posts</p>
            <button onClick={handleCreatePost} className="button">
              Create
            </button>
            </div>
          </div>
          <div className="dashboard-category">
          <div className="category-title-container">
            <p className="category-title">Tags</p>
            <button onClick={handleCreateTag} className="button">
              Create
            </button>
            </div>
          </div>
          <div className="dashboard-category">
            <div className="category-title-container">

            <p className="category-title">Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Dashboard);
