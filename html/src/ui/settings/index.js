import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

import {
  selectServer,
  addServer
} from '../../ducks/signalk'

function mapStateToProps (state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    ...ownProps,
    theme: state.ui.theme,
    night: state.ui.night,
    servers: state.signalk.servers,
    hostname: state.signalk.hostname,
    port: state.signalk.port,
    connected: state.signalk.connected
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectServer,
    addServer
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
