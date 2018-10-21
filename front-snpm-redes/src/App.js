import React, { Component } from 'react';
import './App.css';
import WorkArea from '../src/components/workArea';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <WorkArea/>

        </header>
      </div>
    );
  }
}

export default App;
