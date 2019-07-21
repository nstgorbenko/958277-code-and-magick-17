'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * Реализует предзагрузку аватара пользователя
   */
  var onFileChooserChange = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var isImage = FILE_TYPES.some(function (format) {
      return fileName.endsWith(format);
    });

    if (isImage) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  window.avatar = {
    fileChooser: fileChooser,
    onFileChooserChange: onFileChooserChange
  };
})();
