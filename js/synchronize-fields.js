'use strict';

window.synchronizeFields = (function (elementValue, anotherValueElement, arrayValue, anotherArrayValue, strNameValue, callback) {
  elementValue.addEventListener('change', function () {
    var selectedValue = arrayValue.indexOf(elementValue.value);
    callback(anotherArrayValue[selectedValue]);
  });
});
