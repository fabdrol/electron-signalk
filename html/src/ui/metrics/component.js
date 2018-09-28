/**
 * component.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-15 21:15
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 15:12
 */

import React from 'react'
import Metric from '../_metric'
import './styles.styl'

export default class UIComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      layout: props.layout,
      metrics: props.metrics
    }

    this.validLayouts = [
      'single',
      'double_vertical',
      'quattro',
      'six'
    ]
  }

  componentWillUpdate (newProps) {
    if (newProps.layout === this.state.layout && newProps.metrics === this.state.metrics) {
      return
    }

    let nextLayout = newProps.layout
    let nextMetrics = newProps.metrics

    if (!this.validLayouts.includes(nextLayout)) {
      nextLayout = null
    }

    if (!Array.isArray(nextMetrics) || nextMetrics.length === 0) {
      nextMetrics = null
    }

    this.setState({
      layout: nextLayout,
      metrics: nextMetrics
    })
  }

  setLayout (conf) {

  }

  render () {
    const {
      theme,
      night
    } = this.props

    let layout = null

    if (this.state.layout === null || this.state.metrics === null || this.state.metrics.length === 0) {
      layout = (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='block'>
                <div className='block-inner'>
                  <ul className='layouts'>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'six', metrics: ['headingTrue', 'speedThroughWater', 'depthBelowTransducer', 'courseOverGround', 'speedOverGround', 'position'] })}>
                      <strong><i className='fa fa-th' /> Overzicht 6x</strong>
                      <em>Kompas, COG, SOG, STW, diepgang, positie</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'quattro', metrics: ['headingTrue', 'courseOverGround', 'speedThroughWater', 'speedOverGround'] })}>
                      <strong><i className='fa fa-th-large' /> Overzicht 4x (zee)</strong>
                      <em>Kompas, COG, STW, SOG</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'quattro', metrics: ['headingTrue', 'depthBelowTransducer', 'speedThroughWater', 'position'] })}>
                      <strong><i className='fa fa-th-large' /> Overzicht 4x (binnenwater)</strong>
                      <em>Kompas, diepgang, STW, positie</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'double_vertical', metrics: ['headingTrue', 'courseOverGround'] })}>
                      <strong><i className='fa fa-pause' /> Koers 2x</strong>
                      <em>Kompas & COG</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'double_vertical', metrics: ['speedThroughWater', 'speedOverGround'] })}>
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
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['depthBelowTransducer'] })}>
                      <strong><i className='fa fa-wifi' /> Diepgang</strong>
                      <em>Diepgang onder de meter</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['courseOverGround'] })}>
                      <strong><i className='fa fa-compass' /> COG</strong>
                      <em>Koers over de grond</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['headingTrue'] })}>
                      <strong><i className='fa fa-compass' /> Kompas</strong>
                      <em>Digitaal kompas</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['position'] })}>
                      <strong><i className='fa fa-map-marker-alt' /> Positie</strong>
                      <em>GPS</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['speedOverGround'] })}>
                      <strong><i className='fa fa-tachometer-alt' /> SOG</strong>
                      <em>Snelheid over de grond</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['speedThroughWater'] })}>
                      <strong><i className='fa fa-tachometer-alt' /> STW</strong>
                      <em>Snelheid door het water</em>
                    </li>
                    <li className='layout' onClick={() => this.setLayout({ layout: 'single', metrics: ['waterTemperature'] })}>
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
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner middle'>
                  <Metric name={this.state.metrics[0]} size='full' />
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
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner'>
                  <Metric name={this.state.metrics[0]} size='half' />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner last'>
                  <Metric name={this.state.metrics[1]} size='half' />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // if (this.state.layout === 'double_horizontal' && this.state.metrics.length === 2) {
    //   layout = (
    //     <div className='container-fluid'>
    //       <div className='row' style={{ height: '50%' }}>
    //         <div className='col-12'>
    //           <div className='block'>
    //             <div className='block-inner middle'>
    //               {this.state.metrics[0] || '<none>'}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='row' style={{ height: '50%' }}>
    //         <div className='col-12'>
    //           <div className='block'>
    //             <div className='block-inner middle bottom'>
    //               {this.state.metrics[1] || '<none>'}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }

    if (this.state.layout === 'quattro' && this.state.metrics.length === 4) {
      layout = (
        <div className='container-fluid'>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-6'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner'>
                  <Metric name={this.state.metrics[0]} size='medium' />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner last'>
                  <Metric name={this.state.metrics[1]} size='medium' />
                </div>
              </div>
            </div>
          </div>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-6'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner bottom'>
                  <Metric name={this.state.metrics[2]} size='medium' />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner last bottom'>
                  <Metric name={this.state.metrics[3]} size='medium' />
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
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner'>
                  <Metric name={this.state.metrics[0]} size='small' />
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner' style={{ marginLeft: 0 }}>
                  <Metric name={this.state.metrics[1]} size='small' />
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner last'>
                  <Metric name={this.state.metrics[2]} size='small' />
                </div>
              </div>
            </div>
          </div>
          <div className='row' style={{ height: '50%' }}>
            <div className='col-4'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner bottom'>
                  <Metric name={this.state.metrics[3]} size='small' />
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner bottom' style={{ marginLeft: 0 }}>
                  <Metric name={this.state.metrics[4]} size='small' />
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='block' style={{ overflow: 'hidden' }}>
                <div className='block-inner last bottom'>
                  <Metric name={this.state.metrics[5]} size='small' />
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
