import React from 'react'
import './styles.styl'

export default class UIComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addServerActive: false,
      name: '',
      hostname: '',
      port: 3000
    }
  }

  addServer () {
    if (this.state.hostname.trim() === '') {
      return
    }

    this.props.addServer(this.state.name, this.state.hostname, this.state.port || 80)
    this.reset()
  }

  reset () {
    this.setState({
      addServerActive: false,
      name: '',
      hostname: '',
      port: 3000
    })
  }

  selectServer (id) {
    this.props.selectServer(id)
    setTimeout(() => window.location.reload(), 500)
  }

  render () {
    const {
      theme,
      night,
      servers,
      hostname,
      port,
      connected
    } = this.props

    let addServer = null

    if (this.state.addServerActive) {
      addServer = (
        <div className='block'>
          <div className='block-inner' style={{ marginLeft: 0, marginRight: 20 }}>
            <form>
              <div className='form-group'>
                <label>Naam</label>
                <input type='text' className='form-control' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
              </div>
              <div className='form-group'>
                <label>Hostname</label>
                <input type='text' className='form-control' value={this.state.hostname} onChange={e => this.setState({ hostname: e.target.value })} />
              </div>
              <div className='form-group'>
                <label>Port</label>
                <input type='number' className='form-control' value={this.state.port} onChange={e => this.setState({ port: e.target.value })} />
              </div>
              <a className='btn btn-primary' style={{ color: 'white' }} onClick={() => this.addServer()}>
                <i className='fa fa-plug' /> Toevoegen
              </a>

              <a className='btn btn-link' onClick={() => this.reset()} style={{ cursor: 'pointer', fontStyle: 'italic' }}>Annuleren</a>
            </form>
          </div>
        </div>
      )
    }

    return (
      <section className={[ 'settings', theme, night ? 'night' : '' ].join(' ')}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-5'>
              <div className='block'>
                <div className='block-inner'>
                  <ul className='servers'>
                    {servers.map(server => (
                      <li key={server.id} onClick={() => this.selectServer(server.id)} className={(hostname === server.hostname && port === server.port) ? 'selected' : ''}>
                        <strong>{server.name}</strong>
                        <em>{server.hostname}:{server.port} {(connected === true && hostname === server.hostname && port === server.port) ? (<span><i className='fa fa-plug' /></span>) : ''}</em>
                      </li>
                    ))}
                    <li key='add' className={['add', this.state.addServerActive ? 'selected' : ''].join(' ')} onClick={() => this.setState({ addServerActive: true })}>
                      <strong><i className='fa fa-plus' /> Server toevoegen</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-7'>
              {addServer}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
