import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

const labels = {
  headingTrue: {
    paths: ['navigation.headingTrue'],
    label: 'Kompas (T)',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  headingMagnetic: {
    paths: ['navigation.headingMagnetic'],
    label: 'Kompas (M)',
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
  depthBelowKeel: {
    paths: ['environment.depth.belowKeel'],
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
  },
  outsideTemperature: {
    paths: ['environment.outside.temperature'],
    label: 'Buitentemperatuur',
    units: '°C',
    post: '',
    convert: {
      from: 'k',
      to: 'c'
    }
  },
  windDirectionTrue: {
    paths: ['environment.wind.directionTrue'],
    label: 'Windrichting (T)',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  windDirectionMagnetic: {
    paths: ['environment.wind.directionMagnetic'],
    label: 'Windrichting (M)',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  windAngleApparent: {
    paths: ['environment.wind.angleApparent'],
    label: 'Windhoek (A)',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  windSpeedApparent: {
    paths: ['environment.wind.speedApparent'],
    label: 'Windsnelheid (A)',
    units: 'kts',
    post: '',
    convert: {
      from: 'ms',
      to: 'knots'
    }
  },
  windAngleTrueGround: {
    paths: ['environment.wind.angleTrueGround'],
    label: 'Windhoek over grond (T)',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  windSpeedTrueGround: {
    paths: ['environment.wind.speedOverGround'],
    label: 'Windsnelheid over grond (T)',
    units: 'kts',
    post: '',
    convert: {
      from: 'ms',
      to: 'knots'
    }
  },
  windAngleTrueWater: {
    paths: ['environment.wind.angleTrueWater'],
    label: 'Windhoek (T)',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  windSpeedTrueWater: {
    paths: ['environment.wind.speedTrue'],
    label: 'Windsnelheid (T)',
    units: 'kts',
    post: '',
    convert: {
      from: 'ms',
      to: 'knots'
    }
  },
  roll: {
    paths: ['navigation.attitude.roll'],
    label: 'Yaw',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  pitch: {
    paths: ['navigation.attitude.pitch'],
    label: 'Yaw',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
    }
  },
  yaw: {
    paths: ['navigation.attitude.yaw'],
    label: 'Yaw',
    units: '',
    post: '°',
    convert: {
      from: 'rad',
      to: 'deg'
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
