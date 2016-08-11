import { observable } from 'mobx'
import { getObjects, getObject, addObject } from 'cosmicjs'
import _ from 'lodash'
import config from '../config'
export default class AppState {
  @observable polls = null
  @observable poll = null
  @observable option_selected = ''
  @observable is_saving = false
  @observable vote_counted = false
  @observable show_results = false
  vote(object) {
    this.is_saving = true
    if (config.cosmicjs.bucket.write_key)
      object.write_key = config.cosmicjs.bucket.write_key
    addObject({ bucket: config.cosmicjs.bucket }, object, (err, res) => {
      // Set local storage
      window.localStorage.setItem(this.poll._id, this.option_selected)
      // Go to results page
      getObjects({ bucket: config.cosmicjs.bucket }, (err, res) => {
        this.is_saving = false
        this.vote_counted = true
        if (res.objects) {
          this.votes = res.objects.type.votes.filter(vote => {
            return vote.metafield.poll_id.value === this.poll._id
          })
          this.show_results = true
        }
      })
    })
  }
  showResults() {
    getObjects({ bucket: config.cosmicjs.bucket }, (err, res) => {
      if (res.objects) {
        this.votes = res.objects.type.votes.filter(vote => {
          return vote.metafield.poll_id.value === this.poll._id
        })
        this.show_results = true
      }
    })
  }
  constructor() {
    getObjects({ bucket: config.cosmicjs.bucket }, (err, res) => {
      if (res.objects) {
        const polls = res.objects.type.polls
        const votes = res.objects.type.votes
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
        this.polls = polls
      }
    })
    if (window.location.pathname.replace('/', '')) {
      getObject({ bucket: config.cosmicjs.bucket }, { slug: window.location.pathname.replace('/', '') }, (err, res) => {
        if (res.object) {
          this.poll = res.object
          // Remove vote for testing
          // localStorage.removeItem(this.poll._id)
          // If already voted
          if (window.localStorage.getItem(this.poll._id)) {
            this.option_selected = window.localStorage.getItem(this.poll._id)
            this.vote_counted = true
          }
        }
      })
    }
  }
}
