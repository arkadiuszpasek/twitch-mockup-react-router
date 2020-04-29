import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.parmas.id);
  }

  render() {
    // if ()
    return <div>{this.props.match.params.id}</div>;
  }
}

export default connect(null, {
  fetchStream, deleteStream,
})(StreamDelete);
