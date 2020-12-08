import { observer } from "mobx-react-lite";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../images/th-logo-stamp.svg";
import { useUserStore } from "../state";
import "./Header.css";

interface Props {
  onLogout?: () => void;
  isHome?: boolean;
  
}

function Header({ onLogout,  isHome }: Props) {
  const userStore = useUserStore();
  const history = useHistory();

  const handleLogout = async () => {
    await userStore.logout();
    if (onLogout) onLogout();
  };

  const handleBack = () => history.push('/')

  return (
    <header className="Header">
      <Logo className="logo" />
      {!isHome && (

        <button onClick={handleBack} className="button back-button">
            Back
          </button>
      )}
      <div style={{ flexGrow: 1 }} />
      {userStore.user && !isHome && (
        <>
          <p className="username-text">User: {userStore.user.username}</p>
          <button onClick={handleLogout} className="button">
            Logout
          </button>
        </>
      )}
    </header>
  );
}

export default observer(Header);
