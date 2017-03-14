import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'

const PostListItem = ({ post, styles }, {renderer}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <div className={css(styles.root)}>
      <h3><Link to={`/post/${post.slug}`} className={css(styles.title)}> {post.title} </Link></h3>
    </div>
  )
}

PostListItem.contextTypes = { renderer: PropTypes.object }

PostListItem.propTypes = {
  post: PropTypes.object,
  styles: PropTypes.object
}

const styles = StyleSheet.create({
  root: {
    margin: '0 auto 1.5rem'
  },
  title: {
    fontSize: 28,
    textDecoration: 'none',
    lineHeight: '1.2',
    margin: '0 0 1.5rem',
    color: '#000',
    transition: '.3s opacity ease',
    ':hover': {
      opacity: 0.5
    }
  }
})

const mapStylesToProps = props => renderer => (styles)

export default connect(mapStylesToProps)(PostListItem)
