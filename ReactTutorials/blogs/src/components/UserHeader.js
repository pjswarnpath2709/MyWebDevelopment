import React from "react";
// import { fetchUserData } from "../actions";
import { connect } from "react-redux";

const UserHeader = ({ userId, fetchUserData, user }) => {
  // useEffect(() => {
  //   fetchUserData(userId);
  // }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>{user.name}</div>;
};

const mapStateToProps = (stateInReduxStore, ownProps) => {
  return {
    user: stateInReduxStore.users.find((user) => user.id === ownProps.userId),
  };
};

export default connect(mapStateToProps)(UserHeader);
