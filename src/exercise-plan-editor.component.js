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
                    weight: UserSettings.get(k) || ExercisePlan.exercises[k].sets[0]
                }))
        }
    }

    updateWeight(key, value) {
        const copy = Array.from(this.state.sets);
        copy.find(o => o.key === key).weight = value;
        this.setState({
            sets: copy
        });
    }

    getSets() {
        return this.state.sets
            .map(s => {
                return <div className="plan-editor__field" key={s.key}>
                     <label htmlFor={s.key}
                            className="plan-editor__label">{s.displayName}</label>
                     <input type="number"
                            className="plan-editor__input"
                            id={s.key}
                            value={s.weight}
                            onChange={i => this.updateWeight(s.key, +i.currentTarget.value)}
                            step="5"
                            min="0" />
                </div>;
            });
    }

    render() {
        return (
            <div className="plan-editor">
                {this.getSets()}
            </div>
        );
    }
}