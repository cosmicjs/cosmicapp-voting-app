import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import S from 'shorti'
import Header from '../Partials/Header'
import Footer from '../Partials/Footer'

@observer
export default class PollList extends Component {
  componentDidMount() {
    this.props.data.show_results = false
  }
  handlePollClick(poll) {
    this.props.data.poll = poll
    this.props.history.push('/' + poll.slug)
  }
  render() {
    const data = this.props.data
    let list_area
    if (data && data.polls) {
      list_area = (
        <ul className="list-group">
          {
            data.polls.map((poll, i) => {
              return (
                <li onClick={ this.handlePollClick.bind(this, poll) } style={ S('p-30 pointer') } className="list-group-item text-primary" key={ `poll-${i}` }>
                  <i className="fa fa-pencil-square-o text-primary" aria-hidden="true"></i>
                  &nbsp;&nbsp;&nbsp;
                  { poll.title }
                  <div style={ S('pull-right') }>Total votes: { poll.num_votes }</div>
                </li>
              )
            })
          }
        </ul>
      )
    }
    return (
      <div className="container">
        <Header data={data}/>
        <div style={ S('font-16') }>
          { list_area }
        </div>
        <Footer data={data}/>
      </div>
    )
  }
}