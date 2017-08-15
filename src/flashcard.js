import React, { Component } from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export default class FlashCard extends Component {
    render() {
        const style = {margin: '1em'};
        const paperStyle = {
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };
        const scripturaStilo = {
            margin: '1em'
        };

        return (
            <div className="flashcard">
                <Paper style={paperStyle} zDepth={1}>
                    <p style={scripturaStilo}>These words that I am commanding you today must be on your heart,</p>
                </Paper>
                <RaisedButton label="Deuteronomy 6:6" fullWidth={true} style={style} />
                <RaisedButton label="Deuteronomy 6:6" fullWidth={true} style={style} />
                <RaisedButton label="Deuteronomy 6:6" fullWidth={true} style={style} />
                <RaisedButton label="Deuteronomy 6:6" fullWidth={true} style={style} />
            </div>
        );
    }
}