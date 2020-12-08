import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import React from "react";
import { useBlogStore } from "../state";
import "./Sidebar.css";
import BlogStore from "../state/BlogStore";

const TagEntry = observer(({ name }: { name: string }) =>  {
  const blogStore = useBlogStore();
  const selected = blogStore.activeTag === name;
  const handleClick = () => blogStore.setActiveTag(selected ? undefined : name);
  return (
    <motion.p
      className="tag-entry"
      onClick={handleClick}
      animate={{ x: selected ? -20 : 0 }}
    >{name}</motion.p>
  );
})

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="sidebar-content">
        <p>Information</p>
        <p>Open Hall</p>
      </div>
      <div className="sidebar-content">
        <p>Tags:</p>
        <TagEntry name='Cupid'/>
        <TagEntry name='Muffin'/>
        <TagEntry name='Bakery'/>
        <TagEntry name='Dogman'/>
      </div>
    </div>
  );
}

export default observer(Sidebar);
