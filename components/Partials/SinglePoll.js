import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import S from 'shorti'
import { observer } from 'mobx-react'
@observer
export default class SinglePoll extends Component {
  render() {
    const data = this.props.data
    const options_area = data.poll.metafields.map((poll_option, i) => {
      let checked = false
      if (data.option_selected === poll_option.value)
        checked = true
      let option_image
      let has_image = false
      if (poll_option.children && poll_option.children[0].value) {
        has_image = true
        option_image = (
          <div style={ S(`absolute l-0 t-0 bg-url(https://cosmicjs.imgix.net/${poll_option.children[0].value}?w=240) bg-cover bg-center w-120 h-120 pull-left mr-20`) }/>
        )
      }
      return (
        <li style={ { ...S('p-30 pointer relative'), overflow: 'hidden' } } onClick={ this.props.handleOptionClick.bind(this, poll_option.value) } className="list-group-item" key={ `option-${i}` }>
          { option_image }
          <div className="radio pull-left">
            <label style={ S(`w-100p${has_image ? ' pl-150' : ''}`) }>
              <input className="disabled" onChange={ this.props.handleOptionClick.bind(this, poll_option.value) } checked={ checked } type="radio" name="optionsRadios" value={ poll_option.value }/>
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
    if (data.vote_counted) {
      view_results_button = (
        <a href="#" onClick={ this.props.showResults.bind(this) }>View Results</a>
      )
    }
    let vote_button = (
      <button type="button" className={ `btn btn-primary${ data.is_saving ? ' disabled' : '' }` } onClick={ this.props.handleSubmitVote.bind(this) }>
       { data.is_saving ? 'Submitting vote...' : 'Submit Vote' }
      </button>
    )
    if (data.vote_counted) {
      vote_button = (
        <button type="button" className="btn btn-success">
          Thank you for voting!&nbsp;&nbsp;<span className="glyphicon glyphicon-ok"></span>
        </button>
      ) 
    }
    return (
      <div style={ S('font-16') }>
        <Nav bsStyle="pills" style={ S('mb-20') }>
          <NavItem onClick={ this.props.goHome } title="Home">
            <span className="fa fa-home"></span>&nbsp;&nbsp;Polls Home
          </NavItem>
        </Nav>
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
  }
}