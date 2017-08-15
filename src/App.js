import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Workout from './workout.component';

class App extends Component {
  getDayOfWeek() {
        const day = new Date().getDay();
        if (day >= 5) {
            return 'Friday';
        }
        if (day >= 3) {
            return 'Wednesday';
        }
        return 'Monday';
  }

  render() {
    return (
      <div>
        <AppBar
          title={ this.getDayOfWeek() }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Workout />
      </div>
    );
  }
}

export default App;
