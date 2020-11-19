import {
  toggleTheme,
  modCircleRadius,
  modTimelineProgress,
  modRangePosition,
  modThumbPosition,
  modRangeHash
} from "./ui";

import {
  FRAME_RATE,
  getComputedPerentage
} from "./constants";

import {
  easeInQuint
} from './easing';

const appState = {
  current: "INIT",
  themeDark: false,
  currentRangeValue: 1,
  timer: 0,
  timelineProgressInterval: -1,
  timeToMoveNextDate: -1,
  animateDotsInterval: -1,
  timeToStopDotsAnimation: -1,
  timeToStartThumbAnimation: -1,
  timeToStopThumbAnimation: -1,
  animateThumbInterval: -1,
  timeToPlay: -1,
  tick() {
    this.timer++;
    if (this.timer === this.timeToPlay) {
      this.startPlaying();
    }
    if (this.timer === this.timeToMoveNextDate) {
      this.moveToNextTimeInterval();
    }
    if (this.timer === this.timelineProgressInterval) {
      this.animateTimeline();
    }
    if (this.timer === this.animateDotsInterval) {
      this.animateDots();
    }
    if (this.timer === this.timeToStopDotsAnimation) {
      this.endDotsAnimation();
    }
    if (this.timer === this.timeToStartThumbAnimation) {
      this.animateTimelineThumb();
    }
    if (this.timer === this.animateThumbInterval) {
      this.animateTimelineThumb();
    }
    if (this.timer === this.timeToStopThumbAnimation) {
      this.stopThumbAnimation();
    }
    return this.timer;
  },
  animateDots() {
    this.animateDotsInterval = this.timer + 1;
    let incrementer = ((this.timer - this.timeToStopDotsAnimation) + FRAME_RATE) + 1;
    let decimalIncrementer = ((incrementer / FRAME_RATE) * 100) / 100;
    let easingIncrementer = easeInQuint(decimalIncrementer);
    modCircleRadius(easingIncrementer, this.currentRangeValue);
  },
  startDotsAnimation() {
    this.timeToStopDotsAnimation = this.timer + FRAME_RATE;
  },
  endDotsAnimation() {
    this.animateDotsInterval = -1;
  },
  animateTimeline() {
    this.timelineProgressInterval = this.timer + 1;
    modTimelineProgress(getComputedPerentage(this.timer, this.timeToMoveNextDate, this.currentRangeValue));
  },
  animateTimelineThumb() {
    this.animateThumbInterval = this.timer + 1;
    let incrementer = ((this.timer - this.timeToStopThumbAnimation) + FRAME_RATE) + 1;
    let decimalIncrementer = ((incrementer / FRAME_RATE) * 100) / 100;
    let easingIncrementer = easeInQuint(decimalIncrementer);
    modThumbPosition(easingIncrementer, this.currentRangeValue);
  },
  stopThumbAnimation() {
    this.animateThumbInterval = -1;
    this.timeToStartThumbAnimation = -1;
    this.timeToStopThumbAnimation = -1;
  },
  startPlaying() {
    this.timeToMoveNextDate = this.timer + FRAME_RATE;
    this.timeToStartThumbAnimation = this.timer;
    this.timeToStopThumbAnimation = this.timer + FRAME_RATE;
    this.current = "PLAYING";
    this.animateTimeline();
    this.startDotsAnimation()
    this.animateDots();
  },
  initPlay() {
    this.currentRangeValue = 1;
    modRangePosition(this.currentRangeValue);
    modRangeHash(this.currentRangeValue);
    this.timeToPlay = this.timer + 1;
  },
  pause() {
    console.log('pausing');
  },
  handleUserAction() {
    if (this.current === 'INIT' || this.current === 'IDLE') {
      this.initPlay();
      return;
    } else {
      this.pause();
    }
  },
  handleThemeChange() {
    this.themeDark = !this.themeDark;
    toggleTheme(this.themeDark);
  },
  moveToNextTimeInterval() {
    if (this.currentRangeValue === 6) {
      this.current = "IDLE";
      this.timer = 0;
      this.timelineProgressInterval = -1;
      this.timeToMoveNextDate = -1;
      this.animateDotsInterval = -1;
      this.timeToStopDotsAnimation = -1;
      this.timeToStartThumbAnimation = -1;
      this.timeToStopThumbAnimation = -1;
      this.animateThumbInterval = -1;
      this.timeToPlay = -1;
    } else {
      this.timeToMoveNextDate = this.timer + FRAME_RATE;
      this.timeToStartThumbAnimation = this.timer;
      this.timeToStopThumbAnimation = this.timer + FRAME_RATE;
      this.currentRangeValue++;
      this.startDotsAnimation()
      this.animateDots();
      modRangePosition(this.currentRangeValue);
      modRangeHash(this.currentRangeValue);
    }
  }
}
export const handleUserAction = appState.handleUserAction.bind(appState);
export const handleThemeChange = appState.handleThemeChange.bind(appState);
export default appState;
