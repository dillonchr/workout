const ExercisePlan = {
    "days": {
        "monday": [
            "squat",
            "calfRaise",
            "overheadPress",
            "skullCrusher",
            "crunch",
            "powerClean"
        ],
        "wednesday": [
            "deadlifts",
            "lunges",
            "benchPress",
            "pushup",
            "ankleTouch",
            "squatJump"
        ],
        "friday": [
            "squat",
            "goodMorning",
            "pendlay",
            "curling",
            "sidePlank",
            "burpees"
        ]
    },
    "exercises": {
        "squat": {
            "warmups": [0,0,25],
            "sets": ["45 + 2.5","45 + 2.5","45 + 2.5"]
        },
        "calfRaise": {
            "sets":[10,10,10]
        },
        "overheadPress": {
            "warmups": [0,0,20],
            "sets": [5,5,5]
        },
        "skullCrusher": {
            "sets": [45,45,45]
        },
        "crunch": {
            "sets": [0,0,0]
        },
        "powerClean": {
            "warmups": [5,5,25],
            "sets": [25,25,25]
        },
        "deadlifts": {
            "warmups": [45],
            "sets": [45,"45 + 10","45 + 25"]
        },
        "lunges": {
            "sets": [0,0,0]
        },
        "benchPress": {
            "warmups": [0,10,20],
            "sets": [20,20,20]
        },
        "pushup": {
            "sets": [0,0,0]
        },
        "ankleTouch": {
            "sets": [0,0,0]
        },
        "squatJump": {
            "sets": [0,0,0]
        },
        "goodMorning": {
            "sets": [10,10,10]
        },
        "pendlay": {
            "warmups": [0,0,10],
            "sets": [15,15,15]
        },
        "curling": {
            "sets": [5,5,5]
        },
        "sidePlank": {
            "sets": [0,0,0]
        },
        "burpees": {
            "sets": [0,0,0]
        }
    }
};

export default ExercisePlan;