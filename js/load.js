'use strict';
window.load = (function () {

  var errorHandler = function (err) {
    return err;
  };

  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    if (typeof onError === 'function') {
      errorHandler = onError;
    }

    xhr.addEventListener('load', function (e) {
      if (e.target.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + e.target.status);
      } else if (e.target.status >= 200) {
        onLoad(e.target.response);
      }
    });
    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.send();
  };
})();
