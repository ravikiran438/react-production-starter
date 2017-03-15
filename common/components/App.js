import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import Nav from './Nav'
import Footer from './Footer'
import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'
import { compose } from 'ramda'
import * as themes from '../themes'
import common from './common'

const App = ({ children, styles }, {renderer}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <div className={css(styles.root)}>
      <Helmet title='React Production Starter' titleTemplate='%s - React Production Starter' />
      <h1 className={css(styles.title)}>React Production Starter</h1>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

App.contextTypes = { renderer: PropTypes.object }

App.propTypes = {
  children: PropTypes.any,
  styles: PropTypes.object
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 700,
    color: '#000',
    margin: '2rem auto',
    padding: '0 1rem'
  },
  title: {
    color: '#000',
    maxWidth: 300,
    fontWeight: 'bold',
    fontSize: 56
  }
})

const mapStylesToProps = props => renderer => (styles)

export default compose(
  common({ themes }),
  connect(mapStylesToProps)
)(App)
