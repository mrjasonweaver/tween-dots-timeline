// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lA8h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modThumbPosition = exports.modRangeHash = exports.modRangePosition = exports.modTimelineProgress = exports.modCircleRadius = exports.writePlayButton = exports.toggleTheme = void 0;

const toggleTheme = function toggleTheme(show) {
  document.querySelector(".app-wrap").classList.toggle("theme-dark", !show);
};

exports.toggleTheme = toggleTheme;

const writePlayButton = function writePlayButton(text = "") {// document.querySelector(".play-button-inner").innerHTML = `${text}`;
};

exports.writePlayButton = writePlayButton;

const modCircleRadius = function modCircleRadius(easingIncrementer, currentRangeValue) {
  const circles = Array.from(document.querySelectorAll(".circle"));
  circles.forEach(c => {
    let nextRadius = c.dataset['points'].split(' ');
    let nextRadiusIndex = currentRangeValue !== nextRadius.length ? +currentRangeValue : nextRadius.length - 1;
    let currentRadius = +nextRadius[currentRangeValue - 1];
    let totalRadiusAmount = +nextRadius[nextRadiusIndex] - currentRadius;
    let setRadius = currentRadius += totalRadiusAmount * easingIncrementer;
    return c.setAttribute('r', setRadius);
  });
};

exports.modCircleRadius = modCircleRadius;

const modTimelineProgress = function modTimelineProgress(width) {
  document.querySelector(".timeline-progress").style.width = `${width}%`;
};

exports.modTimelineProgress = modTimelineProgress;

const modRangePosition = function modRangePosition(position) {
  document.querySelector("#timeline").value = position;
};

exports.modRangePosition = modRangePosition;

const modRangeHash = function modRangePosition(position) {
  const hashes = Array.from(document.querySelectorAll('.timeline-hash'));
  hashes.forEach(h => h.classList.remove('active'));
  hashes[position - 1].classList.add('active');
};

exports.modRangeHash = modRangeHash;

const modThumbPosition = function modThumbPosition(easingIncrementer, currentRangeValue) {
  const thumb = document.querySelector('.faux-thumb');
  let currentRangePosition = currentRangeValue > 1 ? 571 / 5 * (currentRangeValue - 1) : 0;
  let nextRangePosition = 571 / 5 * currentRangeValue;
  let difference = nextRangePosition - currentRangePosition;
  let setPosition = currentRangePosition += difference * easingIncrementer;

  if (currentRangeValue !== 6) {
    thumb.style.transform = `translate(${setPosition}px, 0)`;
  }
};

exports.modThumbPosition = modThumbPosition;
},{}],"iJA9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComputedPerentage = exports.THEME = exports.TICK_RATE = exports.RANGE_PERCENTAGE = exports.FRAME_RATE = exports.ONE_SECOND = void 0;
const ONE_SECOND = 1000;
exports.ONE_SECOND = ONE_SECOND;
const FRAME_RATE = 60;
exports.FRAME_RATE = FRAME_RATE;
const RANGE_PERCENTAGE = 98.5;
exports.RANGE_PERCENTAGE = RANGE_PERCENTAGE;
const TICK_RATE = ONE_SECOND / FRAME_RATE;
exports.TICK_RATE = TICK_RATE;
const THEME = ["light", "dark"];
exports.THEME = THEME;

const getComputedPerentage = (timer, nextDate, currentRange) => {
  const startWidth = RANGE_PERCENTAGE / 5 * (currentRange - 1);
  const percentage = (FRAME_RATE - (nextDate - timer)) / FRAME_RATE * RANGE_PERCENTAGE / 5;

  if (currentRange == 6) {
    return RANGE_PERCENTAGE;
  } else {
    return startWidth + percentage;
  }
};

exports.getComputedPerentage = getComputedPerentage;
},{}],"gfrO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeInOutQuint = exports.easeOutQuint = exports.easeInQuint = exports.easeInOutQuart = exports.easeOutQuart = exports.easeInQuart = exports.easeInOutCubic = exports.easeOutCubic = exports.easeInCubic = exports.easeInOutQuad = exports.easeOutQuad = exports.easeInQuad = exports.linear = void 0;

const linear = t => t;

exports.linear = linear;

const easeInQuad = t => Math.pow(t, 2);

exports.easeInQuad = easeInQuad;

const easeOutQuad = t => 1 - easeInQuad(1 - t);

exports.easeOutQuad = easeOutQuad;

const easeInOutQuad = t => t < .5 ? easeInQuad(t * 2) / 2 : easeOutQuad(t * 2 - 1) / 2 + .5;

exports.easeInOutQuad = easeInOutQuad;

const easeInCubic = t => Math.pow(t, 3);

exports.easeInCubic = easeInCubic;

const easeOutCubic = t => 1 - easeInCubic(1 - t);

exports.easeOutCubic = easeOutCubic;

