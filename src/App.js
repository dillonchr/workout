import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Workout from './workout.component';

class App extends Component {
    state = {open: false};

  getDayOfWeek() {
      if (this.state.day) {
          return this.state.day.slice(0, 1).toUpperCase() + this.state.day.slice(1);
      }
        const day = new Date().getDay();
        if (day >= 5) {
            return 'Friday';
        }
        if (day >= 3) {
            return 'Wednesday';
        }
        return 'Monday';
  }

  toggleDrawer() {
      this.setState({open: !this.state.open});
  }

  forceDay(day) {
      this.setState({
          open: false,
          day: day
      });
  }

  render() {
    return (
      <div>
        <AppBar 
          title={ this.getDayOfWeek() }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
        />
        <Drawer open={this.state.open}>
            <MenuItem onClick={this.forceDay.bind(this, 'monday')}>Monday</MenuItem>
            <MenuItem onClick={this.forceDay.bind(this, 'wednesday')}>Wednesday</MenuItem>
            <MenuItem onClick={this.forceDay.bind(this, 'friday')}>Friday</MenuItem>
        </Drawer>
        <Workout day={this.state.day} />
      </div>
    );
  }
}

export default App;
