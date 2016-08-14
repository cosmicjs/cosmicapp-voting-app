import React, { Component } from 'react'
import S from 'shorti'
export default class Footer extends Component {
  render() {
    return (
      <div>
        <div>
          To create your own polls:
        </div>
        <div>1. Sign up free at <a href="https://cosmicjs.com" target="_blank">Cosmic JS</a></div>
        <div>2. After sign up, install this Voting App</div>
        <div>3. Add / edit your own polls</div>
        <div>4. Deploy your voting app to the web</div>
        <div style={ S('h-100') }></div>
      </div>
    )
  }
}