import React from 'react';
import PropTypes from 'prop-types';

export class Timer extends React.PureComponent {
  static propTypes = {
    time: PropTypes.number.isRequired,
    onTimeout: PropTypes.func,
  };

  static defaultProps = {
    onTimeout() {},
  };

  state = {
    count: 0,
  };

  componentDidMount () {
    this.setState({ count: this.props.time });
    this.interval = setInterval(() => this.setState({ count: Math.max(0, this.state.count - 1) }), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  componentDidUpdate () {
    const { onTimeout } = this.props;
    const { count } = this.state;

    if (count === 0) {
      onTimeout();
    }
  }

  reset () {
    this.setState({ count: this.props.time });
  }

  render () {
    const { count } = this.state;

    return <p>{count}</p>
  }
}

export default Timer;
