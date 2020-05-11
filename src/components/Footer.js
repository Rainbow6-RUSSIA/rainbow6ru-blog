import { faSteam, faTwitch, faVk, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'

const hw = { height: '1em', width: '1.125em' }

const Footer = () => (
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
              <a style={{ color: '#4680C2', ...hw }} title="VK" href="https://vk.com/rainbow6_ru">
                <FontAwesomeIcon icon={faVk}/>
              </a>
              <a style={{ color: 'black', ...hw }} title="Steam" href="https://steamcommunity.com/groups/Rainbow6-RUSSIA">
                <FontAwesomeIcon icon={faSteam}/>
              </a>
              <a style={{ color: '#6441A4', ...hw }} title="Twitch" href="https://www.twitch.tv/rainbow6russia">
                <FontAwesomeIcon icon={faTwitch}/>
              </a>
              <a style={{ color: '#C4302B', ...hw }} title="YouTube" href="https://www.youtube.com/channel/UC1QbCOt1inoZYExC73OaVJw">
                <FontAwesomeIcon icon={faYoutube}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
