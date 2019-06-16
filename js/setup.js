'use strict';
var WIZARD_NUMBER = 4;

var getRandomElement = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var createWizard = function (wizardNames, wizardSurnames, wizardCoats, wizardEyes) {
  var newWizard = {};

  newWizard.name = getRandomElement(wizardNames) + ' ' + getRandomElement(wizardSurnames);
  newWizard.coatColor = getRandomElement(wizardCoats);
  newWizard.eyesColor = getRandomElement(wizardEyes);
  return newWizard;
};

var createWizardList = function () {
  var wizardList = [];

  for (var i = 0; i < WIZARD_NUMBER; i++) {
    var wizard = createWizard(NAMES, SURNAMES, COAT_COLORS, EYE_COLORS);
    wizardList.push(wizard);
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

var playerSettings = document.querySelector('.setup');
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizards = document.querySelector('.setup-similar');

var wizards = createWizardList();
var wizardsElement = putWizards(wizards);
similarWizardsList.appendChild(wizardsElement);
similarWizards.classList.remove('hidden');
playerSettings.classList.remove('hidden');
