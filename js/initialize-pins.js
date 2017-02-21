'use strict';

(function () {
  var dialog = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var changeAria = function (element) {
    var pressed = (element.getAttribute('aria-pressed') === 'true');
    if (!pressed) {
      element.setAttribute('aria-pressed', !pressed);
    }
  };

  var deleteClass = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  };

  var changeClass = function (e) {
    var targetElement = e.target.classList.contains('pin') ? e.target : e.target.parentElement;
    deleteClass();
    targetElement.classList.add('pin--active');
    dialog.style.display = 'block';
  };

  var isActivate = function (e) {
    return e.keyCode && e.keyCode === ENTER_KEY_CODE;
  };

  var setupKeydownHandler = function (e) {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      dialog.style.display = 'none';
    }
  };

  var showSetupElement = function () {
    document.addEventListener('keydown', setupKeydownHandler);
  };

  var closeDialog = function () {
    dialog.style.display = 'none';
    deleteClass();
    changeAria(dialogClose);
  };

  var listenPress = function (e) {
    if (isActivate(e)) {
      changeClass(e);
    }
  };

  tokyoPinMap.addEventListener('keydown', listenPress);

  tokyoPinMap.addEventListener('keydown', function (e) {
    showSetupElement();
  });

  dialogClose.addEventListener('click', closeDialog);
  tokyoPinMap.addEventListener('click', changeClass);
})();
