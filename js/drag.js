'use strict';
(function () {
  /**
   * Реализует перетаскивание Drag'n'Drop
   * @param {NodeList} draggedThings - набор перетаскиваемых HTML-элементов
   * @param {NodeList} dropPlaces - набор принимающих HTML-элементов
   */
  window.drag = function (draggedThings, dropPlaces) {
    var onDragOver = function (evt) {
      evt.preventDefault();
    };

    draggedThings.forEach(function (elem, index) {
      var onDragStart = function (evt) {
        evt.dataTransfer.setData('text', index);
      };

      elem.addEventListener('dragstart', onDragStart);
    });

    dropPlaces.forEach(function (elem) {
      elem.addEventListener('dragover', onDragOver);
    });

    dropPlaces.forEach(function (elem) {
      var onDrop = function (evt) {
        elem.appendChild(draggedThings[evt.dataTransfer.getData('text')]);
        elem.removeEventListener('dragover', onDragOver);
        elem.removeEventListener('drop', onDrop);
      };

      elem.addEventListener('drop', onDrop);
    });
  };
})();
