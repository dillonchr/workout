import React, { Component } from 'react';
import ExercisePlan from './exercise-plan';
import UserSettings from './user-settings';
import './exercise-plan-editor.css';

export default class ExercisePlanEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets: Object.keys(ExercisePlan.exercises)
                .map(k => ({
                    key: k,
                    displayName: k.replace(/([A-Z])/g, ' $1')
                        .replace(/^./, s => s.toUpperCase()),
                    weight: UserSettings.getExerciseWeight(k)
                })),
            bar: UserSettings.barWeight,
            plates: Object.keys(UserSettings.availablePlates)
                .map(k => ({
                    weight: k,
                    count: UserSettings.availablePlates[k]
                }))
        };
    }

    updateWeight(key, value) {
        const copy = Array.from(this.state.sets);
        copy.find(o => o.key === key).weight = value;
        this.setState({
            sets: copy
        }, () => UserSettings.save(key, value));
    }

    getInput(key, weight, displayName, onChange, step = 5) {
        return (
            <div className="plan-editor__field" key={key}>
                 <label htmlFor={key}
                        className="plan-editor__label">{displayName}</label>
                 <input type="number"
                        className="plan-editor__input"
                        id={key}
                        value={weight}
                        onChange={onChange}
                        step={step}
                        min="0" />
            </div>
        );
    }

    getSectionHeading(name) {
        return <p className="plan-editor__heading">{name}</p>;
    }

    getSets() {
        return this.state.sets
            .map(s => this.getInput(s.key, s.weight, s.displayName, i => this.updateWeight(s.key, +i.currentTarget.value)));
    }

    updatePlateCount(weight, count) {
        const copy = Array.from(this.state.plates);
        copy.find(p => p.weight === weight).count = count;
        this.setState({plates: copy}, () => UserSettings.updatePlateCount(weight, count));
    }

    getAvailablePlates() {
        return this.state.plates
            .map(p => this.getInput(p.weight, p.count, p.weight, i => this.updatePlateCount(p.weight, +i.currentTarget.value), 1));
    }

    updateBar(weight) {
        this.setState({bar: weight}, () => UserSettings.barWeight = weight);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="plan-editor">
                <div className="plan-editor__section plan-editor__section--single-input">
                    {this.getSectionHeading('Bar')}
                    {this.getInput('bar', this.state.bar, '', i => this.updateBar(+i.currentTarget.value))}
                </div>
                <div className="plan-editor__section">
                    {this.getSectionHeading('Plates')}
                    {this.getAvailablePlates()}
                </div>
                <div className="plan-editor__section">
                    {this.getSectionHeading('Exercise Sets')}
                    {this.getSets()}
                </div>
            </div>
        );
    }
}