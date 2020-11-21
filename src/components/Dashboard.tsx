import React, { useEffect } from "react";
import Header from "./Header";
import "./Dashboard.css";
import Post from "../types/Post";
import { useBlogStore, useUserStore } from "../state";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const PostListItem = ({ title, published, id }: Post) => {
  const blogStore = useBlogStore();
  const handleUnpublish = () => blogStore.updatePost(id, { published: false });
  const handlePublish = () => blogStore.updatePost(id, { published: true });

  const handleDelete = () => blogStore.deletePost(id);
  return (
    <div className="post-item">
      <p className="post-item-title">{title}</p>
      <div style={{ flexGrow: 1 }} />
      {published ? (
        <button onClick={handleUnpublish} className="button">
          Unpublish
        </button>
      ) : (
        <button onClick={handlePublish} className="button">
          Publish
        </button>
      )}
      <button
        style={{ marginLeft: 5 }}
        onClick={handleDelete}
        className="button"
      >
        Delete
      </button>
    </div>
  );
};

function Dashboard() {
  const history = useHistory();
  const userStore = useUserStore();
  const blogStore = useBlogStore();

  const handleLogoutDashboard = () => history.push("/login");
  const handleCreatePost = () => history.push("/posts/create");
  const handleCreateTag = () => {};

  const initiate = async () => {
    await login();
    if (!blogStore.posts.length) {
      await blogStore.fetchPosts();
    }
  };

  const login = async () => {
    try {
      await userStore.login();
    } catch (err) {
      handleLogoutDashboard();
      console.log(err);
    }
  };

  useEffect(() => {
    initiate();
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
            <div className="post-item-list">
              {blogStore.posts.map((post) => (
                <PostListItem {...post} />
              ))}
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
