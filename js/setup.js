'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PLAYER_SETTINGS_LEFT = '50%';
  var PLAYER_SETTINGS_TOP = '80px';

  /**
   * Добавляет открытие окна по клику
   */
  var onOpenSettingsClick = function () {
    openPopup();
  };

  /**
   * Открывает окно настроек по нажатию на Enter
   * @param {Object} evt - объект события 'keydown'
   */
  var onOpenSettingsEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  /**
   * Закрывает окно настроек по клику
   */
  var onCloseSettingsClick = function () {
    closePopup();
  };

  /**
   * Закрывает окно настроек по нажатию на Enter
   * @param {Object} evt - объект события 'keydown'
   */
  var onCloseSettingsEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  /**
   * Закрывает окно настроек по нажатию на ESC
   * @param {Object} evt - объект события 'keydown'
   */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameField) {
      closePopup();
    }
  };

  /**
   * Добавляет обработчики открытия окна настроек персонажа
   */
  var openPopupListeners = function () {
    openSettings.addEventListener('click', onOpenSettingsClick);
    openSettingsIcon.addEventListener('keydown', onOpenSettingsEnterPress);
  };

  /**
   * Удаляет обработчики открытия окна настроек персонажа
   */
  var closePopupListeners = function () {
    openSettings.removeEventListener('click', onOpenSettingsClick);
    openSettingsIcon.removeEventListener('keydown', onOpenSettingsEnterPress);
  };

  /**
   * Открывает окно настроек персонажа, добавляет обработчики событий внутри него, удаляет обработчики открытия окна
   */
  var openPopup = function () {
    window.movePopup.playerSettings.style.top = PLAYER_SETTINGS_TOP;
    window.movePopup.playerSettings.style.left = PLAYER_SETTINGS_LEFT;
    window.movePopup.playerSettings.classList.remove('hidden');
    window.wizards.submitButton.disabled = false;
    window.wizards.form.addEventListener('submit', window.wizards.onFormSubmit);
    window.avatar.fileChooser.addEventListener('change', window.avatar.onFileChooserChange);

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

  /**
   * Закрывает окно настроек персонажа, удаляет обработчики событий внутри него, добавляет обработчики открытия окна
   */
  var closePopup = function () {
    window.movePopup.playerSettings.classList.add('hidden');
    window.wizards.form.removeEventListener('submit', window.wizards.onFormSubmit);
    window.avatar.fileChooser.removeEventListener('change', window.avatar.onFileChooserChange);

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

  window.setup = {
    closePopup: closePopup
  };
})();
