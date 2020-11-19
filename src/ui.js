export const toggleTheme = function toggleTheme(show) {
  document.querySelector('body').classList.toggle("theme-dark", show);
};

export const writePlayButton = function writePlayButton(text = "") {
  // document.querySelector(".play-button-inner").innerHTML = `${text}`;
};

export const modCircleRadius = function modCircleRadius(easingIncrementer, currentRangeValue) {
  const circles = Array.from(document.querySelectorAll(".circle"));
  circles.forEach(c => {
    let nextRadius = c.dataset['points'].split(' ');
    let nextRadiusIndex = currentRangeValue !== nextRadius.length ? +currentRangeValue : nextRadius.length - 1;
    let currentRadius = +nextRadius[currentRangeValue - 1];
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

export const modRangeHash = function modRangePosition(position) {
  const hashes = Array.from(document.querySelectorAll('.timeline-hash'));
  hashes.forEach(h => h.classList.remove('active'));
  hashes[position - 1].classList.add('active');
};

export const modThumbPosition = function modThumbPosition(easingIncrementer, currentRangeValue) {
  const thumb = document.querySelector('.faux-thumb');
  let currentRangePosition = currentRangeValue > 1 ? (571 / 5) * (currentRangeValue - 1) : 0;
  let nextRangePosition = (571 / 5) * (currentRangeValue);
  let difference = nextRangePosition - currentRangePosition;
  let setPosition = currentRangePosition += (difference * easingIncrementer);
  if (currentRangeValue !== 6) {
    thumb.style.transform = `translate(${setPosition}px, 0)`;
  }
};
