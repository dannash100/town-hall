import React from "react";
import Header from "./Header";
import { observer } from "mobx-react-lite";
import { Resizable } from "re-resizable";
import "./Blog.css";

import landscapeImg from "../images/landscape.jpg";
import PostEntry from "./PostEntry";

function Blog() {
  return (
    <div className="Blog">
      <Resizable
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
      >
        <div className="blog-container">
          <Header isHome={true} />
          <PostEntry
            author="Hugo Authors"
            createdAt="September 27, 2020"
            title="Samuel Jeffery, Flora Klein at Christian Andersen"
            excerpt=""
            pdf=""
            image={landscapeImg}
          />
          <PostEntry
            author="Hugo Authors"
            createdAt="September 27, 2020"
            title="Samuel Jeffery, Flora Klein at Christian Andersen"
            excerpt=""
            pdf=""
            image={landscapeImg}
          />
          <PostEntry
            author="Hugo Authors"
            createdAt="September 27, 2020"
            title="Samuel Jeffery, Flora Klein at Christian Andersen"
            excerpt=""
            pdf=""
            image={landscapeImg}
          />
        </div>
      </Resizable>
      <div className="resizable-right"></div>
    </div>
  );
}

export default observer(Blog);
