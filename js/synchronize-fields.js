'use strict';

(function () {
  window.synchronizeFields = (function (elementValue, anotherValueElement, arrayValue, anotherArrayValue, strNameValue) {
	  elementValue.addEventListener('change', function () {
	    var selectedValue = arrayValue.indexOf(elementValue.value);
	    anotherValueElement[strNameValue] = anotherArrayValue[selectedValue];
	  });
	  anotherValueElement.addEventListener('change', function () {
	    var anotherSelecteValue = anotherArrayValue.indexOf(anotherValueElement.value);
	    elementValue[strNameValue] = arrayValue[anotherSelecteValue];
	  });
	});
})();
