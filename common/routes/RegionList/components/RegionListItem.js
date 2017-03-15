import React, { PropTypes } from 'react'
import { Box, Text } from 'kilvin'
import gql from 'graphql-tag'
import { StyleSheet } from 'fela-tools'
import { connect } from 'react-fela'

const RegionListItem = ({region, styles}, {renderer, theme}) => {
  const css = (rule) => renderer.renderRule(rule)
  return (
    <Box className={css(styles.regionListItemContainer)}>
      <dl>
        <dt>RegionID</dt>
        <dd>{region.regionID}</dd>

        <dt>Name</dt>
        <dd><b>{region.name}</b></dd>

        <dt>Territories</dt>
        <dd>
          { region.territories.map((row, i) => <Text key={i}>{row.name} ({row.territoryID})</Text>)}
        </dd>
      </dl>
    </Box>
  )
}

const styles = StyleSheet.create({
  regionListItemContainer: {
    margin: '4rem auto',
    textAlign: 'center',
    backgroundColor: '#33ffcc'
  }
})

export const RegionListItemFragment = {
  region: gql`
    fragment RegionFragment on Region {
      regionID
      name
      territories {
        territoryID
        name
      }
    }
  `
}

RegionListItem.contextTypes = { renderer: PropTypes.object, theme: PropTypes.object }

RegionListItem.propTypes = {
  region: PropTypes.object,
  styles: PropTypes.object
}

const mapStylesToProps = props => renderer => (styles)

export default connect(mapStylesToProps)(RegionListItem)
