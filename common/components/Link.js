import React, { PropTypes } from 'react'
import { Link as ReactRouterLink } from 'react-router'

const isExternalLink = to => to.includes('://')

const Anchor = ({ to, ...props }) => (
  <a href={to} target='_blank' {...props} />
)

Anchor.propTypes = {
  to: PropTypes.string
}

const RouterLink = props => (
  <ReactRouterLink {...props} />
)

const Link = (props) => {
  const AnchorOrRouterLink = isExternalLink(props.to) ? Anchor : RouterLink
  return (<AnchorOrRouterLink {...props} />)
}

Link.propTypes = {
  to: PropTypes.string
}

export default Link
