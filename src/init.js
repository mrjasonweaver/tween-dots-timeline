import appState from './appState';
import {
  TICK_RATE
} from './constants';

async function init() {
  // initButtons(handleUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();
    if (nextTimeToTick <= now) {
      appState.tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
