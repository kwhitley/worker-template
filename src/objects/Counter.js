import { createDurable } from 'itty-durable'

export class Counter extends createDurable({ autoReturn: true, autoPersist: true }) {
  constructor(state, env) {
    super(state, env)

    this.counter = 0
  }

  // updates self with a new round of history
  increment() {
    this.counter++
  }

  // temporary method to clean format
  reset() {
    this.counter = 0
  }

  // customize the shape of the return
  toJSON() {
    return {
      id: this.state.idFromState,
      counter: this.counter,
    }
  }
}
