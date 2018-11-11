import React from 'react';

import { context } from '../../../services/GameProvider';

export class Configuration extends React.Component {
  static contextType = context;

  componentDidMount () {
    const { newGame } = this.context;
    newGame();
  }

  render () {
    return (
      <p>
      TODO : afficher des paramètres à passer à newGame()
      </p>
    );
  }
}

export default Configuration;
