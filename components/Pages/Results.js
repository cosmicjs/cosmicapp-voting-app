import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Nav, NavItem, ProgressBar } from 'react-bootstrap'
import S from 'shorti'
import _ from 'lodash'

@observer
export default class Results extends Component {
  render() {
    const data = this.props.data
    const options = data.poll.metafields
    let votes = data.votes
    votes = votes.filter(vote => {
      return vote.metafield.poll_id.value === data.poll._id
    })
    const total_votes = votes.length
    return (
      <div style={ S('font-16') }>
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