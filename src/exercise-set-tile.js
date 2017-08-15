import React, { Component } from 'react';

export default class ExerciseSetTile extends Component {
    constructor(props) {
        super(props);
        this.state = {done: false};
    }

    getStyle(i) {
        const style = {
            background: this.state.done ? '#333' : '#fff',
            border: `solid 1px ${this.state.done ? '#333' : '#888'}`,
            color: this.state.done ? '#fff' : '#000',
            flex: 1,
            fontSize: '1.5em',
            marginLeft: '0.5em',
            marginRight: '0.5em',
            textAlign: 'center'
        };
        if (i === 0) {
            delete style.marginLeft;
        } else if (i === 2) {
            delete style.marginRight;
        }
        return style;
    }

    getPlates() {
        return this.props.set ? this.props.set : 'Bar';
    }

    onClick() {
        this.props.onComplete();
        this.setState({done: true});
    }

    render() {
        return (
            <div style={ this.getStyle(this.props.index) } onClick={ this.onClick.bind(this) }>
                { this.getPlates() }
            </div>
        );
    }
}