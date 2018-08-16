import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { push } from 'react-router-redux'

import {
  setNight,
  setTheme,
  toggleNight,
  toggleTheme
} from '../../ducks/ui'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    night: state.ui.night,
    theme: state.ui.theme,
    path: state.router.location.pathname
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setNight,
    setTheme,
    toggleNight,
    toggleTheme,
    push
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
