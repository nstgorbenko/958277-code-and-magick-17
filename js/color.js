'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  /**
   * Возвращает следующее порядковое значение цвета из массива
   * @param {Array.<string>} someColors - массив цветов
   * @return {String} цвет
   */
  var getNext = function (someColors) {
    counter = counter === someColors.length - 1 ? 0 : ++counter;
    return someColors[counter];
  };

  /**
   * Меняет цвет элемента на странице и записывает это значение в соответствующий input
   * @param {Node} coloredItem - элемент, цвет которого необходимо изменить
   * @param {Array.<string>} colorList - массив цветов
   * @param {Node} itemInput - input для передачи данных
   */
  var chooseFillColor = function (coloredItem, colorList, itemInput) {
    var color = getNext(colorList);

    itemInput.value = color;
    if (coloredItem.tagName === 'use') {
      coloredItem.style.fill = color;
    } else {
      coloredItem.style.background = color;
    }
  };

  var counter = 0;
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var coatInput = document.querySelector('input[name="coat-color"]');
  var eyesInput = document.querySelector('input[name="eyes-color"]');
  var fireballInput = document.querySelector('input[name="fireball-color"]');

  window.color = {
    wizardCoat: wizardCoat,
    wizardEyes: wizardEyes,
    wizardFireball: wizardFireball,

    onWizardCoatClick: function () {
      chooseFillColor(wizardCoat, COAT_COLORS, coatInput);
    },

    onWizardEyesClick: function () {
      chooseFillColor(wizardEyes, EYE_COLORS, eyesInput);
    },

    onWizardFireballClick: function () {
      chooseFillColor(wizardFireball, FIREBALL_COLORS, fireballInput);
    }
  };
})();
