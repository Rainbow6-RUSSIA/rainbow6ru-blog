import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faDonate, faInfoCircle, faNewspaper, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import logoPNG from '../img/logo.png'
import LogoSVG from '../img/logo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    const active = Boolean(typeof localStorage !== `undefined` && localStorage?.getItem('burger-menu'));
    this.state = {
      active,
      navBarActiveClass: active ? 'is-active' : '',
    }
  }

  toggleHamburger = () => {
    void localStorage?.setItem('burger-menu', !this.state.active)
    this.setState(
      { active: !this.state.active },
      () => this.setState({navBarActiveClass: this.state.active ? 'is-active' : ''})
    )
  }

  render() {
    return (
      <nav
        className={`navbar is-fixed-top ${this.props.onTop ? 'navbar-top' : 'navbar-scrolled'}`}
        role="navigation"
        aria-label="main-navigation"
      >
        {/* <div className="container"> */}
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
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start">
              <Link className="navbar-item" to="/blog">
                <FontAwesomeIcon icon={faNewspaper}/>
                Новости
              </Link>
              <Link className="navbar-item" to="/donate">
                <FontAwesomeIcon icon={faDonate}/>
                Поддержать нас
              </Link>
              <Link className="navbar-item" to="/about">
                <FontAwesomeIcon icon={faInfoCircle}/>
                О нас
              </Link>
            </div>
            <div className="navbar-end">
              <a
                className="navbar-item is-disabled"
                target="_blank"
                rel="noopener noreferrer"
                // href="about"
              >
                <FontAwesomeIcon icon={faSignInAlt}/>
                Вход (скоро)
              </a>
              <a className="navbar-item" href="https://discord.gg/r6ru">
                <FontAwesomeIcon icon={faDiscord}/>
                Присоединиться
              </a>
            </div>
          </div>
        {/* </div> */}
      </nav>
    )
  }
}

Navbar.propTypes = {
  onTop: PropTypes.bool
}

export default Navbar
