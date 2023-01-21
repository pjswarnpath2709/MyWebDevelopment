import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

const PostList = ({ fetchPostsAndUsers, posts }) => {
  useEffect(() => {
    fetchPostsAndUsers();
  }, []);
  const renderList = () => {
    return posts?.map((post) => {
      return (
        <div key={post.id} className="item">
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div className="post-user">
              <UserHeader userId={post.userId} />
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className="ui relaxed divided list">{renderList()}</div>;
};

const mapStateToProps = (stateInsideReduxStore) => {
  return { posts: stateInsideReduxStore.posts };
};

export default connect(mapStateToProps, {
  fetchPostsAndUsers,
})(PostList);
