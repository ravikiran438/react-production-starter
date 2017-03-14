import React, { PropTypes } from 'react'

import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'
import data from '../data'

// This is a static page. It uses an array to hold data about the resources
// and maintain DRY
const Home = ({styles}, {renderer}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <div>

      <h2 className={css(styles.header)}>About</h2>
      <p className={css(styles.lead)}>
        This is an example react application (master-detail feed) with isomorphic rendering, async react-router routes, async redux reducers, async data fetching, and code-splitting.
      </p>
      <h2 className={css(styles.header)}>Motivation</h2>
      <p className={css(styles.lead)}>
        The file size of isomorphic React apps can quickly get out of hand. Many isomorphic starter kits look awesome to begin with but yield a several megabyte javascript
        file for the client to download. This project aims to demonstrate some possible solutions.
      </p>
      <h2 className={css(styles.header)}>Under the Hood</h2>
      <ul className={css(styles.list)}>
        {data.map((item, i) => (
          <li key={i}>
            <h3><a className={css(styles.link)} href={item.link} target='_blank'>{item.resource}</a></h3>
            <p className={css(styles.body)}>{item.description}</p>
          </li>
         ))}
      </ul>
    </div>
  )
}

Home.contextTypes = { renderer: PropTypes.object }

Home.propTypes = {
  styles: PropTypes.object
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    lineHeight: '1.2',
    margin: '0 0 1.5rem'
  },
  lead: {
    fontSize: 18,
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  list: {
    fontSize: '1rem',
    listStyle: 'none',
    padding: 0
  },
  link: {
    display: 'block',
    fontSize: '1.25rem',
    margin: '0 0 .5rem',
    lineHeight: '1.5',
    fontWeight: 'bold',
    color: '#08c',
    opacity: 1,
    transition: '.2s opacity ease',
    textDecoration: 'none',
    ':hover': {
      opacity: 0.5,
      textDecoration: 'none'
    }
  }
})

const mapStylesToProps = props => renderer => (styles)

export default connect(mapStylesToProps)(Home)
