import React from 'react'
import './styles.styl'

export default class UIComponent extends React.Component {
  render () {
    const {
      theme,
      night,
      signalk
    } = this.props

    const keys = {
      voltage: 'electrical.batteries.1.voltage',
      current: 'electrical.batteries.1.current',
      soc: 'electrical.batteries.1.stateOfCharge'
    }

    return (
      <section className={[ 'controls', theme, night ? 'night' : '' ].join(' ')}>
        <pre>{JSON.stringify(this.props.signalk, null, 2)}</pre>
        <div className='boxes'>
          <div className='box'>
            <h3>{Object.isObject(signalk, keys.soc) ? signalk[keys.soc].toFixed(0) : '--'}%</h3>
            <h4>capaciteit</h4>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, keys.current) ? signalk[keys.current].toFixed(1) : '--'}</h3>
            <h4>stroom (A)</h4>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, keys.voltage) ? signalk[keys.voltage].toFixed(1) : '--'}</h3>
            <h4>spanning (V)</h4>
          </div>
        </div>
      </section>
    )
  }
}
