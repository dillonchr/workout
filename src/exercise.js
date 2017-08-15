import React, {Component } from 'react';
import ExerciseSetTile from './exercise-set-tile';

export default class Exercise extends Component {
    getTitle() {
        return this.props.exercise.name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, s => s.toUpperCase());
    }

    getTiles() {
        const listName = this.props.warmups ? 'warmups' : 'sets';
        return this.props.exercise[listName]
            .map((s, i) => {
                return (
                    <ExerciseSetTile set={ s }
                                     index={ i }
                                     key={ listName + i }
                                     onComplete={ this.props.warmups ? this.props.onComplete : () => {} } />
                );
            });
    }

    render() {
        return (
            <div style={ styles.container }>
                <p style={styles.title}>{ this.getTitle() }</p>
                <div style={ styles.tileContainer }>
                    { this.getTiles() }
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        padding: '1em'
    },
    title: {
        fontSize: '1.5em',
        fontWeight: 'bold'
    },
    tileContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};