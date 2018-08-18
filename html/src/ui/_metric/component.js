import React from 'react'
import utils from '@signalk/nmea0183-utilities'
import './styles.styl'

function ddToDms (deg, lng) {
  if (deg === null) {
    return '--'
  }

  let dir = ''
  let d = parseInt(deg, 10)
  const minfloat = Math.abs((deg - d) * 60)
  let m = Math.floor(minfloat)
  let secfloat = (minfloat - m) * 60
  d = Math.abs(d)

  if (secfloat === 60) {
    m += 1
    secfloat = 0
  }

  if (m === 60) {
    d += 1
    m = 0
  }

  if (lng === true) {
    dir = deg < 0 ? 'W' : 'S'
  } else {
    dir = deg < 0 ? 'E' : 'N'
  }

  return `${d}° ${m}' ${secfloat.toFixed(1)}" ${dir}`
}

export default class UIComponent extends React.Component {
  getLabels () {
    return this.props.label
  }

  render () {
    const {
      name,
      size,
      theme,
      values
    } = this.props

    const labels = this.getLabels()
    const convert = labels.hasOwnProperty('convert') ? labels.convert : null

    if (name === 'position') {
      const longitude = Object.keys(values).reduce((val, key) => {
        if (key.includes('longitude')) {
          val = values[key]
        }
        return val
      }, null)

      const latitude = Object.keys(values).reduce((val, key) => {
        if (key.includes('latitude')) {
          val = values[key]
        }
        return val
      }, null)

      return (
        <div className={['metric', 'position', size, theme].join(' ')}>
          <h1>{ddToDms(latitude)}</h1>
          <h1>{ddToDms(longitude)}</h1>

          <div className='meta'>
            <h2 className='left'>{labels.label}</h2>
          </div>
        </div>
      )
    }

    let title = <h1>--</h1>
    let value = Object.keys(values).length === 1 ? values[Object.keys(values)[0]] : '--'

    if (convert && typeof value === 'number' && !isNaN(value)) {
      value = utils.transform(value, convert.from, convert.to)
    }

    if (typeof value === 'number' && !isNaN(value)) {
      value = value.toFixed(1)
    }

    if (!value || value === '') {
      value = '--'
    }

    if (value !== '--') {
      title = <h1>{value}{labels.post}</h1>
    }

    return (
      <div className={['metric', size, theme].join(' ')}>
        {title}
        <div className='meta'>
          <h2 className='left'>{labels.label}</h2>
          <h2 className='right'>{labels.units}</h2>
        </div>
      </div>
    )
  }
}
