import {
  writePlayButton
} from './ui';

export default function initButtons(handleUserAction, handleThemeChange) {

  const buttonClick = () => {
    writePlayButton('Pause');
    handleUserAction();
  }
  document.querySelector(".play-button").addEventListener("click", buttonClick);

  document.querySelector('.theme-button').addEventListener("click", () => {
    handleThemeChange();
  });


}
