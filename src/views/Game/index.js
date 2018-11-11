import React from 'react';

import { context } from '../../services/GameProvider';

import Layout from './Layout';
import Nickname from './Nickname';
import Configuration from './Configuration';
import Question from './Question';
import Results from './Results';

import './styles.scss';

export class Game extends React.Component {
  static contextType = context;

  get currentQuestion() {
    const { questions } = this.context;
    return questions.find(question => question.answer === undefined);
  }

  setAnswer = answer => {
    const { setAnswer } = this.context;
    const { currentQuestion: question } = this;
    const { result } = question;
    const resultLength = `${result}`.length;

    if (answer === null || answer.length === resultLength) {
      setAnswer({ question, answer: answer && +answer });
    }
  }

  render () {
    const { nickname, questions } = this.context;
    const { currentQuestion: question, setAnswer} = this;

    if (!nickname) {
      return <Nickname />; 
    }

    if (!questions.length) {
      return <Configuration />;
    }

    if (question) {
      return <Question question={question} onChange={setAnswer} />
    }

    return <Results />;
  }
}

export default () => <Layout><Game /></Layout>;
