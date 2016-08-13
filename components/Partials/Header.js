import React, { Component } from 'react'
import S from 'shorti'
export default class Header extends Component {
  render() {
    return (
      <div>
        <h1 style={ S('pull-left mb-0 w-50p') }>Voting App</h1>
        <div style={ S('pull-right w-50p text-right mt-20') }>
          <div style={ S('mb-10') }>
            <a className="btn btn-default" style={ { textDecoration: 'none' } } href={ `https://github.com/cosmicjs/cosmicapp-voting-app` } target="_blank">
              <i className="fa fa-github text-primary"></i>
              &nbsp;&nbsp;View Code on GitHub
            </a>
            &nbsp;&nbsp;
            <a className="btn btn-default" style={ { textDecoration: 'none' } } href={ `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}` } target="_blank">
              <i className="fa fa-facebook text-primary"></i>
              &nbsp;&nbsp;Share on Facebook
            </a>
            &nbsp;&nbsp;
            <a className="btn btn-default" style={ { textDecoration: 'none' } } href={ `http://twitter.com/share?text=Check out this voting app powered by @cosmic_js&url=${window.location.href}&hashtags=cosmicjs` } target="_blank">
              <i className="fa fa-twitter text-primary"></i>
              &nbsp;&nbsp;Share on Twitter
            </a>
          </div>
        </div>
        <div className="clearfix"></div>
        <div style={ S('pull-right mb-15') }>
          <a style={ { textDecoration: 'none' } } href="https://cosmicjs.com" target="_blank">
            <img style={ S('mr-10') } className="pull-left" src="https://cosmicjs.com/images/logo.svg" width="28" height="28" />
            <span style={ S('color-666 t-3 relative') }>Proudly powered by Cosmic JS</span>
          </a>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}