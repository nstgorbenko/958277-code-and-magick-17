'use strict';
(function () {
  var WIZARD_NUMBER = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  /**
   * Возвращает случайное целое число между min (включительно) и max (не включая max)
   * @param {Number} min
   * @param {Number} max
   * @return {Number}
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * Генерирует объект с данными о случайном волшебнике
   * @return {Object.<string, string>}
   */
  var createWizard = function () {
    return {
      name: NAMES[getRandomNumber(0, NAMES.length)] + ' ' + SURNAMES[getRandomNumber(0, SURNAMES.length)],
      coatColor: COAT_COLORS[getRandomNumber(0, COAT_COLORS.length)],
      eyesColor: EYE_COLORS[getRandomNumber(0, EYE_COLORS.length)]
    };
  };

  /**
   * Возвращает массив объектов с данными о волшебниках
   * @return {Array.<object>}
   */
  var createWizardList = function () {
    var wizardList = [];

    for (var i = 0; i < WIZARD_NUMBER; i++) {
      wizardList.push(createWizard());
    }

    return wizardList;
  };

  /**
   * Создает DOM-элемент на основе объекта с данными
   * @param {Object} wizardData - объект с данными о случайном волшебнике
   * @return {Node}
   */
  var renderWizard = function (wizardData) {
    var newWizard = similarWizardTemplate.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    newWizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

    return newWizard;
  };

  /**
   * Возвращает фрагмент c DOM-элементами
   * @param {Array.<object>} allWizards - массив объектов с данными о волшебниках
   * @return {NodeList}
   */
  var putWizards = function (allWizards) {
    var fragment = document.createDocumentFragment();

    allWizards.forEach(function (eachWizard) {
      fragment.appendChild(renderWizard(eachWizard));
    });

    return fragment;
  };

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var similarWizards = document.querySelector('.setup-similar');

  var wizards = createWizardList();
  var wizardsElement = putWizards(wizards);
  similarWizardsList.appendChild(wizardsElement);
  similarWizards.classList.remove('hidden');
})();
