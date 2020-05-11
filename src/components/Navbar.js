import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faDonate, faDoorOpen, faFileSignature, faInfoCircle, faNewspaper, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import logoPNG from '../img/logo.png'
import LogoSVG from '../img/logo.svg'
import { auth } from '../utils/auth'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    const active = Boolean(typeof localStorage !== `undefined` && localStorage?.getItem('burger-menu'));
    this.state = {
      active,
      navBarActiveClass: active ? 'is-active' : '',
      loggedIn: auth.loggedIn()
    }
  }

  toggleHamburger = () => {
    void localStorage?.setItem('burger-menu', !this.state.active)
    this.setState(
      { active: !this.state.active },
      () => this.setState({navBarActiveClass: this.state.active ? 'is-active' : ''})
    )
  }

  handleLogin = async () => {
    if (auth.loggedIn()) {
      auth.logout();
    } else {
      console.log(await auth.tryLoginPopup())
      console.log(await auth.token())
    }
    this.setState({
      loggedIn: auth.loggedIn()
    })
  }

  render() {
    return (
      <nav
        className={`navbar is-fixed-top ${this.props.onTop ? 'navbar-top' : 'navbar-scrolled'}`}
        role="navigation"
        aria-label="main-navigation"
      >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logoPNG} alt="Rainbow6-RUSSIA" />
              <LogoSVG />
            </Link>
            <div
              role="button"
              tabIndex="0"
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={this.toggleHamburger}
              onKeyDown={this.toggleHamburger}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
            <div className="navbar-start">
              <Link className="navbar-item" to="/blog">
                <FontAwesomeIcon icon={faNewspaper}/>
                Новости
              </Link>
              <Link className="navbar-item" to="/donate">
                <FontAwesomeIcon icon={faDonate}/>
                Поддержать нас
              </Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to="/contact">
                  <FontAwesomeIcon icon={faFileSignature}/>
                  Связаться
                </Link>

                <div className="navbar-dropdown">
                  <Link className="navbar-item" to="/contact/unban">
                    Разбан
                  </Link>
                  <Link className="navbar-item" to="/contact/lobby">
                    Другой ник в лобби
                  </Link>
                  <Link className="navbar-item" to="/contact/18yo">
                    Верификация 18+
                  </Link>
                  <hr className="navbar-divider" />
                  <Link className="navbar-item" to="/contact/other">
                    Прочие вопросы
                  </Link>
                </div>
              </div>
              <Link className="navbar-item" to="/about">
                <FontAwesomeIcon icon={faInfoCircle}/>
                О нас
              </Link>
            </div>
            <div className="navbar-end">
              <a
                className="navbar-item"
                tabIndex="0"
                onClick={this.handleLogin}
                alt={this.state.loggedIn ? 'Выход' : 'Вход'}
              >
                <FontAwesomeIcon icon={this.state.loggedIn ? faDoorOpen : faSignInAlt}/>
                {this.state.loggedIn ? auth.user ? `${auth.user.username}#${auth.user.discriminator}` : 'Выход' : 'Вход'}
              </a>
              <a className="navbar-item" href="https://discord.gg/r6ru">
                <FontAwesomeIcon icon={faDiscord}/>
                Присоединиться
              </a>
            </div>
          </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  onTop: PropTypes.bool
}

export default Navbar
