import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '432890140260-lcq0t4u87jevo6qbflipj0t0gqtu67bc.apps.googleusercontent.com',
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();

        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      }).catch((e) => {
        console.error(e);
        // TODO
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    const { signIn, signOut } = this.props;
    const userId = this.auth.currentUser.get().getId();

    if (isSignedIn) signIn(userId);
    else signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    }

    if (isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} type="button" className="ui google violet button">
          <i className="google icon" />
          Sign out
        </button>
      );
    }

    return (
      <button onClick={this.onSignInClick} type="button" className="ui google violet button">
        <i className="google icon" />
        Sign in with google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn, signOut,
})(GoogleAuth);
