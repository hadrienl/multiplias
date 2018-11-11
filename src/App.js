import React from 'react';

import GameProvider from './services/GameProvider';
import Game from './views/Game';

class App extends React.Component {
  render() {
    return (
      <GameProvider>
        <div className="App">
          <Game />
        </div>
      </GameProvider>
    );
  }
}

export default App;
