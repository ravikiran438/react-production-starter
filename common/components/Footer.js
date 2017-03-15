import React, { PropTypes } from 'react'
import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'
import { Text } from 'kilvin'

const Footer = ({styles}, {renderer, theme}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <footer>
      <Text>This is after react-router children Copyright © 2016 <a href='http://twitter.com/jaredpalmer' target='_blank'>Jared Palmer</a></Text>
    </footer>
  )
}

const styles = StyleSheet.create({
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7',
    borderColor: 'blue',
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  footerLink: {
    display: 'inline-block',
    color: '#000',
    textDecoration: 'none'
  }
})

Footer.contextTypes = { renderer: PropTypes.object, theme: PropTypes.object }

Footer.propTypes = {
  styles: PropTypes.object
}

const mapStylesToProps = props => renderer => (styles)

export default connect(mapStylesToProps)(Footer)
