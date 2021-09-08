import Navigation from './components/navigation'
import PageContent from './components/page-content'

import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <PageContent />
      </div>
    )
  }
}

export default App
