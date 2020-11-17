export const toggleTheme = function toggleTheme(show) {
  document.querySelector(".app-wrap").classList.toggle("theme-dark", !show);
};

export const writePlayButton = function writePlayButton(text = "") {
  document.querySelector(".button").innerHTML = `<div class="button-inner">${text}</div>`;
};

export const modCircleRadius = function modCircleRadius(radius) {
  Array.from(document.querySelectorAll(".circle")).forEach(c => {
    const currentRadius = c.getAttribute('r');
    return c.setAttribute('r', +currentRadius + +radius / 120)
  });
};

export const modTimelineProgress = function modTimelineProgress(width) {
  document.querySelector(".timeline-progress").style.width = `${width}%`;
};

export const modRangePosition = function modRangePosition(position) {
  document.querySelector("#timeline").value = position;
};
