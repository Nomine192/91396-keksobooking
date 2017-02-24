'use strict';

window.initializePins = (function () {
  return {
    showPin: function (callback) {
      callback();
    },
    deleteClass: function () {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
    }
  };
})();
