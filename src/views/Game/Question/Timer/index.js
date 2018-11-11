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
    this.interval = setInterval(() => this.setState({ count: Math.max(-1, this.state.count - 1) }), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  componentDidUpdate () {
    const { onTimeout } = this.props;
    const { count } = this.state;

    if (count === -1) {
      onTimeout();
    }
  }

  reset () {
    this.setState({ count: this.props.time });
  }

  getRemainingWarning() {
    const { time } = this.props;
    const { count } = this.state;
    const ratio = count / time;
    
    if (ratio > .7) return 1;
    if (ratio > .34) return 2;
    return 3;
  }

  render () {
    const { count } = this.state;
    const warning = this.getRemainingWarning();

    return <p className={`timer timer--warning-level-${warning}`}>{count}</p>
  }
}

export default Timer;
