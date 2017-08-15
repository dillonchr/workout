import React, { Component } from 'react';
import ExercisePlan from './exercise-plan';
import Exercise from './exercise';

export default class Workout extends Component {
    constructor(props) {
        super(props);
        this.state = {warmupsToGo: this.getWarmupsCount()};
    }

    getExerciseManifesto() {
        const day = new Date().getDay();
        if (day >= 5) {
            return ExercisePlan.days.friday;
        }
        if (day >= 3) {
            return ExercisePlan.days.wednesday;
        }
        return ExercisePlan.days.monday;
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