import React from 'react';

export const context = React.createContext();

const { Provider } = context;

const DFT_MAX_QUESTIONS = 5;
const LEVEL_EASY = 'easy';
const LEVEL_MEDIUM = 'medium';
const LEVEL_HARD = 'hard';

const initialState = {
  nickname: '',
  questions: [],
  points: 0,
};

export class GameProvider extends React.Component {
  setNickname = nickname => this.setState({ nickname });

  newGame = ({ questionsCount = DFT_MAX_QUESTIONS, level = LEVEL_EASY } = {}) => {
    const questions = [...new Array(questionsCount)].map(() => {
      const coef = this.getRandomNumberCoef(level);
      const a = parseInt(Math.random() * coef[0]);
      const b = parseInt(Math.random() * coef[1]);
      const expression = `${a} x ${b}`;
      const result = a * b;
      return { expression, result };
    });

    this.setState({
      questions,
      points: 0,
    });
  }

  getRandomNumberCoef(level) {
    switch (level) {
      case LEVEL_MEDIUM:
        return [10, 100];
      case LEVEL_HARD:
        return [100, 100];
      case LEVEL_EASY:
      default:
        return [10, 10];
    }
  }

  setAnswer = ({ question, answer }) => {
    const { questions } = this.state;

    if (!questions.includes(question)) throw new Error('Wrong question');

    question.answer = answer;

    this.setState({
      questions: [...questions],
    });
  }

  reset = () => this.setState({ ...initialState });

  state = {
    ...initialState,
    setNickname: this.setNickname,
    newGame: this.newGame,
    setAnswer: this.setAnswer,
    reset: this.reset,
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
