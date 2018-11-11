import React from 'react';

import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import GameProvider from './services/GameProvider';
import Game from './views/Game';

class App extends React.Component {
  render() {
    return (
      <GameProvider>
        <Layout
          header={<Header />}
          footer={<Footer />}>
          <Game />
        </Layout>
      </GameProvider>
    );
  }
}

export default App;
