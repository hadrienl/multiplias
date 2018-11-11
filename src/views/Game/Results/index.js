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

  getResultType (score) {
    if (score > 80) {
      return 1;
    }
    if (score > 50) {
      return 2;
    }
    return 3;
  }

  render () {
    const { newGame } = this.context;
    const { score } = this;

    return (
      <div>
        <p>Ton score est de {score}%</p>
        <button
          className="button-big"
          onClick={newGame}
        >
          Nouvelle partie ?
        </button>
      </div>
    )
  }
}

export default Results;
