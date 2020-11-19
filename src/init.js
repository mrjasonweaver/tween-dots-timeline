import appState, {
  handleUserAction,
  handleThemeChange
} from "./appState";
import initButtons from "./buttons";
import {
  TICK_RATE
} from './constants';

async function init() {
  initButtons(handleUserAction, handleThemeChange);

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
