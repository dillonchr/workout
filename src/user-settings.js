import ExercisePlan from './exercise-plan';

export default class UserSettings {
    static get(key) {
        return window.localStorage.getItem(key);
    }

    static get barWeight() {
        return this.get('bar') || 45;
    }

    static set barWeight(w) {
        return this.save('bar', w);
    }

    static get availablePlates() {
        const storedPlates = this.get('weights');
        if (storedPlates) {
            return JSON.parse(storedPlates);
        }

        return {
            45: 2,
            25: 2,
            10: 2,
            5: 2,
            '2.5': 1
        };
    }

    static updatePlateCount(plate, count) {
        return window.localStorage.setItem('weights', JSON.stringify(Object.assign({}, UserSettings.availablePlates, {[plate]: count})));
    }

    static getExerciseWeight(key) {
        return UserSettings.get(key) || ExercisePlan.exercises[key].set || 0;
    }

    static save(key, value) {
        return window.localStorage.setItem(key, value);
    }   
}
