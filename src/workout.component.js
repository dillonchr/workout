import React, { Component } from 'react';
import ExercisePlan from './exercise-plan';
import Exercise from './exercise';

export default class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {warmupsToGo: this.getWarmupsCount()};
        this.forcedDay = this.props.day;
    }

    getExerciseManifesto() {
        let day;
        if (this.props.day) {
            day = this.props.day;
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
        return ExercisePlan.days[day];
    }

    getExercisesForDay() {
        return this.getExerciseManifesto()
            .map(exercise => Object.assign({name: exercise}, ExercisePlan.exercises[exercise]));
    }

    getWarmupsForDay() {
        return this.getExercisesForDay()
            .filter(x => x.warmups);
    }

    getWarmupsCount() {
        return this.getWarmupsForDay()
            .reduce((sum, x) => sum + x.warmups.length, 0);
    }

    onComplete() {
        if (this.props.day !== this.forcedDay) {
            this.forcedDay = this.props.day;
            this.setState({warmupsToGo: this.getWarmupsCount() - 1});
        } else {
            this.setState({
                warmupsToGo: this.state.warmupsToGo - 1
            });
        }
    }

    getCurrentSets() {
        if (this.state.warmupsToGo > 0) {
            return this.getWarmupsForDay();
        }
        return this.getExercisesForDay();
    }

    render() {
        const workouts = this.getCurrentSets()
            .map((w, i) => {
                return (
                    <Exercise key={i}
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