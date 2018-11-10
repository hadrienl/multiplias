import React from 'react';

import './styles.scss';

const MAX_MATCHES = 5;
const MAX_TIME = 20;

export class Calculate extends React.Component {
  state = {
    attempt: '',
    points: 0,
    matches: 0,
    remainingTime: 0,
  };

  inputRef = React.createRef();

  componentDidMount () {
    this.generate();
    this.inputRef.current.focus();
    this.inputRef.current.addEventListener('blur', this._blurListener = e => {
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    });
  }

  generate() {
    const { matches } = this.state;
    const a = parseInt(Math.random() * 10);
    const b = parseInt(Math.random() * 10);
    this.setState({
      expression: `${a} x ${b}`,
      result: a * b,
      matches: matches + 1,
      remainingTime: MAX_TIME,
    });

    clearInterval(this._interval);
    this._interval = setInterval(() => {
      const { remainingTime } = this.state;
      if (remainingTime === 1) {
        this.setState({ attempt: '', remainingTime: MAX_TIME });
        this.generate();
        return;
      }
      this.setState({
        remainingTime: remainingTime - 1,
      });
    }, 1000);
  }

  setAttempt = ({ target: { value: attempt } }) => {
    const { result, points } = this.state;
    const resultLength = `${result}`.length;

    this.setState({ attempt });

    if (attempt.length === resultLength) {
      if (+attempt === result) {
        this.setState({ points: points + 1 });
      }
      this.setState({ attempt: '' });
      this.generate();
    }
  }

  render () {
    const { remainingTime, points, matches, attempt, expression } = this.state;
    const { setAttempt } = this;

    return (
      <div className="calculate">
        {(remainingTime === 10 || remainingTime < 6) &&
        `${remainingTime}s`}
        {matches > MAX_MATCHES
        ? `${points / (matches - 1) * 100}%`
        : <>
            <p>{expression} = ?</p>
            <input
              ref={this.inputRef}
              className="calculate__input"
              value={attempt}
              onChange={setAttempt}
            />
          </>
        }
      </div>
    )
  }
}

export default Calculate;
