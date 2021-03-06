'use strict';
(function () {

  var noticeForm = document.querySelector('.notice__form');
  var formTime = noticeForm.querySelector('#time');
  var formTimeout = noticeForm.querySelector('#timeout');
  var formType = noticeForm.querySelector('#type');
  var formRoomNumber = noticeForm.querySelector('#room_number');
  var formCapacity = noticeForm.querySelector('#capacity');
  var formPrice = noticeForm.querySelector('#price');
  var formTitle = noticeForm.querySelector('#title');
  var formAddress = noticeForm.querySelector('#address');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  window.initializePins.loadData();

  var onPinKeyDown = function (e) {
    if (window.utils.isActivate(e)) {
      var currentPin = e.target;
      window.initializePins.showPin(function () {
        if (currentPin !== null && !currentPin.classList.contains('pin--active')) {
          currentPin.classList.add('pin--active');
          window.utils.changeAria(currentPin);
        }

        window.showCard(currentPin.data, function () {
          window.initializePins.deleteClass();
          currentPin.focus();
        });
      });
    }
  };
  var onActivatePin = function (e) {
    var closest = window.utils.getClosestElement(e.target, 'pin', 'tokyo__pin-map');
    if (closest !== null && !closest.classList.contains('pin__main')) {
      window.initializePins.showPin(function () {
        window.initializePins.deleteClass();
        if (closest !== null && !closest.classList.contains('pin--active')) {
          closest.classList.add('pin--active');
          window.utils.changeAria(closest);
        }
      });
      window.showCard(closest.data, function () {
        window.initializePins.deleteClass();
      });
    }
  };

  tokyoPinMap.addEventListener('keydown', onPinKeyDown);
  tokyoPinMap.addEventListener('click', onActivatePin);

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
  };

  window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  window.synchronizeFields(formType, formPrice, ['1000', '0', '10000'], ['1000', '0', '10000'], syncValueWithMin);
  window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], syncValues);
  window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], syncValues);

  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;

  formPrice.required = true;
  formPrice.type = 'number';
  formPrice.min = 1000;
  formPrice.max = 1000000;
  formAddress.required = true;

  window.initializePins.deleteClass();
})();
