import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { withPrefix } from 'gatsby'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()

  const [onTop, setOnTop] = useState(true)

  useScrollPosition(
    ({ currPos }) => {
      const isOnTop = currPos.y === 0
      if (isOnTop !== onTop) setOnTop(isOnTop)
    },
    [onTop]
  )

  return (
    <div>
      <Helmet>
        <html lang="ru" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar onTop={onTop} />
      <div className="has-navbar-fixed-top">{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
