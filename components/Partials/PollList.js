import React, { Component } from 'react'
import S from 'shorti'
export default class PollList extends Component {
  handlePollClick(slug) {
    window.location.href = '/' + slug
  }
  render() {
    const data = this.props.data
    return (
      <div style={ S('font-16') }>
        <h2 style={ S('mt-0') }>Polls Home</h2>
        <ul className="list-group">
          {
            data.polls.map((poll, i) => {
              return (
                <li onClick={ this.handlePollClick.bind(this, poll.slug) } style={ S('p-30 pointer') } className="list-group-item" key={ `poll-${i}` }>
                  <a href={ poll.slug }>{ poll.title }</a>
                  <div style={ S('pull-right') }>Total votes: { poll.num_votes }</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}