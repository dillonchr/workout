import React, { Component } from 'react';
import ExercisePlan from './exercise-plan';
import Exercise from './exercise';

export default class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {warmupsToGo: this.getWarmupsCount()};
    }

    componentWillMount() {
        if (this.props.dayChange) {
            this.props.dayChange
                .subscribe(d => this.onDayChange(d));
        }
    }

    onDayChange(day) {
        const warmups = this.getWarmupsCount(day);
        this.setState({
            day: day,
            warmupsToGo: warmups
        });
    }

    getExerciseManifesto(day) {
        if (!day) {
            if (this.state && this.state.day) {
                day = this.state.day;
            } else {
                const d = new Date().getDay();
                if (d >= 5) {
                    day = 'friday';
                } else if (d >= 3) {
                    day = 'wednesday';
                } else {
                    day = 'monday';
                }
            }
        }
        return ExercisePlan.days[day];
    }

    getExercisesForDay(day) {
        return this.getExerciseManifesto(day)
            .map(x => Object.assign({name: x}, ExercisePlan.exercises[x]));
    }

    getWarmupsForDay(day) {
        return this.getExercisesForDay(day)
            .filter(x => x.warmups);
    }

    getWarmupsCount(day) {
        return this.getWarmupsForDay(day)
            .reduce((sum, x) => sum + x.warmups.length, 0);
    }

    onComplete() {
        this.setState({
            warmupsToGo: this.state.warmupsToGo - 1
        });
    }

    getCurrentSets() {
        if (this.state.warmupsToGo > 0) {
            return this.getWarmupsForDay();
        }
        return this.getExercisesForDay();
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const workouts = this.getCurrentSets()
            .map(w => {
                return (
                    <Exercise key={w.name}
                              exercise={w}
                              warmups={this.state.warmupsToGo > 0}
                              onComplete={this.onComplete.bind(this)} />
                );
            });
        return (
            <div className="workout">
                { workouts }
            </div>
        );
    }
}