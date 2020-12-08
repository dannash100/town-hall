import React from "react";
import moment from 'moment'
import Post from "../types/Post";
import "./PostEntry.css"

function PostEntry({ title, pdf, excerpt, author, image, createdAt }: Post) {
  return (
    <div className="PostEntry">
      <p className="post-date">{moment(createdAt).format('MMMM D YYYY')}</p>
      <p className="post-title">{title}</p>
      <img className="post-image" src={image}/>
      {/* <p className="post-author">
        <i>Author: </i>
        {author}
      </p>
      <p className="post-tags">
        <i>Tags: </i> Test
      </p> */}
      <p className="post-excerpt">
        {excerpt}
      </p>
    </div>
  );
}

export default PostEntry;
