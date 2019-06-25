'use strict';
var WIZARD_NUMBER = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var counter = 0;

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

var getNext = function (someColors) {
  counter = counter === someColors.length - 1 ? 0 : ++counter;
  return someColors[counter];
};

var chooseFillColor = function (coloredItem, colorList, itemInput) {
  var color = getNext(colorList);

  itemInput.value = color;
  if (coloredItem.tagName === 'use') {
    coloredItem.style.fill = color;
  } else {
    coloredItem.style.background = color;
  }
};

var onWizardCoatClick = function () {
  chooseFillColor(wizardCoat, COAT_COLORS, coatInput);
};

var onWizardEyesClick = function () {
  chooseFillColor(wizardEyes, EYE_COLORS, eyesInput);
};

var onWizardFireballClick = function () {
  chooseFillColor(wizardFireball, FIREBALL_COLORS, fireballInput);
};

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

var openPopup = function () {
  playerSettings.classList.remove('hidden');
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);
  document.addEventListener('keydown', onPopupEscPress);
  closeSettings.addEventListener('click', onCloseSettingsClick);
  closeSettings.addEventListener('keydown', onCloseSettingsEnterPress);
  openSettings.removeEventListener('click', onOpenSettingsClick);
  openSettingsIcon.removeEventListener('keydown', onOpenSettingsEnterPress);
};

var closePopup = function () {
  playerSettings.classList.add('hidden');
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardFireball.removeEventListener('click', onWizardFireballClick);
  document.removeEventListener('keydown', onPopupEscPress);
  closeSettings.removeEventListener('click', onCloseSettingsClick);
  closeSettings.removeEventListener('keydown', onCloseSettingsEnterPress);
  openSettings.addEventListener('click', onOpenSettingsClick);
  openSettingsIcon.addEventListener('keydown', onOpenSettingsEnterPress);
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizards = document.querySelector('.setup-similar');
var playerSettings = document.querySelector('.setup');
var openSettings = document.querySelector('.setup-open');
var closeSettings = playerSettings.querySelector('.setup-close');
var openSettingsIcon = openSettings.querySelector('.setup-open-icon');
var userNameField = playerSettings.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var coatInput = document.querySelector('input[name="coat-color"]');
var eyesInput = document.querySelector('input[name="eyes-color"]');
var fireballInput = document.querySelector('input[name="fireball-color"]');

var wizards = createWizardList();
var wizardsElement = putWizards(wizards);
similarWizardsList.appendChild(wizardsElement);
similarWizards.classList.remove('hidden');
openSettings.addEventListener('click', onOpenSettingsClick);
openSettingsIcon.addEventListener('keydown', onOpenSettingsEnterPress);
