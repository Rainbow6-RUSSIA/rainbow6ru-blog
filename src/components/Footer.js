import {
  faSteam,
  faTwitch,
  faVk,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
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
              <a title="VK" href="https://vk.com/rainbow6_ru">
                <FontAwesomeIcon
                  style={{ color: '#4680C2', ...hw }}
                  icon={faVk}
                />
              </a>
              <a title="Twitch" href="https://www.twitch.tv/rainbow6russia">
                <FontAwesomeIcon
                  style={{ color: '#6441A4', ...hw }}
                  icon={faTwitch}
                />
              </a>
              <a
                title="Steam"
                href="https://steamcommunity.com/groups/Rainbow6-RUSSIA"
              >
                <FontAwesomeIcon
                  style={{ color: 'black', ...hw }}
                  icon={faSteam}
                />
              </a>
              <a
                title="YouTube"
                href="https://www.youtube.com/channel/UC1QbCOt1inoZYExC73OaVJw"
              >
                <FontAwesomeIcon
                  style={{ color: '#C4302B', ...hw }}
                  icon={faYoutube}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
