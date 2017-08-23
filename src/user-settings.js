export default class UserSettings {
    static get(key) {
        return window.localStorage.getItem(key);
    }

    static get barWeight() {
        return this.get('bar') || 45;
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
}
