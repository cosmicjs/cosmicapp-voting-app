import React, { Component } from 'react'
import { observer } from 'mobx-react'
import AppState from './AppState'
const data = new AppState()
export default class App extends Component {
  render() {
    const Routes = React.cloneElement(this.props.children, { data })
    return Routes
  }
}
