import { compose, isNil, prop, reverse, sortBy, values } from 'ramda'
import React, { PropTypes } from 'react'
import RegionListItem, { RegionListItemFragment } from '../components/RegionListItem'
import Helmet from 'react-helmet'
import { Box, Text } from 'kilvin'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'

const RegionList = ({ loading, viewer }) => {
  if (loading) {
    return (<Text>Loading.....</Text>)
  }

  if (isNil(viewer)) {
    return (
      <Box>
        <Text>
          It's rather empty here...
        </Text>
      </Box>
    )
  }

  const sortedRegions = compose(
    reverse,
    sortBy(prop('regionID')),
    values, // object values to array
  )(viewer.regionList)

  return (
    <Box>
      <Text>Total {viewer.regionList.length} records</Text>
      {sortedRegions.map((region, i) =>
        <Box key={i} borderWidth={3}>
          <RegionListItem
            region={region}
          />
        </Box>,
      )}
    </Box>
  )
}

RegionList.fragments = {
  viewer: gql`
      fragment RegionsViewerFragment on Viewer {
        regionList {
          ...RegionFragment
        }
      }
      ${RegionListItemFragment.region}
      `
}

const REGIONS_QUERY = gql`
  query {
    viewer {
      ...RegionsViewerFragment
    }
  }
${RegionList.fragments.viewer}
`

const RegionListWithData = graphql(REGIONS_QUERY, {
  props: ({ data: { loading, viewer } }) => ({
    loading,
    viewer
  })
})(RegionList)

RegionList.propTypes = {
  viewer: PropTypes.object,
  loading: PropTypes.bool
}

const RegionsPage = ({styles}, {renderer, theme}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <Box>
      <Box className={css(styles.regionListContainer)}>
        <Helmet title='Regions' />
        <RegionListWithData />
      </Box>
      <Box>
        <Text className={css(styles.regionListContainerBottomText)}> This is after graphql HOC component</Text>
      </Box>
    </Box>
  )
}

RegionsPage.contextTypes = { renderer: PropTypes.object, theme: PropTypes.object }

RegionsPage.propTypes = {
  styles: PropTypes.object
}

const styles = StyleSheet.create({
  regionListContainer: {
    margin: '4rem auto',
    textAlign: 'center',
    backgroundColor: '#66cc99',
    borderColor: 'blue',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  regionListContainerBottomText: {
    color: 'red',
    borderColor: 'blue',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid'
  }
})

const mapStylesToProps = props => renderer => (styles)

export default connect(mapStylesToProps)(RegionsPage)
