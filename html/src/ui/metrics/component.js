import React from 'react'
import './styles.styl'

export default class UIComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      layout: null,
      metrics: []
    }
  }

  render () {
    const {
      theme,
      night
    } = this.props

    let layout = null

    /*
    const metrics = [
      'Kompas',
      'COG',
      'STW',
      'SOG',
      'Diepgang',
      'Positie',
      'Watertemperatuur'
    ]
    // */

    if (this.state.metrics.length === 0) {
      layout = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner'>
                  <ul className='layouts'>
                    <li className='layout' onClick={() => this.setState({ layout: 'six', metrics: ['headingTrue', 'speedThroughWater', 'depthBelowTransducer', 'courseOverGround', 'speedOverGround', 'position'] })}>
                      <strong><i className='fa fa-th' /> Overzicht 6x</strong>
                      <em>Kompas, COG, SOG, STW, diepgang, positie</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'quattro', metrics: ['headingTrue', 'depthBelowTransducer', 'speedThroughWater', 'speedOverGround'] })}>
                      <strong><i className='fa fa-th-large' /> Overzicht 4x (navigatie)</strong>
                      <em>Kompas, diepgang, STW, SOG</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'double_vertical', metrics: ['headingTrue', 'courseOverGround'] })}>
                      <strong><i className='fa fa-pause' /> Koers 2x</strong>
                      <em>Kompas & COG</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'double_vertical', metrics: ['speedThroughWater', 'speedOverGround'] })}>
                      <strong><i className='fa fa-pause' /> Snelheid 2x</strong>
                      <em>STW & SOG</em>
                    </li>
                    <li className='layout disabled'>
                      <strong><i className='fa fa-th-large' /> Overzicht 4x (zeilen)</strong>
                      <em>Kompas, wind, STW</em>
                    </li>
                    <li className='layout disabled'>
                      <strong><i className='fa fa-pause' /> Wind</strong>
                      <em>Wind snelheid & richting</em>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner last'>
                  <ul className='layouts'>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['depthBelowTransducer'] })}>
                      <strong><i className='fa fa-wifi' /> Diepgang</strong>
                      <em>Diepgang onder de meter</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['courseOverGround'] })}>
                      <strong><i className='fa fa-compass' /> COG</strong>
                      <em>Koers over de grond</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['headingTrue'] })}>
                      <strong><i className='fa fa-compass' /> Kompas</strong>
                      <em>Digitaal kompas</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['position'] })}>
                      <strong><i className='fa fa-map-marker-alt' /> Positie</strong>
                      <em>GPS</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['speedOverGround'] })}>
                      <strong><i className='fa fa-tachometer-alt' /> SOG</strong>
                      <em>Snelheid over de grond</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['speedThroughWater'] })}>
                      <strong><i className='fa fa-tachometer-alt' /> STW</strong>
                      <em>Snelheid door het water</em>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single', metrics: ['waterTemperature'] })}>
                      <strong><i className='fa fa-thermometer-quarter' /> Watertemperatuur</strong>
                      <em>Temperatuur onder de boot</em>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.layout === 'single' && this.state.metrics.length === 1) {
      layout = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='block'>
                <div className='block-inner middle'>
                  {this.state.metrics[0] || '<none>'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.layout === 'double_vertical' && this.state.metrics.length === 2) {
      layout = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner'>
                  {this.state.metrics[0] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner last'>
                  {this.state.metrics[1] || '<none>'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.layout === 'double_horizontal' && this.state.metrics.length === 2) {
      layout = (
        <div className='container-fluid'>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-12'>
              <div className='block'>
                <div className='block-inner middle'>
                  {this.state.metrics[0] || '<none>'}
                </div>
              </div>
            </div>
          </div>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-12'>
              <div className='block'>
                <div className='block-inner middle bottom'>
                  {this.state.metrics[1] || '<none>'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.layout === 'quattro' && this.state.metrics.length === 4) {
      layout = (
        <div className='container-fluid'>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner'>
                  {this.state.metrics[0] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner last'>
                  {this.state.metrics[1] || '<none>'}
                </div>
              </div>
            </div>
          </div>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner bottom'>
                  {this.state.metrics[2] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner last bottom'>
                  {this.state.metrics[3] || '<none>'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.layout === 'six' && this.state.metrics.length === 6) {
      layout = (
        <div className='container-fluid'>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-4'>
              <div className='block'>
                <div className='block-inner'>
                  {this.state.metrics[0] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block'>
                <div className='block-inner' style={{ marginLeft: 0 }}>
                  {this.state.metrics[1] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block'>
                <div className='block-inner last'>
                  {this.state.metrics[2] || '<none>'}
                </div>
              </div>
            </div>
          </div>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-4'>
              <div className='block'>
                <div className='block-inner bottom'>
                  {this.state.metrics[3] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block'>
                <div className='block-inner bottom' style={{ marginLeft: 0 }}>
                  {this.state.metrics[4] || '<none>'}
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block'>
                <div className='block-inner last bottom'>
                  {this.state.metrics[5] || '<none>'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <section className={[ 'metrics', theme, night ? 'night' : '' ].join(' ')}>
        {layout}
      </section>
    )
  }
}
