import React, { Component } from 'react'
import { Nav, NavItem, ProgressBar } from 'react-bootstrap'
import S from 'shorti'
import _ from 'lodash'
export default class Results extends Component {
  render() {
    const data = this.props.data
    const options = data.poll.metafields
    const votes = data.votes
    const total_votes = votes.length
    return (
      <div style={ S('font-16') }>
        <Nav bsStyle="pills" style={ S('mb-20') }>
          <NavItem onClick={ this.props.goHome } title="Home"><span className="fa fa-home"></span>&nbsp;&nbsp;Polls Home</NavItem>
          <NavItem onClick={ this.props.hideResults } title="Back to poll"><span className="fa fa-arrow-left"></span>&nbsp;&nbsp;Back to poll</NavItem>
        </Nav>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              { data.poll ? data.poll.title : '' }
            </h3>
          </div>
          <div className="panel-body">
            <div style={ S('mb-20') }>Total votes: { total_votes }</div>
            {
              options.map((option, i) => {
                const option_votes = votes.filter(vote => {
                  return _.find(vote.metafields, { value: option.title })
                })
                const percent = Math.floor(100 * (option_votes.length / total_votes))
                return (
                  <div key={ 'option-' + i }>
                    { option.value }
                    <ProgressBar style={ S('w-50p') } label={`${ percent }%`} now={ percent } />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}