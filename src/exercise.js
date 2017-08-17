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

    getTiles() {
        const listName = this.props.warmups ? 'warmups' : 'sets';
        return this.props.exercise[listName]
            .map((s, i) => {
                return (
                    <ExerciseSetTile 
                        set={s}
                        index={i}
                        key={listName + i}
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
