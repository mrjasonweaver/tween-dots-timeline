import {
  toggleTheme,
  writePlayButton,
  modCircleRadius,
  modTimelineProgress,
  modRangePosition
} from "./ui";

import {
  THEME,
  FRAME_RATE,
  getComputedPerentage
} from "./constants";

import {
  linear
} from './easing';

const appState = {
  current: "INIT",
  currentRangeValue: 1,
  timer: 0,
  timelineProgressInterval: -1,
  timeToMoveNextDate: -1,
  animateDotsInterval: -1,
  timeToStopDotsAnimation: -1,
  tick() {
    this.timer++;
    if (this.current === 'INIT') {
      this.startPlaying();
    }
    if (this.timer % FRAME_RATE == 0 && this.current === 'PLAYING') {
      this.moveToNextTimeInterval();
    }
    if (this.timer === this.timelineProgressInterval && this.current === 'PLAYING') {
      this.animateTimeline();
    }
    if (this.timer === this.animateDotsInterval && this.current === 'PLAYING') {
      this.animateDots();
    }
    if (this.timer === this.timeToStopDotsAnimation && this.current === 'PLAYING') {
      this.endDotsAnimation();
    }
    return this.timer;
  },
  animateDots() {
    this.animateDotsInterval = this.timer + 1;
    let incrementer = ((this.timer - this.timeToStopDotsAnimation) + FRAME_RATE) + 1;
    let decimalIncrementer = ((incrementer / FRAME_RATE) * 100) / 100;
    let easingIncrementer = linear(decimalIncrementer);
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
  startPlaying() {
    this.current = "PLAYING";
  },
  moveToNextTimeInterval() {
    this.timeToMoveNextDate = this.timer + FRAME_RATE;
    if (this.currentRangeValue > 5) {
      this.current = "IDLE";
      this.timer = 0;
      this.timelineProgressInterval = -1;
      this.timeToMoveNextDate = -1;
      this.animateDotsInterval = -1;
      this.timeToStopDotsAnimation = -1;
      this.currentRangeValue = 1;
    } else {
      this.currentRangeValue++;
    }
    this.animateTimeline();
    this.startDotsAnimation()
    this.animateDots();
    modRangePosition(this.currentRangeValue);
  }
}

export default appState;
