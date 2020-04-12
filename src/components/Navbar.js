import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faDonate, faInfoCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'gatsby'
import logo from '../img/logo.png'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main-navigation"
      >
        {/* <div className="container"> */}
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} alt="Rainbow6-RUSSIA" />
              <b>Rainbow6-RUSSIA</b>
            </Link>
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
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
              <a class="navbar-item" href="https://discord.gg/r6ru">
                <FontAwesomeIcon icon={faDiscord}/>
                Присоединиться
              </a>
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
              >
                <FontAwesomeIcon icon={faSignInAlt}/>
                Вход (скоро)
              </a>
            </div>
          </div>
        {/* </div> */}
      </nav>
    )
  }
}

export default Navbar
