import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { setShouldReset } from '../../ducks/ui'

function mapStateToProps (state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    ...ownProps,
    theme: state.ui.theme,
    night: state.ui.night,
    shouldReset: state.ui.shouldReset
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setShouldReset
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
