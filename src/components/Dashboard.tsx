import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./Dashboard.css";
import Post from "../types/Post";
import { useBlogStore, useUserStore } from "../state";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import User from "../types/User";

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
        style={{ marginLeft: 10 }}
        onClick={handleDelete}
        className="button"
      >
        Delete
      </button>
    </div>
  );
};

const UserListItem = ({ username, approved, id }: User) => {
  const userStore = useUserStore();
  if (!id) return null;
  const handleUnapprove = () => userStore.patchUser(id, { approved: false });
  const handleApprove = () => userStore.patchUser(id, { approved: true });
  const handleDelete = () => userStore.deleteUser(id);
  return (
    <div className="post-item">
      <p className="post-item-title">{username}</p>
      <div style={{ flexGrow: 1 }} />
      {approved ? (
        <button onClick={handleUnapprove} className="button">
          Unapprove
        </button>
      ) : (
        <button onClick={handleApprove} className="button">
          Approve
        </button>
      )}
      <button
        style={{ marginLeft: 10 }}
        onClick={handleDelete}
        className="button"
      >
        Delete
      </button>
    </div>
  );
};

function Dashboard() {
  const [showDashboard, setShowDashboard] = useState<boolean | null>(null);
  const history = useHistory();
  const userStore = useUserStore();
  const blogStore = useBlogStore();

  const handleLogoutDashboard = () => history.push("/login");
  const handleCreatePost = () => history.push("/posts/create");
  const handleCreateTag = () => history.push("/tags/create")

  const initiate = async () => {
    await login();
    if (userStore?.user?.approved) {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
      return;
    }
    if (!blogStore.posts.length) {
      await blogStore.fetchPosts();
    }
    if (!userStore.users) {
      await userStore.fetchUsers();
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
        {showDashboard ? (
          <>
            <div className="title-container">
              <h4 className="title">Dashboard</h4>

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
                <div className="post-item-list">
                  {userStore.users &&
                    userStore.users.map((user) => <UserListItem {...user} />)}
                </div>
              </div>
            </div>
          </>
        ) : showDashboard === false ? (
          <h6 className="subtitle">
            {userStore.user
              ? "Please await approval to access dashboard"
              : "Please login to access dashboard"}
          </h6>
        ) : (
          <h6 className="subtitle">Loading Please Wait</h6>
        )}
      </div>
    </div>
  );
}

export default observer(Dashboard);
