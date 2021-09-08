import React, { Component } from 'react'

class Workflow extends Component {
  // First
  constructor() {
    super()
    this.state = {
      pageTitle: 'workflow',
    }
    console.log('constructor')
  }

  // Second
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    if (props.value !== state.value) {
      return {
        value: props.value,
      }
    }
    return null
  }

  // Fourth
  componentDidMount() {
    console.log('componentDidMount')
  }

  // Fith (after update)
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  // Seventh (after update)
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
    return true
  }

  // Eighth (after update)
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  // Last
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = () => {
    console.log('button clicked')
    this.setState({ pageTitle: 'Workflow' })
  }

  handleKeyUp = (e) => {
    this.setState({ inputDetails: e.target.value })
  }

  // Third
  // Sixth (after update)
  render() {
    console.log('render')

    return (
      <div>
        <h1>Workflow</h1>

        <input type="text" onKeyUp={(e) => this.handleKeyUp(e)} />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

export default Workflow
