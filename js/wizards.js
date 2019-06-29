'use strict';
(function () {
  var WIZARD_NUMBER = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var createWizard = function () {
    return {
      name: NAMES[getRandomNumber(0, NAMES.length)] + ' ' + SURNAMES[getRandomNumber(0, SURNAMES.length)],
      coatColor: COAT_COLORS[getRandomNumber(0, COAT_COLORS.length)],
      eyesColor: EYE_COLORS[getRandomNumber(0, EYE_COLORS.length)]
    };
  };

  var createWizardList = function () {
    var wizardList = [];

    for (var i = 0; i < WIZARD_NUMBER; i++) {
      wizardList.push(createWizard());
    }

    return wizardList;
  };

  var renderWizard = function (wizardData) {
    var newWizard = similarWizardTemplate.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    newWizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

    return newWizard;
  };

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
