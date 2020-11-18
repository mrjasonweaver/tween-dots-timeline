export const toggleTheme = function toggleTheme(show) {
  document.querySelector(".app-wrap").classList.toggle("theme-dark", !show);
};

export const writePlayButton = function writePlayButton(text = "") {
  document.querySelector(".button").innerHTML = `<div class="button-inner">${text}</div>`;
};

export const modCircleRadius = function modCircleRadius(easingIncrementer, currentRangeValue) {
  Array.from(document.querySelectorAll(".circle")).forEach(c => {
    let nextRadius = c.dataset['points'].split(' ');
    let nextRadiusIndex = +currentRangeValue - 1;
    let currentRadius = +currentRangeValue === 1 ? +c.getAttribute('r') : +nextRadius[currentRangeValue - 2];
    let totalRadiusAmount = +nextRadius[nextRadiusIndex] - currentRadius;
    let setRadius = currentRadius += (totalRadiusAmount * easingIncrementer);
    return c.setAttribute('r', setRadius);
  });
};

export const modTimelineProgress = function modTimelineProgress(width) {
  document.querySelector(".timeline-progress").style.width = `${width}%`;
};

export const modRangePosition = function modRangePosition(position) {
  document.querySelector("#timeline").value = position;
};
