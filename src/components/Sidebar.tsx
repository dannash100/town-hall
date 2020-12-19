import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import React from "react";
import { useBlogStore } from "../state";
import "./Sidebar.css";
import BlogStore from "../state/BlogStore";
import { useHistory } from "react-router-dom";
import { fetchPostsByTag } from "../api/posts";

const TagEntry = observer(({ name, id }: { name: string; id: number }) => {
  const blogStore = useBlogStore();
  const selected = blogStore.activeTag === id;
  const handleClick = () => {
    blogStore.setActiveTag(selected ? undefined : id);
    blogStore.fetchPostsByTags(id);
  };
  return (
    <motion.p
      className="tag-entry"
      onClick={handleClick}
      animate={{ x: selected ? -20 : 0 }}
    >
      {name}
    </motion.p>
  );
});

interface Props {
  isOpenHall?: boolean;
}

function Sidebar({ isOpenHall }: Props) {
  const blogStore = useBlogStore();
  const history = useHistory();
  const handleOpenHall = () => history.push("/open-hall");
  const sidebarContentClass = isOpenHall
    ? "sidebar-content-open-hall"
    : "sidebar-content";
  return (
    <div className="Sidebar">
      <div className={sidebarContentClass}>
        <p>Information</p>
        <p style={{ cursor: "pointer" }} onClick={handleOpenHall}>
          Open Hall
        </p>
      </div>
      <div style={{ flexGrow: 1 }} className={sidebarContentClass}>
        <p>Tags:</p>
        {blogStore?.tags?.map((tag) => (
          <TagEntry {...tag} />
        ))}
      </div>
      <div className={sidebarContentClass}>
        <p>KIMIKIMI?</p>
        <p>LINKs?</p>
      </div>
    </div>
  );
}

export default observer(Sidebar);
