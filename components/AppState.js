import { observable, extendObservable } from 'mobx'
import { getObjects, getObject, addObject } from 'cosmicjs'
import _ from 'lodash'
import config from '../config'
export default class AppState {
  @observable polls = []
  @observable poll = {}
  @observable options_selected = []
  @observable is_saving = false
  @observable show_results = false
  @observable not_found = null
  removeVoteCount() {
    localStorage.removeItem(this.poll._id)
  }
  vote(object) {
    this.is_saving = true
    if (config.cosmicjs.bucket.write_key)
      object.write_key = config.cosmicjs.bucket.write_key
    addObject({ bucket: config.cosmicjs.bucket }, object, (err, res) => {
      // Set local storage
      window.localStorage.setItem(this.poll._id, _.find(this.options_selected, { poll: this.poll._id }).value)
      // Go to results page
      this.showResults()
    })
  }
  showResults() {
    getObjects({ bucket: config.cosmicjs.bucket }, (err, res) => {
      this.is_saving = false
      this.poll.vote_counted = true
      if (res.objects) {
        const votes = res.objects.type.votes
        this.votes = votes
        this.show_results = true
        // Redo totals
        let polls = res.objects.type.polls
        polls = this.getVoteTotals(polls, votes)
        const poll_index = _.findIndex(this.polls, { _id: this.poll._id })
        polls[poll_index].vote_counted = true
        this.polls = polls
      }
    })
  }
  getVoteTotals(polls, votes) {
    let num_votes_keyed
    if (votes) {
      num_votes_keyed = []
      votes.forEach(vote => {
        if (!num_votes_keyed[vote.metafields[0].value])
          num_votes_keyed[vote.metafields[0].value] = 0
        num_votes_keyed[vote.metafields[0].value] = num_votes_keyed[vote.metafields[0].value] + 1
      })
    }
    polls.forEach((poll, i) => {
      if (!num_votes_keyed)
        polls[i].num_votes = 0
      else 
        polls[i].num_votes = num_votes_keyed[poll._id]
    })
    return polls
  }
  constructor() {
    // Get all polls and votes
    getObjects({ bucket: config.cosmicjs.bucket }, (err, res) => {
      if (res.objects) {
        let polls = res.objects.type.polls
        const votes = res.objects.type.votes
        polls = this.getVoteTotals(polls, votes)
        // If already voted
        polls.forEach((poll, i) => {
          if (window.localStorage.getItem(polls[i]._id)) {
            this.options_selected.push({ poll: polls[i]._id, value: window.localStorage.getItem(polls[i]._id) })
            polls[i].vote_counted = true
          }
        })
        this.polls = polls
        this.votes = votes
        const slug = window.location.pathname.replace('/', '')
        if (slug) {
          const poll = _.find(res.objects.type.polls, { slug })
          if (!poll) {
            console.log('not found')
            this.not_found = true
            return
          }
          this.poll = poll
        }
        // Remove vote for testing
        // this.removeVoteCount()
      }
    })
  }
}
