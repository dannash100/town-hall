import React from "react";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../state";

function Blog() {
  const userStore = useUserStore();

  const increment = () => userStore.increment();
  return (
    <div className="Blog">
      <button onClick={increment}>Increment</button>
      <p>{userStore.testCount}</p>
    </div>
  );
}

export default observer(Blog);
