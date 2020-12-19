import React, { useEffect } from "react";
import Header from "./Header";
import { observer } from "mobx-react-lite";
import { Resizable } from "re-resizable";
import "./Blog.css";

import landscapeImg from "../images/Untitled.png";
import PostEntry from "./PostEntry";
import { useBlogStore } from "../state";
import FixedTitle from "./FixedTitle";
import Sidebar from "./Sidebar";
import TagEntry from "./TagEntry";

function Blog() {
  const blogStore = useBlogStore();
  useEffect(() => {
    blogStore.fetchPosts();
    blogStore.fetchTags();
  }, []);

  const tagActive = Number.isInteger(blogStore.activeTag);
  const tag =
    tagActive && blogStore?.tags?.find((tag) => tag.id === blogStore.activeTag);
  const posts = tagActive ? blogStore.postsByTags : blogStore.posts;

  return (
    <>
      <Header isHome={true} />
      <FixedTitle />
      <Sidebar />
      <div className="Blog">
        {/* <Resizable
        bounds="parent"
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        defaultSize={{ width: "70%", height: "100%" }}
        className="resizable-left"
      > */}
        <div className="blog-container">
          {tag && <TagEntry {...tag} />}
          {posts.map((post) => {
            return <PostEntry {...post} />;
          })}
          {/* <PostEntry
            id={1}
            author="Hugo Authors"
            createdAt="September 27, 2020"
            title="Samuel Jeffery, Flora Klein at Christian Andersen"
            excerpt=""
            pdf=""
            image={landscapeImg}
          />
          <PostEntry
            id={1}
            author="Hugo Authors"
            createdAt="September 27, 2020"
            title="Samuel Jeffery, Flora Klein at Christian Andersen"
            excerpt=""
            pdf=""
            image={landscapeImg}
          />
          <PostEntry
            id={1}
            author="Hugo Authors"
            createdAt="September 27, 2020"
            title="Samuel Jeffery, Flora Klein at Christian Andersen"
            excerpt=""
            pdf=""
            image={landscapeImg}
          /> */}
        </div>
        {/* </Resizable> */}
      </div>
    </>
  );
}

export default observer(Blog);
