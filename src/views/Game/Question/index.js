import React from 'react';
import PropTypes from 'prop-types';

export class Question extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange() {},
  };

  inputRef = React.createRef();

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

  render () {
    const { question: { expression } } = this.props;
    const { answer } = this.state;
    const { inputRef, setAnswer } = this;

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
      </div>
    );
  }
}

export default Question;
