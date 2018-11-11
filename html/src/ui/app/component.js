import '../../styles/index.styl'
import React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

// import Menu from '../menu'
import Metrics from '../metrics'
import Controls from '../controls'
// import Settings from '../settings'

export default class UIComponent extends React.Component {
  render () {
    const content = (
      <section className='application'>
        <Route path='/' component={Metrics} exact />
        <Route path='/controls' component={Controls} exact />
        <Route path='/settings' component={Metrics} exact />
      </section>
    )

    return (
      <ConnectedRouter history={this.props.history}>
        {content}
      </ConnectedRouter>
    )
  }
}
