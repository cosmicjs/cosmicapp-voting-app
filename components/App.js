import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Input, Button } from 'react-bootstrap'
import config from '../config'
import slug from 'slug'
import S from 'shorti'
import DevTools from 'mobx-react-devtools'
// Partials
import PollList from './Partials/PollList'
import SinglePoll from './Partials/SinglePoll'
import Results from './Partials/Results'

@observer
export default class App extends Component {
  handleOptionClick(value, e) {
    if (this.props.data.vote_counted) {
      e.stopPropagation()
      return false
    }
    this.props.data.option_selected = value
  }
  handleSubmitVote(e) {
    const data = this.props.data
    if (!data.option_selected)
      return
    if (data.vote_counted)
      return
    const title = 'Q: ' + data.poll.title + ' A: ' + this.props.data.option_selected
    const vote = {
      slug: slug(title),
      type_slug: 'votes',
      title,
      metafields: [
        {
          title: 'Poll ID',
          key: 'poll_id',
          value: this.props.data.poll._id
        },
        {
          title: 'Vote',
          key: 'vote',
          value: this.props.data.option_selected
        }
      ],
      options: {
        slug: 0,
        content: 0
      }
    }
    this.props.data.vote(vote)
  }
  goHome() {
    window.location.href = '/'
  }
  showResults() {
    this.props.data.showResults()
  }
  hideResults(e) {
    e.preventDefault()
    this.props.data.show_results = false
  }
  render() {
    const data = this.props.data
    let results_area
    if (data.show_results) {
      results_area = (
        <div style={ S('text-center font-30 mt-80 mb-80') }>Results</div>
      )
    }
    let dev_tools
    if (config.env !== 'production')
      dev_tools = <DevTools />
    let options_area
    let main_area
    if (data.polls) {
      main_area = (
        <PollList
          data={ data }
        />
      )
    }
    if (data.poll) {
      main_area = (
        <SinglePoll
          data={ data }
          handleSubmitVote={ this.handleSubmitVote.bind(this) }
          showResults={ this.showResults.bind(this) }
          handleOptionClick={ this.handleOptionClick.bind(this) }
          goHome={ this.goHome }
        />
      )
    }
    if (data.show_results) {
      main_area = (
        <Results
          data={ data }
          hideResults={ this.hideResults.bind(this) }
          goHome={ this.goHome }
        />
      )
    }
    return (
      <div style={ S('p-20 pt-0 font-16') }>
        <h1 style={ S('pull-left mb-0 w-50p') }>Voting App</h1>
        <div style={ S('pull-right w-300 text-right') }>
          <div style={ S('mt-10') }>
            Share:
            &nbsp;&nbsp;
            <a style={ { textDecoration: 'none' } } href={ `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}` } target="_blank">
              <i className="fa fa-facebook"></i>
              &nbsp;&nbsp;Facebook
            </a>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <a style={ { textDecoration: 'none' } } href={ `http://twitter.com/share?text=Check out this voting app powered by @cosmic_js&url=${window.location.href}&hashtags=cosmicjs` } target="_blank">
              <i className="fa fa-twitter"></i>
              &nbsp;&nbsp;Twitter
            </a>
          </div>
          <div style={ S('mb-20') }>
            Fork:&nbsp;&nbsp;<iframe style={ S('border-none relative t-13') } frameBorder="0" src="https://ghbtns.com/github-btn.html?user=cosmicjs&repo=cosmicapp-voting-app&type=star&count=true" scrolling="0" width="100px" height="30px"></iframe>
          </div>
        </div>
        <div className="clearfix"></div>
        <div style={ S('pull-right') }>
          <a style={ { textDecoration: 'none' } } href="https://cosmicjs.com" target="_blank">
            <img style={ S('mr-10') } className="pull-left" src="https://cosmicjs.com/images/logo.svg" width="28" height="28" />
            <span style={ S('color-666 t-3 relative') }>Proudly powered by Cosmic JS</span>
          </a>
        </div>
        { main_area }
        { dev_tools }
        <div>
          Create your own poll at <a href="https://cosmicjs.com" target="_blank">Cosmic JS <i className="fa fa-external-link"></i></a>
        </div>
        <div style={ S('h-100') }></div>
      </div>
    )
  }
}
