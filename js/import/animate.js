export const getAnimation = (step, stepDuration, steps) => ({
  step: step,
  stepDuration: stepDuration,
  steps: steps
});


export default (animation, callback, callbackEnd, callbackDestroy) => {
  const interval = setInterval(() => {
    const nextStep = animation.step + 1;
    if (nextStep <= animation.steps) {
      animation = getAnimation(nextStep, animation.stepDuration, animation.steps);
      callback(animation);
    } else {
      stopFn();
      if (typeof callbackEnd === 'function') {
        callbackEnd();
      }
    }
  }, animation.stepDuration);

  const stopFn = () => {
    if (typeof callbackDestroy === 'function') {
      callbackDestroy();
    }
    clearInterval(interval);
  };

  return stopFn;
};
