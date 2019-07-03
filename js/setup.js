'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PLAYER_SETTINGS_LEFT = '50%';
  var PLAYER_SETTINGS_TOP = '80px';

  var onOpenSettingsClick = function () {
    openPopup();
  };

  var onOpenSettingsEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  var onCloseSettingsClick = function () {
    closePopup();
  };

  var onCloseSettingsEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameField) {
      closePopup();
    }
  };

  var openPopupListeners = function () {
    openSettings.addEventListener('click', onOpenSettingsClick);
    openSettingsIcon.addEventListener('keydown', onOpenSettingsEnterPress);
  };

  var closePopupListeners = function () {
    openSettings.removeEventListener('click', onOpenSettingsClick);
    openSettingsIcon.removeEventListener('keydown', onOpenSettingsEnterPress);
  };

  var openPopup = function () {
    window.movePopup.playerSettings.style.top = PLAYER_SETTINGS_TOP;
    window.movePopup.playerSettings.style.left = PLAYER_SETTINGS_LEFT;
    window.movePopup.playerSettings.classList.remove('hidden');

    window.color.wizardCoat.addEventListener('click', window.color.onWizardCoatClick);
    window.color.wizardEyes.addEventListener('click', window.color.onWizardEyesClick);
    window.color.wizardFireball.addEventListener('click', window.color.onWizardFireballClick);

    document.addEventListener('keydown', onPopupEscPress);
    closeSettings.addEventListener('click', onCloseSettingsClick);
    closeSettings.addEventListener('keydown', onCloseSettingsEnterPress);
    window.movePopup.settingsMover.addEventListener('mousedown', window.movePopup.onMouseDown);
    window.drag(artifacts, backpackPockets);

    closePopupListeners();
  };

  var closePopup = function () {
    window.movePopup.playerSettings.classList.add('hidden');

    window.color.wizardCoat.removeEventListener('click', window.color.onWizardCoatClick);
    window.color.wizardEyes.removeEventListener('click', window.color.onWizardEyesClick);
    window.color.wizardFireball.removeEventListener('click', window.color.onWizardFireballClick);

    document.removeEventListener('keydown', onPopupEscPress);
    closeSettings.removeEventListener('click', onCloseSettingsClick);
    closeSettings.removeEventListener('keydown', onCloseSettingsEnterPress);
    window.movePopup.settingsMover.removeEventListener('mousedown', window.movePopup.onMouseDown);

    openPopupListeners();
  };

  var openSettings = document.querySelector('.setup-open');
  var closeSettings = window.movePopup.playerSettings.querySelector('.setup-close');
  var openSettingsIcon = openSettings.querySelector('.setup-open-icon');
  var userNameField = window.movePopup.playerSettings.querySelector('.setup-user-name');
  var artifacts = document.querySelectorAll('.setup-artifacts-cell img');
  var backpackPockets = document.querySelectorAll('.setup-artifacts .setup-artifacts-cell');

  openPopupListeners();
})();
