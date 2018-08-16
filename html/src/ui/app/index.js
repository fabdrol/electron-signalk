import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

function mapStateToProps (state, ownProps) { // eslint-disable-line no-unused-vars
  return {
    ...ownProps
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
