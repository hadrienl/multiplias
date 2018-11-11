import React from 'react';

import { context } from '../../../services/GameProvider';

import './styles.scss';

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
        className="nickname"
        onSubmit={submit}>
        <p>Bonjour, quel est ton prénom ?</p>
        <p>
          <input
            className="nickname__input"
            type="text"
            value={nickname}
            onChange={setNickname}
            ref={inputRef}
          />
        </p>
        <p>
          <button
            type="submit"
            className="button-big"
          >
            Démarrer le jeu
          </button>
        </p>
      </form>
    )
  }
}

export default Nickname
