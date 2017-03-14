import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadPosts } from '../actions'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import PostListItem from '../components/PostListItem'
import { connect as connectFela } from 'react-fela'
import { StyleSheet } from 'fela-tools'
import Helmet from 'react-helmet'
import { selectPosts } from '../reducer'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPosts())
}

const mapStateToProps = state => ({
  posts: selectPosts(state)
})

const PostListPage = ({ posts, styles }, {renderer}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <div className={css(styles.root)}>
      <Helmet title='Posts' />
      {posts.isLoading &&
        <div>
          <h2 className={css(styles.title)}>Loading....</h2>
        </div>}
      {!posts.isLoading &&
        posts.data.map((post, i) => <PostListItem key={post.id} post={post} />)}
    </div>
  )
}

PostListPage.contextTypes = { renderer: PropTypes.object }

PostListPage.propTypes = {
  posts: PropTypes.object.isRequired,
  styles: PropTypes.object
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

const mapStylesToProps = props => renderer => (styles)

export default provideHooks(redial)(compose(connect(mapStateToProps), connectFela(mapStylesToProps))(PostListPage))
