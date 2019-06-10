'use strict';

var playerSettings = document.querySelector('.setup');
playerSettings.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (values) {
  var randomElement = Math.floor(Math.random() * values.length);
  return values[randomElement];
};

var createWizardList = function (wizardNames, wizardSurnames, wizardCoats, wizardEyes) {
  var wizardList = [];
  for (var i = 0; i < 4; i++) {
    var wizardElement = {};
    wizardElement.name = getRandomElement(wizardNames) + ' ' + getRandomElement(wizardSurnames);
    wizardElement.coatColor = getRandomElement(wizardCoats);
    wizardElement.eyesColor = getRandomElement(wizardEyes);
    wizardList.push(wizardElement);
  }
  return wizardList;
};

var wizards = createWizardList(names, surnames, coatColors, eyesColors);

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizardObject) {
  var newWizard = similarWizardTemplate.cloneNode(true);
  newWizard.querySelector('.setup-similar-label').textContent = wizardObject.name;
  newWizard.querySelector('.wizard-coat').style.fill = wizardObject.coatColor;
  newWizard.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;
  return newWizard;
};

var putNewWizards = function (wizardsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    var newRenderedWizard = renderWizard(wizardsArray[i]);
    fragment.appendChild(newRenderedWizard);
  }
  return fragment;
};

var wizardsElement = putNewWizards(wizards);

var similarWizardsList = document.querySelector('.setup-similar-list');
similarWizardsList.appendChild(wizardsElement);

var similarWizards = document.querySelector('.setup-similar');
similarWizards.classList.remove('hidden');
