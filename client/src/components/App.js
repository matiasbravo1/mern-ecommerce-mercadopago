import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './Navbar';

class App extends Component {

  render(){
    return (
      <div>
        <Navbar />
        <div style={{ height: '1000px', backgroundColor: 'orange'}}>
        <h2>blablabla</h2>
        <h2>blablabla</h2>
        <h2>blablabla</h2>
        </div>
      </div>
    );
  }
}

export default App;
