import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  render() {
    const { match } = this.props;
    return <div>StreamEdit</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
})(StreamEdit);
