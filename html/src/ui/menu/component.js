import React from 'react'
import ReactToggle from 'react-toggle'
import 'react-toggle/style.css'
import './styles.styl'

export default class UIComponent extends React.Component {
  render () {
    const {
      night,
      theme,
      path,
      push
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

        <a className={[ 'button', 'nav', 'first', (path === '/' ? 'active' : '') ].join(' ')} onClick={() => push('/')}>
          <i className='fa fa-tachometer-alt' />
        </a>

        <a className={[ 'button', 'nav', (path === '/controls' ? 'active' : '') ].join(' ')} onClick={() => push('/controls')}>
          <i className='fa fa-toggle-on' />
        </a>

        <a className={[ 'button', 'nav', (path === '/settings' ? 'active' : '') ].join(' ')} onClick={() => push('/settings')}>
          <i className='fa fa-cogs' />
        </a>

        <label className='button button-bottom'>
          <ReactToggle
            defaultChecked={theme === 'dark'}
            onChange={evt => this.props.setTheme(evt.target.checked ? 'dark' : 'light')}
          />
        </label>
      </aside>
    )
  }
}
