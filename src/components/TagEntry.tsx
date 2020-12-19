import React from "react";
import Tag from "../types/Tags";

function TagEntry({ name, description }: Tag) {
  return (
    <div className="PostEntry">
      <p className="post-date">Tag</p>
      <p className="post-title">{name}</p>
      {/* <p className="post-author">
        <i>Author: </i>
        {author}
      </p>
      <p className="post-tags">
        <i>Tags: </i> Test
      </p> */}
      <p style={{marginTop: 10}} className="post-excerpt">{description}</p>
    </div>
  );
}

export default TagEntry;
