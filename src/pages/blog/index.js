import React from 'react'
import BlogRoll from '../../components/BlogRoll'
import Layout from '../../components/Layout'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image margin-top-0 bg-banner"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #353535, -0.5rem 0 0 #353535',
              backgroundColor: '#353535',
              color: 'white',
              padding: '1rem',
            }}
          >
            Последние новости
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
