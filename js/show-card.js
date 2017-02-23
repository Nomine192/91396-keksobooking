'use strict';

window.showCard = (function () {

  var dialog = document.querySelector('.dialog');
  var disableDialog = dialog.querySelector('.dialog__close');
  var onDialogClose = null;


  dialog.style.display = 'none';

  var openDialog = function () {
    dialog.style.display = 'block';
  };

  var closeDialog = function (e) {
    dialog.style.display = 'none';
    window.utils.changeAria(disableDialog);
    disableDialog.removeEventListener('keydown', onKeyDown);

    if (typeof onDialogClose === 'function') {
      onDialogClose();
    }
  };

  var onKeyDown = function (e) {
    if (window.utils.isActivateEvent(e)) {
      closeDialog(e);
    }
  };

  return function (callback) {
    openDialog();

    disableDialog.addEventListener('keydown', onKeyDown);
    disableDialog.addEventListener('click', closeDialog);

    onDialogClose = callback;
  };

})();
