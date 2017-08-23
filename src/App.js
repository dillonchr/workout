import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Workout from './workout.component';
import { Subject } from 'rxjs';
import ExercisePlanEditor from './exercise-plan-editor.component';

class App extends Component {
    dayChange$ = new Subject();
    state = {
        open: false,
        showPlanEditor: false
    };

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
            day: day,
            open: false
        });
        this.dayChange$.next(day);
    }

    showPlanEditor() {
        this.setState({
            open: false,
            showPlanEditor: true
        });
    }

    savePlan() {
        this.setState({
            open: false,
            showPlanEditor: false
        });
    }

    render() {
        let editPlanMenuButton;
        if (this.state.showPlanEditor) {
            editPlanMenuButton = <MenuItem onClick={this.savePlan.bind(this)}>Save Plan</MenuItem>;
        } else {
            editPlanMenuButton = <MenuItem onClick={this.showPlanEditor.bind(this)}>Edit Plan</MenuItem>;
        }

        return (
            <div>
                <AppBar 
                        title={this.getDayOfWeek()}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)}
                />
                <Drawer open={this.state.open}>
                    <MenuItem onClick={this.forceDay.bind(this, 'monday')}>Monday</MenuItem>
                    <MenuItem onClick={this.forceDay.bind(this, 'wednesday')}>Wednesday</MenuItem>
                    <MenuItem onClick={this.forceDay.bind(this, 'friday')}>Friday</MenuItem>
                    {editPlanMenuButton}
                </Drawer>
                <ExercisePlanEditor show={this.state.showPlanEditor} />
                <Workout show={!this.state.showPlanEditor} dayChange={this.dayChange$.asObservable()} />
            </div>
        );
    }
}

export default App;
