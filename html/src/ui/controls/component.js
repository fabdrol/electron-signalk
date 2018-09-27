/**
 * component.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-16 11:52
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-27 17:54
 */

import React from 'react'
import './styles.styl'

export default class UIComponent extends React.Component {
  render () {
    const {
      theme,
      night,
      signalk
    } = this.props

    const houseKeys = {
      voltage: 'electrical.batteries.1.voltage',
      current: 'electrical.batteries.1.current',
      soc: 'electrical.batteries.1.stateOfCharge'
    }

    const engineKeys = {
      voltage: 'electrical.batteries.0.voltage',
      current: 'electrical.batteries.0.current',
      soc: 'electrical.batteries.0.stateOfCharge'
    }

    return (
      <section className={[ 'controls', theme, night ? 'night' : '' ].join(' ')}>
        <div className='boxes'>
          <div className='box'>
            <h3 className='icon'><i className='fa fa-cogs' /></h3>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, engineKeys.soc) ? signalk[engineKeys.soc].toFixed(0) : '--'}%</h3>
            <h4>capaciteit</h4>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, engineKeys.voltage) ? signalk[engineKeys.voltage].toFixed(1) : '--'}</h3>
            <h4>spanning (V)</h4>
          </div>
        </div>

        <div className='boxes row2'>
          <div className='box'>
            <h3 className='icon'><i className='fa fa-home' /></h3>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, houseKeys.soc) ? signalk[houseKeys.soc].toFixed(0) : '--'}%</h3>
            <h4>capaciteit</h4>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, houseKeys.voltage) ? signalk[houseKeys.voltage].toFixed(1) : '--'}</h3>
            <h4>spanning (V)</h4>
          </div>
          <div className='box'>
            <h3>{Object.isObject(signalk, houseKeys.current) ? signalk[houseKeys.current].toFixed(1) : '--'}</h3>
            <h4>stroom (A)</h4>
          </div>
        </div>
      </section>
    )
  }
}
