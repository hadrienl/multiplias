import React from 'react';

export const context = React.createContext();

const { Provider } = context;

const MAX_QUESTIONS = 5;

const initialState = {
  nickname: '',
  questions: [],
  points: 0,
};

export class GameProvider extends React.Component {
  setNickname = nickname => this.setState({ nickname });

  newGame = ({ questionsCount = MAX_QUESTIONS } = {}) => {
    const questions = [...new Array(questionsCount)].map(() => {
      const a = parseInt(Math.random() * 10);
      const b = parseInt(Math.random() * 10);
      const expression = `${a} x ${b}`;
      const result = a * b;
      return { expression, result };
    });

    this.setState({
      questions,
      points: 0,
    });
  }

  setAnswer = ({ question, answer }) => {
    const { questions } = this.state;

    if (!questions.includes(question)) throw new Error('Wrong question');

    question.answer = answer;

    this.setState({
      questions: [...questions],
    });
  }

  state = {
    ...initialState,
    setNickname: this.setNickname,
    newGame: this.newGame,
    setAnswer: this.setAnswer,
  };

  componentDidMount() {
    this.retreiveState();
  }

  setState (state) {
    super.setState(state);
    setTimeout(() => this.saveState());
  }

  saveState() {
    global.localStorage.setItem('gameData', JSON.stringify(this.state));
  }

  retreiveState() {
    try {
      const state = JSON.parse(global.localStorage.getItem('gameData'));
      super.setState(state);
    } catch (e) {

    }
  }

  render () {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>
  }
}

export default GameProvider;
