import React from 'react';

import { context } from '../../../services/GameProvider';

export class Nickname extends React.Component {
  static contextType = context;

  inputRef = React.createRef();

  state = {
    nickname: '',
  };

  componentDidMount () {
    this.inputRef.current.focus();
  }

  setNickname = ({ target: { value: nickname }}) => this.setState({ nickname });

  submit = e => {
    e.preventDefault();
    const { nickname } = this.state;
    const { setNickname } = this.context;
    setNickname(nickname);
  }

  render () {
    const { nickname } = this.state;
    const { submit, setNickname, inputRef } = this;

    return (
      <form
        onSubmit={submit}>
        <p>Bonjour, quel est ton prénom ?</p>
        <input
          type="text"
          value={nickname}
          onChange={setNickname}
          ref={inputRef}
        />
        <button type="submit">Démarrer le jeu</button>
      </form>
    )
  }
}

export default Nickname
