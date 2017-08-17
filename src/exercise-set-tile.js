import React, { Component } from 'react';
import './exercise-set-tile.css';

export default class ExerciseSetTile extends Component {
    state = {done: false};

    getPlates() {
        return this.props.set ? this.props.set : '---';
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