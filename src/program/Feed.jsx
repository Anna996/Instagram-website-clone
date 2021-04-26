import React from "react";
import Post from "./Post";

function Feed({ currUserName, allPosts }) {
  return (
    <div>
      {allPosts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          postData={post.data}
          currUserName={currUserName}
        />
      ))}
    </div>
  );
}

export default Feed;
