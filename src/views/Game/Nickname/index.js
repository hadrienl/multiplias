import React from 'react';

import { context } from '../../../services/GameProvider';

export class Nickname extends React.Component {
  static contextType = context;

  state = {
    nickname: '',
  };

  setNickname = ({ target: { value: nickname }}) => this.setState({ nickname });

  submit = e => {
    e.preventDefault();
    const { nickname } = this.state;
    const { setNickname } = this.context;
    setNickname(nickname);
  }

  render () {
    const { nickname } = this.state;
    const { submit, setNickname } = this;

    return (
      <form
        onSubmit={submit}>
        <p>Bonjour, quel est ton prénom ?</p>
        <input type="text" value={nickname} onChange={setNickname} />
        <button type="submit">Démarrer le jeu</button>
      </form>
    )
  }
}

export default Nickname
