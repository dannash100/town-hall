import React from "react";
import Header from "./Header"
import { observer } from "mobx-react-lite";
import { useUserStore } from "../state";
import "./Blog.css"

function Blog() {
  const userStore = useUserStore();

  const increment = () => userStore.increment();
  return (
    <div className="Blog">
      <Header/>
    </div>
  );
}

export default observer(Blog);
