import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '432890140260-lcq0t4u87jevo6qbflipj0t0gqtu67bc.apps.googleusercontent.com',
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      }).catch((e) => {
        console.error(e);
        // TODO
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    const { isSignedIn } = this.state;

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

export default GoogleAuth;
