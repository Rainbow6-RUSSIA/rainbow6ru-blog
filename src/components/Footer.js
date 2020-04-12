import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faVk, faYoutube, faSteam } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'gatsby'


const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div className="columns">
              <div className="column">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Главная
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/donate">
                        Поддержать нас
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        О нас
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Панель управления
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column">
                <div className="social">
                  <a style={{ color: '#4680C2' }} title="VK" href="https://vk.com/rainbow6_ru">
                    <FontAwesomeIcon icon={faVk}/>
                  </a>
                  <a style={{ color: 'black' }} title="Steam" href="https://steamcommunity.com/groups/Rainbow6-RUSSIA">
                    <FontAwesomeIcon icon={faSteam}/>
                  </a>
                  <a style={{ color: '#6441A4' }} title="Twitch" href="https://www.twitch.tv/rainbow6russia">
                    <FontAwesomeIcon icon={faTwitch}/>
                  </a>
                  <a style={{ color: '#C4302B' }} title="YouTube" href="https://www.youtube.com/channel/UC1QbCOt1inoZYExC73OaVJw">
                    <FontAwesomeIcon icon={faYoutube}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
