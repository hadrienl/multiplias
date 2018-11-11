import React from 'react';
import PropTypes from 'prop-types';

import Timer from './Timer';

export class Question extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange() {},
  };

  inputRef = React.createRef();
  timerRef = React.createRef();

  state = {
    answer: '',
  }

  componentDidMount() {
    this.inputRef.current.focus();
    this.inputRef.current.addEventListener('blur', this._blurListener = e => {
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    });
  }
  
  componentDidUpdate ({ question: prevQuestion }) {
    const { question } = this.props;
    if (question !== prevQuestion) {
      this.setState({ answer: '' });
      this.timerRef.current.reset();
    }
  }

  componentWillUnmount () {
    this.inputRef.current.removeEventListener('blur', this._blurListener);
  }

  setAnswer = ({ target: { value: answer } }) => {
    this.setState({ answer });
    const { onChange } = this.props;
    onChange(answer);
  }

  timeout = () => {
    const { onChange } = this.props;
    onChange(null);
  }

  render () {
    const { question: { expression } } = this.props;
    const { answer } = this.state;
    const { inputRef, setAnswer, timeout, timerRef } = this;

    return (
      <div>
        <p>
          {expression} = ?
        </p>
        <input
          type="number"
          ref={inputRef}
          className="calculate__input"
          value={answer}
          onChange={setAnswer}
        />
        <Timer
          ref={timerRef}
          time={15}
          onTimeout={timeout}
        />
      </div>
    );
  }
}

export default Question;
