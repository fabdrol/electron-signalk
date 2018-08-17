import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

const labels = {
  headingTrue: {
    paths: ['navigation.headingTrue'],
    label: 'Kompas',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  speedThroughWater: {
    paths: ['navigation.speedThroughWater'],
    label: 'Snelheid door water',
    units: 'kts',
    post: '',
    convert: {
      from: 'ms',
      to: 'knots'
    }
  },
  depthBelowTransducer: {
    paths: ['environment.depth.belowTransducer'],
    label: 'Diepgang',
    units: 'm',
    post: ''
  },
  courseOverGround: {
    paths: ['navigation.courseOverGroundTrue'],
    label: 'Koers over grond',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  speedOverGround: {
    paths: ['navigation.speedOverGround'],
    label: 'Snelheid over grond',
    units: 'kts',
    post: '',
    convert: {
      from: 'ms',
      to: 'knots'
    }
  },
  position: {
    paths: [ 'navigation.position.latitude', 'navigation.position.longitude' ],
    label: 'Positie'
  },
  waterTemperature: {
    paths: ['environment.water.temperature'],
    label: 'Watertemperatuur',
    units: '°C',
    post: '',
    convert: {
      from: 'k',
      to: 'c'
    }
  }
}

function mapStateToProps (state, ownProps) {
  const label = labels.hasOwnProperty(ownProps.name) ? labels[ownProps.name] : {
    name: ownProps.name,
    units: '',
    post: '',
    paths: ['']
  }

  return {
    ...ownProps,
    theme: state.ui.theme,
    night: state.ui.night,
    values: label.paths.reduce((obj, key) => {
      obj[key] = Object.isObject(state.signalk.data, key) ? state.signalk.data[key] : null
      return obj
    }, {}),
    label
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
