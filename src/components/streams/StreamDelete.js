import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  renderActions = () => {
    const { deleteStream, match } = this.props;
    return (
      <>
        <button
          type="button"
          className="ui violet button"
          onClick={() => deleteStream(match.params.id)}
        >
          Yes
        </button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    );
  }

  renderContent() {
    const { stream } = this.props;
    if (!stream) {
      return 'Checking streams database...';
    }

    return `Do you really want to stop: ${stream.title}?`;
  }

  render() {
    return (
      <Modal
        title="Remove stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream, deleteStream,
})(StreamDelete);
