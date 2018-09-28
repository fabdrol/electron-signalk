/**
 * component.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-15 21:31
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 15:16
 */

import React from 'react'
import 'react-toggle/style.css'
import './styles.styl'

export default class UIComponent extends React.Component {
  gotoMetrics () {
    this.props.setShouldReset(this.props.path === '/')
    this.props.replace('/')
  }

  render () {
    const {
      night,
      theme,
      path,
      replace
    } = this.props

    const classes = [ 'sidebar', theme ]

    if (night === true) {
      classes.push('night')
    }

    return (
      <aside className={classes.join(' ')}>
        <div className='button brand'>
          <img src='/static/x99.png' />
        </div>

        <a className={[ 'button', 'nav', 'first', (path === '/' ? 'active' : '') ].join(' ')} onClick={() => this.gotoMetrics()}>
          <i className='fa fa-tachometer-alt' />
        </a>

        <a className={[ 'button', 'nav', (path === '/controls' ? 'active' : '') ].join(' ')} onClick={() => replace('/controls')}>
          <i className='fa fa-toggle-on' />
        </a>
      </aside>
    )
  }
}
