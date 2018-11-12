import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class NumberInput extends React.Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange() {},
  };

  state = {
    digits: [],
    value: '',
  };

  elRef = React.createRef();

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate ({ length: prevLength }) {
    const { length } = this.props;

    if (length !== prevLength) {
      this.reset();
    }
  }

  reset () {
    const { length } = this.props;

    this.setState({
      value: '',
      digits: [...new Array(length)],
    });
  }

  updateValue = ({ target: { value } }) => {
    const currentPos = this.getCurrentPos();
    const digits = [...this.state.digits];
    digits[currentPos] = value;
    this.setState({ digits });
    setTimeout(() => this.onBlur());
    if (digits[digits.length - 1] !== undefined) {
      this.props.onChange(Number(digits.join('')));
    }
  }

  onBlur = () => {
    const currentInput = this.getCurrentInputEl();
    if (currentInput) {
      currentInput.focus();
    }
  }

  focus = () => {
    setTimeout(() => this.onBlur());
  }

  onKeyDown = ({ key }) => {
    if (key === 'Backspace') {
      const digits = [...this.state.digits];
      digits[this.getCurrentPos() - 1] = undefined;
      this.setState({ digits });
      setTimeout(() => this.onBlur());
    }
  }

  getCurrentPos () {
    const { digits } = this.state;
    return digits.findIndex(digit => digit === undefined);
  }

  getCurrentInputEl () {
    if (!this.elRef.current) return null;
    const inputs = Array.from(this.elRef.current.querySelectorAll('input'));
    return inputs[this.getCurrentPos()];
  }

  render () {
    const { className } = this.props;
    const { digits } = this.state;
    const { elRef, updateValue, onBlur, onKeyDown } = this;

    return (
      <span
        className={`number-input ${className}`}
        ref={elRef}
      >
        {digits.map((value, k) => (
          <input
            key={k}
            type="number"
            value={`${value||''}`}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={updateValue}
          />
        ))}
      </span>
    );
  }
}

export default NumberInput;
