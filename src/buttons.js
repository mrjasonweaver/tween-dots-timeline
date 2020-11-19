import {
  writePlayButton
} from './ui';

export default function initButtons(handleUserAction) {

  const buttonClick = () => {
    writePlayButton('Pause');
    handleUserAction();
  }
  document.querySelector(".play-button").addEventListener("click", buttonClick);
}
