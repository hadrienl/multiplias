import React from 'react';

import { context } from '../../services/GameProvider';

import './styles.scss';

export class Header extends React.Component {
  static contextType = context;

  render () {
    const { nickname, questions, reset } = this.context;
    const remainingQuestionsCount = questions.reduce((count, question) => {
      return count + (question.answer === undefined ? 1 : 0)
    }, 0);

    return (
      <header className="main-header">
        <h1 className="main-header__title">Multiplias</h1>
        <div className="main-header__tools">
          <div>
            {nickname &&
              <button
                className="button"
                onClick={reset}
              >
                Changer de joueur
              </button>
            }
          </div>
          <div>
            {nickname &&
              <span>
                Bonjour, {nickname}.
              </span>
            }
            {!!remainingQuestionsCount &&
              <>
                {` `}
                <span>
                  Il te reste {remainingQuestionsCount} questions.
                </span>
              </>
            }
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
