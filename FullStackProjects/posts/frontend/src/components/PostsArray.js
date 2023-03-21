import React from "react";
import PostsCard from "./PostsCard/PostsCard";

const PostsArray = ({ posts, setCurrentPost }) => {
  const renderPost = posts.map((post) => {
    return <PostsCard setCurrentPost={setCurrentPost} postId={post._id} />;
  });
  return (
    <div className="d-flex flex-col align-items-center flex-column gap-2 scrollbar vh-100 overflow-auto">
      {renderPost}
    </div>
  );
};

export default PostsArray;
