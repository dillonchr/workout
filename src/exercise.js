import React, {Component } from 'react';
import ExerciseSetTile from './exercise-set-tile';
import './exercise.css';

export default class Exercise extends Component {
    getTitle() {
        return this.props.exercise.name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, s => s.toUpperCase());
    }

    onExerciseSetComplete() {
        if (this.props.warmups && this.props.onComplete) {
            this.props.onComplete();
        }
    }

    getWarmupArrayFor(n) {
        return new Array(n).fill(this.props.exercise)
                .map((x, i) => {
                    if (i < 2) {
                        return x.base;
                    }
                    if (i === 2) {
                        return x.base + ((x.set - x.base) >> 1);
                    }
                    return x.set;
                });
    }

    getWarmupsForExercise() {
        if (this.props.exercise.name === 'deadlifts') {
            return [this.props.exercise.base];
        } else if (this.props.exercise.name === 'benchPress') {
            return this.getWarmupArrayFor(6);
        } else {
            return this.getWarmupArrayFor(3);
        }
    }

    getSetsForExercise() {
        if (this.props.exercise.name === 'benchPress') {
            return [];
        }
        return new Array(3).fill(this.props.exercise.set);
    }

    getTiles() {
        const list = this.props.warmups ? this.getWarmupsForExercise() : this.getSetsForExercise();
        return list
            .map((s, i) => {
                return (
                    <ExerciseSetTile 
                        set={s}
                        index={i}
                        key={(this.props.warmups ? 'w' : 's') + i}
                        name={this.props.exercise.name}
                        onComplete={this.onExerciseSetComplete.bind(this)} />
                );
            });
    }

    render() {
        return (
            <div className="exercise">
                <p className="exercise__title">{this.getTitle()}</p>
                <div className="exercise__tiles">{this.getTiles()}</div>
            </div>
        );
    }
}
