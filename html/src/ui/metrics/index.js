/**
 * index.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-15 21:15
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 14:40
 */

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { setShouldReset } from '../../ducks/ui'

function mapStateToProps (state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    ...ownProps,
    theme: state.ui.theme,
    night: state.ui.night,
    shouldReset: false,
    layout: state.ui.layout,
    metrics: state.ui.metrics
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setShouldReset
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
