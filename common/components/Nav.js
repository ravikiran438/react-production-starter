import React, { PropTypes } from 'react'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'
import { combineRules } from 'fela'

const Nav = ({styles}, {renderer}) => {
  const css = (rule) => renderer.renderRule(rule)
  const activeLinkRule = css(combineRules(styles.link, styles.activeLink))
  return (
    <div>
      <IndexLink to='/' className={css(styles.link)} activeClassName={activeLinkRule}>
        Home
      </IndexLink>
      <Link to='/posts' className={css(styles.link)} activeClassName={activeLinkRule}> Example Feed
      </Link>
      <a href='https://github.com/jaredpalmer/react-production-starter' className={css(styles.link)} target='_blank'>GitHub</a>
      <a href='https://twitter.com/jaredpalmer' className={css(styles.link)} target='_blank'>Twitter</a>
    </div>
  )
}

Nav.contextTypes = { renderer: PropTypes.object }

Nav.propTypes = {
  styles: PropTypes.object
}

const styles = StyleSheet.create({
  link: {
    maxWidth: 700,
    color: '#999',
    margin: '1.5rem 1rem 1.5rem 0',
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  activeLink: {
    color: '#000'
  }
})

const mapStylesToProps = props => renderer => (styles)

export default connect(mapStylesToProps)(Nav)
