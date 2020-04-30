/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Retrieving stream data...</div>;
    }

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h2>
          You are watching: {stream.title}
        </h2>
        <h3>
          {stream.description}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
})(StreamShow);
