import React from 'react'
import './styles.styl'

const labels = {
  headingTrue: {
    label: 'Kompas',
    units: '',
    post: '°'
  },
  speedThroughWater: {
    label: 'Snelheid door water',
    units: 'kts',
    post: ''
  },
  depthBelowTransducer: {
    label: 'Diepgang',
    units: 'm',
    post: ''
  },
  courseOverGround: {
    label: 'Koers over grond',
    units: '',
    post: '°'
  },
  speedOverGround: {
    label: 'Snelheid over grond',
    units: 'kts',
    post: ''
  },
  position: {
    label: 'Positie'
  },
  waterTemperature: {
    label: 'Watertemperatuur',
    units: '°C',
    post: ''
  }
}

export default class UIComponent extends React.Component {
  getLabels (name) {
    if (!labels.hasOwnProperty(name)) {
      return {
        label: name,
        units: '',
        post: ''
      }
    }

    return labels[name]
  }
  render () {
    const {
      name,
      size,
      theme
    } = this.props

    const labels = this.getLabels(name)

    if (name === 'position') {
      return (
        <div className={['metric', 'position', size, theme].join(' ')}>
          <h1>152° 122' 112.178" N</h1>
          <h1>4° 53' 42.60" E</h1>

          <div className='meta'>
            <h2 className='left'>{labels.label}</h2>
          </div>
        </div>
      )
    }

    return (
      <div className={['metric', size, theme].join(' ')}>
        <h1>360.00{labels.post}</h1>
        <div className='meta'>
          <h2 className='left'>{labels.label}</h2>
          <h2 className='right'>{labels.units}</h2>
        </div>
      </div>
    )
  }
}
