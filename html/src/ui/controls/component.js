import React from 'react'
import './styles.styl'

export default class UIComponent extends React.Component {
  render () {
    const {
      theme,
      night
    } = this.props

    return (
      <section className={[ 'controls', theme, night ? 'night' : '' ].join(' ')}>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </section>
    )
  }
}