const easeInOutCubic = t => t < .5 ? easeInCubic(t * 2) / 2 : easeOutCubic(t * 2 - 1) / 2 + .5;

exports.easeInOutCubic = easeInOutCubic;

const easeInQuart = t => Math.pow(t, 4);

exports.easeInQuart = easeInQuart;

const easeOutQuart = t => 1 - easeInQuart(1 - t);

exports.easeOutQuart = easeOutQuart;

const easeInOutQuart = t => t < .5 ? easeInQuart(t * 2) / 2 : easeOutQuart(t * 2 - 1) / 2 + .5;

exports.easeInOutQuart = easeInOutQuart;

const easeInQuint = t => Math.pow(t, 5);

exports.easeInQuint = easeInQuint;

const easeOutQuint = t => 1 - easeInQuint(1 - t);

exports.easeOutQuint = easeOutQuint;

const easeInOutQuint = t => t < .5 ? easeInQuint(t * 2) / 2 : easeOutQuint(t * 2 - 1) / 2 + .5;

exports.easeInOutQuint = easeInOutQuint;
},{}],"lbU3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.handleUserAction = void 0;

var _ui = require("./ui");

var _constants = require("./constants");

var _easing = require("./easing");

const appState = {
  current: "INIT",
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
    let incrementer = this.timer - this.timeToStopDotsAnimation + _constants.FRAME_RATE + 1;
    let decimalIncrementer = incrementer / _constants.FRAME_RATE * 100 / 100;
    let easingIncrementer = (0, _easing.easeInQuint)(decimalIncrementer);
    (0, _ui.modCircleRadius)(easingIncrementer, this.currentRangeValue);
  },

  startDotsAnimation() {
    this.timeToStopDotsAnimation = this.timer + _constants.FRAME_RATE;
  },

  endDotsAnimation() {
    this.animateDotsInterval = -1;
  },

  animateTimeline() {
    this.timelineProgressInterval = this.timer + 1;
    (0, _ui.modTimelineProgress)((0, _constants.getComputedPerentage)(this.timer, this.timeToMoveNextDate, this.currentRangeValue));
  },

  animateTimelineThumb() {
    this.animateThumbInterval = this.timer + 1;
    let incrementer = this.timer - this.timeToStopThumbAnimation + _constants.FRAME_RATE + 1;
    let decimalIncrementer = incrementer / _constants.FRAME_RATE * 100 / 100;
    let easingIncrementer = (0, _easing.easeInQuint)(decimalIncrementer);
    (0, _ui.modThumbPosition)(easingIncrementer, this.currentRangeValue);
  },

  stopThumbAnimation() {
    this.animateThumbInterval = -1;
    this.timeToStartThumbAnimation = -1;
    this.timeToStopThumbAnimation = -1;
  },

  startPlaying() {
    this.timeToMoveNextDate = this.timer + _constants.FRAME_RATE;
    this.timeToStartThumbAnimation = this.timer;
    this.timeToStopThumbAnimation = this.timer + _constants.FRAME_RATE;
    this.current = "PLAYING";
    this.animateTimeline();
    this.startDotsAnimation();
    this.animateDots();
  },

  initPlay() {
    this.currentRangeValue = 1;
    (0, _ui.modRangePosition)(this.currentRangeValue);
    (0, _ui.modRangeHash)(this.currentRangeValue);
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
      this.timeToMoveNextDate = this.timer + _constants.FRAME_RATE;
      this.timeToStartThumbAnimation = this.timer;
      this.timeToStopThumbAnimation = this.timer + _constants.FRAME_RATE;
      this.currentRangeValue++;
      this.startDotsAnimation();
      this.animateDots();
      (0, _ui.modRangePosition)(this.currentRangeValue);
      (0, _ui.modRangeHash)(this.currentRangeValue);
    }
  }

};
const handleUserAction = appState.handleUserAction.bind(appState);
exports.handleUserAction = handleUserAction;
var _default = appState;
exports.default = _default;
},{"./ui":"lA8h","./constants":"iJA9","./easing":"gfrO"}],"Vgpl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initButtons;

var _ui = require("./ui");

function initButtons(handleUserAction) {
  const buttonClick = () => {
    (0, _ui.writePlayButton)('Pause');
    handleUserAction();
  };

  document.querySelector(".play-button").addEventListener("click", buttonClick);
}
},{"./ui":"lA8h"}],"FyzG":[function(require,module,exports) {
"use strict";

var _appState = _interopRequireWildcard(require("./appState"));

var _buttons = _interopRequireDefault(require("./buttons"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function init() {
  (0, _buttons.default)(_appState.handleUserAction);
  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      _appState.default.tick();

      nextTimeToTick = now + _constants.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
},{"./appState":"lbU3","./buttons":"Vgpl","./constants":"iJA9"}]},{},["FyzG"], null)