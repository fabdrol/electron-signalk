import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

function mapStateToProps (state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    ...ownProps,
    theme: state.ui.theme,
    night: state.ui.night,
    signalk: Object.keys(state.signalk.data).filter(key => key.includes('electrical')).reduce((obj, key) => {
      obj[key] = state.signalk.data[key]
      return obj
    }, {})
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
