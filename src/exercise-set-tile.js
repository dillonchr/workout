import React, { Component } from 'react';
import UserSettings from './user-settings';
import './exercise-set-tile.css';

export default class ExerciseSetTile extends Component {
    state = {done: false};

    getPlates() {
        const weight = this.props.set >= 0 ? this.props.set : UserSettings.getExerciseWeight(this.props.name);
        if (weight > 0) {
            const plates = [];
            const bar = UserSettings.barWeight;
            const platesWeight = Math.max(weight - bar, 0);

            if (platesWeight > 0) {
                const availablePlates = Object.assign({}, UserSettings.availablePlates);
                const findNextPlate = w => Object.keys(availablePlates)
                        .filter(k => availablePlates[k] > 0)
                        .sort((a, b) => b - a)
                        .find(k => k <= w);
                let balance = platesWeight / 2;
                while (balance > 0) {
                    const plate = findNextPlate(balance);
                    if (plate) {
                        plates.push(plate);
                        balance -= plate;
                        availablePlates[plate]--;
                    } else {
                        balance = 0;
                    }
                }
            }

            return plates.join(' + ') || 'Bar';
        }
        return '---';
    }

    onClick() {
        this.props.onComplete();
        this.setState({done: true});
    }

    render() {
        const className = `exercise-set-tile ${this.state.done ? 'exercise-set-tile--done' : ''}`;
        return (
            <div className={className} onClick={this.onClick.bind(this)}>
                {this.getPlates()}
            </div>
        );
    }
}