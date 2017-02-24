'use strict';

window.synchronizeFields = (function () {
  return function (elementValue, anotherValueElement, arrayValue, anotherArrayValue, callback) {
    elementValue.addEventListener('change', function () {
      var selectedValue = arrayValue.indexOf(elementValue.value);
      callback(anotherValueElement, anotherArrayValue[selectedValue]);
    });
  };
})();
