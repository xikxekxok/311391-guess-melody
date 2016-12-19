export const getInitState = () => ({
    lifes:3,
    time: 120,
    isDead: false
});

const getNewState = (lifes, time) => ({
    lifes: lifes,
    time: time,
    isDead : time <= 0 || lifes <= 0
});

export const timerElapsed = (currState) => {
    return getNewState(currState.lifes, currState.time-1);
}

export const questionAnswered = (currState, isCorrect) => {
    return getNewState(isCorrect ? currState.lifes : currState.lifes - 1, currState.time);
}