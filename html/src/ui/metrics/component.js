import React from 'react'
import Combinatorics from 'js-combinatorics'
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
    let calculatedMetrics = null

    const metrics = [
      'Kompas',
      'COG',
      'STW',
      'SOG',
      'Diepgang',
      'Positie',
      'Watertemperatuur'
    ]

    if (this.state.layout !== null) {
      switch (this.state.layout) {
        case 'single':
          calculatedMetrics = metrics.map((metric, index) => (
            <li key={index} className='metric'>{metric}</li>
          ))
          break

        case 'double_vertical':
        case 'double_horizontal':
        case 'quattro':
        case 'six':
          let num = 2
          num = this.state.layout === 'quattro' ? 4 : num
          num = this.state.layout === 'six' ? 6 : num
          calculatedMetrics = Combinatorics.combination(metrics, num).toArray().map((metric, index) => (
            <li key={index} className='metric'>{metric.join(', ')}</li>
          ))
          break
      }

      console.log('calculatedMetrics', calculatedMetrics)
    }

    if (this.state.metrics.length === 0) {
      layout = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner'>
                  <ul className='layouts'>
                    <li className='layout' onClick={() => this.setState({ layout: 'six' })}>
                      <strong><i className='fa fa-th' /> Overzicht 6x</strong>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'quattro' })}>
                      <strong><i className='fa fa-th-large' /> Overzicht 4x</strong>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'double_vertical' })}>
                      <strong><i className='fa fa-pause' /> Verticaal</strong>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'double_horizontal' })}>
                      <strong><i className='fa fa-pause' style={{ transform: 'rotate(90deg)' }} /> Horizontaal</strong>
                    </li>
                    <li className='layout' onClick={() => this.setState({ layout: 'single' })}>
                      <strong><i className='fa fa-square' /> Enkel</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner last'>
                  <ul className='layouts'>
                    {calculatedMetrics}
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
                <div className='block-inner'>
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
