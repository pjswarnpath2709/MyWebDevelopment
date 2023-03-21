import React, { useState } from "react";

import "./App.css";
import LeftContent from "./components/LeftContent";
import PostsArray from "./components/PostsArray";
import RightContent from "./components/RightContent";

const App = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [posts, setPosts] = useState([{}, {}, {}, {}]);
  return (
    <div className="app d-flex flex-row justify-content-evenly align-items-center h-100 w-100 gap-2 ">
      <LeftContent />
      <PostsArray setCurrentPost={setCurrentPost} posts={posts} />
      <RightContent currentPost={currentPost} />
    </div>
  );
};

export default App;
