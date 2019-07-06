'use strict';
(function () {
  var WIZARD_NUMBER = 4;
  /**
   * Создает DOM-элемент на основе объекта с данными
   * @param {Object} wizardData - объект с данными о случайном волшебнике
   * @return {Node}
   */
  var renderWizard = function (wizardData) {
    var newWizard = similarWizardTemplate.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return newWizard;
  };

  /**
   * Возвращает фрагмент c DOM-элементами
   * @param {Array.<object>} allWizards - массив объектов с данными о волшебниках
   * @return {NodeList}
   */
  var putWizards = function (allWizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_NUMBER; i++) {
      fragment.appendChild(renderWizard(allWizards[i]));
    }

    return fragment;
  };

  /**
   * Коллбэк-функция, отрисовывает похожих волшебников на странице
   * @param {Array.<object>} data - массив объектов с данными о волшебниках
   */
  var successLoadHandler = function (data) {
    similarWizardsList.appendChild(putWizards(data));
    similarWizards.classList.remove('hidden');
  };

  /**
   * Коллбэк-функция, выводит сообщение об ошибке
   * @param {String} error - сообщение об ошибке
   */
  var errorHandler = function (error) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'z-index: 10; text-align: center; background-color: white; border: 2px solid red; position: absolute; left: 0; right: 0; font-size: 20; color: red;';
    errorMessage.textContent = error;
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  /**
   * Коллбэк-функция, закрывает окно настроек персонажа
   */
  var successSubmitHandler = function () {
    window.setup.closePopup();
  };

  /**
   * Отправляет данные на сервер
   * @param {Object} evt - объект события 'submit'
   */
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successSubmitHandler, errorHandler);
    submitButton.disabled = true;
  };

  var form = document.querySelector('.setup-wizard-form');
  var submitButton = form.querySelector('.setup-submit');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = form.querySelector('.setup-similar-list');
  var similarWizards = form.querySelector('.setup-similar');

  window.backend.load(successLoadHandler, errorHandler);

  window.wizards = {
    form: form,
    submitButton: submitButton,
    onFormSubmit: onFormSubmit
  };
})();
