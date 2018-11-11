import React from 'react';
import PropTypes from 'prop-types';

import NumberInput from '../../../components/NumberInput';
import Timer from './Timer';

import './styles.scss';

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
  }
  
  componentDidUpdate ({ question: prevQuestion }) {
    const { question } = this.props;
    if (question !== prevQuestion) {
      this.setState({ answer: '' });
      this.timerRef.current.reset();
    }
  }

  setAnswer = answer => {
    this.setState({ answer });
    const { onChange } = this.props;
    onChange(answer);
    this.inputRef.current.reset();
  }

  timeout = () => {
    const { onChange } = this.props;
    onChange(null);
  }

  render () {
    const { question: { expression, result } } = this.props;
    const { answer } = this.state;
    const { inputRef, setAnswer, timeout, timerRef } = this;
    const length = `${result}`.length;

    return (
      <div className="question">
        <p>
          {expression} = ?
        </p>
        <NumberInput
          ref={inputRef}
          className="question__input"
          length={length}
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
