import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import S from 'shorti'
import _ from 'lodash'
import { observer } from 'mobx-react'
import Results from '../Partials/Results'
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'
import slug from 'slug'

@observer
export default class SinglePoll extends Component {
  handleOptionClick(value, e) {
    const data = this.props.data
    if (data.poll.vote_counted) {
      e.stopPropagation()
      return false
    }
    data.options_selected = data.options_selected.filter(option => {
      return option.poll !== data.poll._id
    })
    data.options_selected.push({
      poll: data.poll._id,
      value
    })
  }
  handleSubmitVote(e) {
    const data = this.props.data
    const option_value = _.find(data.options_selected, { poll: data.poll._id }).value
    if (!option_value)
      return
    if (data.poll.vote_counted)
      return
    const title = 'Q: ' + data.poll.title + ' A: ' + option_value
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
          value: option_value
        }
      ],
      options: {
        slug: 0,
        content: 0
      }
    }
    this.props.data.vote(vote)
  }
  showResults() {
    this.props.data.show_results = true
  }
  hideResults() {
    this.props.data.show_results = false
  }
  render() {
    const data = this.props.data
    const option_selected = _.find(data.options_selected, { poll: data.poll._id })
    let option_selected_value
    if (option_selected)
      option_selected_value = option_selected.value
    if (data.not_found && !data.poll._id) {
      return (
        <div style={ S('p-20 pt-0 font-16') }>
          <Header data={data}/>
            <Nav bsStyle="pills" style={ S('mb-20') }>
              <LinkContainer to="/">
                <NavItem title="Home">
                  <span className="fa fa-home"></span>&nbsp;&nbsp;Polls Home
                </NavItem>
              </LinkContainer>
            </Nav>
            <h2 style={ S('p-20 text-center font-16') }>Poll not found</h2>
          <Footer data={data}/>
        </div>
      )
    }
    if (!data.poll._id) {
      return (
        <div className="loading">
          <img src="https://cosmicjs.com/images/logo.svg" width="28" height="28" />
        </div>
      )
    }
    const options_area = data.poll.metafields.map((poll_option, i) => {
      let checked = false
      if (option_selected_value === poll_option.value)
        checked = true
      let option_image
      let has_image = false
      if (poll_option.children && poll_option.children[0].value) {
        has_image = true
        option_image = (
          <div style={ S(`absolute l-0 t-0 bg-url(https://cosmicjs.imgix.net/${poll_option.children[0].value}?w=240) bg-cover bg-center w-104 h-104 pull-left mr-20`) }/>
        )
      }
      return (
        <li style={ { ...S('p-30 pointer relative'), overflow: 'hidden' } } onClick={ this.handleOptionClick.bind(this, poll_option.value) } className="list-group-item" key={ `option-${i}` }>
          { option_image }
          <div className="radio pull-left">
            <label style={ S(`w-100p${has_image ? ' pl-150' : ''}`) }>
              <input className="disabled" onChange={ this.handleOptionClick.bind(this, poll_option.value) } checked={ checked } type="radio" name="optionsRadios" value={ poll_option.value }/>
              &nbsp;&nbsp;&nbsp;{ poll_option.value }
            </label>
          </div>
          <div className="clearfix"></div>
        </li>
      )
    })
    let view_results_button = (
      <a href="#">You can view results after you vote</a>
    )
    if (data.poll.vote_counted) {
      view_results_button = (
        <a href="#" onClick={ this.showResults.bind(this) }>View Results</a>
      )
    }
    let vote_button = (
      <button type="button" className={ `btn btn-primary${ data.is_saving ? ' disabled' : '' }` } onClick={ this.handleSubmitVote.bind(this) }>
       { data.is_saving ? 'Submitting vote...' : 'Submit Vote' }
      </button>
    )
    if (data.poll.vote_counted) {
      vote_button = (
        <button type="button" className="btn btn-success">
          Thank you for voting!&nbsp;&nbsp;<span className="glyphicon glyphicon-ok"></span>
        </button>
      ) 
    }
    let main_area = (
      <div style={ S('font-16') }>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              { data.poll ? data.poll.title : '' }
            </h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              { options_area }
            </ul>
          </div>
          <div className="panel-footer">
           { vote_button }
            &nbsp;&nbsp;&nbsp;&nbsp;
            { view_results_button }
          </div>
        </div>
      </div>
    )
    let nav_area = (
      <Nav bsStyle="pills" style={ S('mb-20') }>
        <LinkContainer to="/">
          <NavItem title="Home">
            <span className="fa fa-home"></span>&nbsp;&nbsp;Polls Home
          </NavItem>
        </LinkContainer>
      </Nav>
    )
    if (data.show_results) {
      main_area = (
        <Results
          data={ data }
        />
      )
      nav_area = (
        <Nav bsStyle="pills" style={ S('mb-20') }>
          <LinkContainer to="/">
            <NavItem title="Home">
              <span className="fa fa-home"></span>&nbsp;&nbsp;Polls Home
            </NavItem>
          </LinkContainer>
          <NavItem onClick={ this.hideResults.bind(this) } title="Back to poll">
            <span className="fa fa-arrow-left"></span>&nbsp;&nbsp;Back to poll
          </NavItem>
        </Nav>
      )
    }
    return (
      <div className="container">
        <Header data={data}/>
          { nav_area }
          { main_area }
        <Footer data={data}/>
      </div>
    )
  }
}