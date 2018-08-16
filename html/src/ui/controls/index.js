import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

function mapStateToProps (state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    ...ownProps,
    theme: state.ui.theme,
    night: state.ui.night
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
