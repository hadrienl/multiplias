import React from 'react';

import { context } from '../../../services/GameProvider';

export class Results extends React.Component {
  static contextType = context;

  get score () {
    const { questions } = this.context;

    const score = questions.reduce((score, { answer, result }) => {
      return score + (answer === result ? 1 : 0);
    }, 0);

    return score / questions.length * 100;
  }

  render () {
    const { score } = this;
    return <p>Ton score est de {score}%</p>
  }
}

export default Results;
