import { alert, error } from '../../node_modules/@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';

defaults.maxTextHeight = null;
defaults.sticker = false;
defaults.stickerHover = false;
defaults.delay = 2000;

export function showError() {
  error({
    text: 'Enter correct name!',
  });
}

export function showAlert() {
  alert({
    text: 'There is no pictures with this name :-(',
  });
}
