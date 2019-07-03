'use strict';
(function () {
  /**
   * Реализует возможность перетаскивания окна настроек персонажа
   * @param {Object} evt - объект события 'mousedown'
   */
  var onMouseDown = function (evt) {
    var moving = false;
    var start = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Задает окну настроек персонажа новые координаты
     * @param {Object} moveEvt - объект события 'mousemove'
     */
    var onMouseMove = function (moveEvt) {
      moving = true;
      var shift = {
        x: start.x - moveEvt.clientX,
        y: start.y - moveEvt.clientY
      };

      start = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      playerSettings.style.top = (playerSettings.offsetTop - shift.y) + 'px';
      playerSettings.style.left = (playerSettings.offsetLeft - shift.x) + 'px';
    };

    /**
     * Удаляет обработчики событий 'mousemove' и 'mouseup'
     */
    var onMouseUp = function () {
      /**
       * Отменяет действие по умолчанию
       * @param {Object} clickEvt - объект события 'click'
       */
      var onSettingsMoverClick = function (clickEvt) {
        clickEvt.preventDefault();
        settingsMover.removeEventListener('click', onSettingsMoverClick);
      };

      if (moving) {
        settingsMover.addEventListener('click', onSettingsMoverClick);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var playerSettings = document.querySelector('.setup');
  var settingsMover = playerSettings.querySelector('.upload');

  window.movePopup = {
    playerSettings: playerSettings,
    settingsMover: settingsMover,

    onMouseDown: onMouseDown
  };
})();
