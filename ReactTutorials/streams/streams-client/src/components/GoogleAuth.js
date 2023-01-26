import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import oauthCredentials from "../utils/oauthCredentials";

//////-------------------------------------------------------------------------------------------------------------------------------//////

let googleAuth = null;

//////-------------------------------------------------------------------------------------------------------------------------------//////

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  //////+++++++++++++++++++++++++++++++++++++++++//////

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: oauthCredentials.web.client_id,
          scope: "email",
          plugin_name: "streams",
        })
        .then(setAuthProperty);
    });
  }, []);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const setAuthProperty = () => {
    googleAuth = window.gapi.auth2.getAuthInstance();
    onAuthChange(googleAuth.isSignedIn.get());
    googleAuth.isSignedIn.listen(onAuthChange);
  };

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      signIn(googleAuth.currentUser.get().getId());
    } else {
      signOut();
    }
  };

  const handleSignIn = () => {
    googleAuth.signIn();
  };

  const handleSignOut = () => {
    googleAuth.signOut();
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    }
    if (!isSignedIn) {
      return (
        <button
          onClick={() => handleSignIn()}
          className="ui green google button"
        >
          <i className="google  icon" />
          Sign In with Google
        </button>
      );
    }

    //////+++++++++++++++++++++++++++++++++++++++++//////

    return (
      <button onClick={() => handleSignOut()} className="ui red google button">
        <i className="google  icon" />
        Sign Out
      </button>
    );
  };
  return <div>{renderAuthButton()}</div>;
};

//////-------------------------------------------------------------------------------------------------------------------------------//////

const mapStateToProps = (stateInReduxStore) => {
  return {
    isSignedIn: stateInReduxStore.auth.isSignedIn,
  };
};

//////-------------------------------------------------------------------------------------------------------------------------------//////

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
