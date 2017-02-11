'use strict';

var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');
var tokyoPinMap = document.querySelector('.tokyo__pin-map');

// Функция проверки и удаления класса

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var changeAria = function (element) {
  var pressed = (element.getAttribute('aria-pressed') === 'true');
  if (!pressed) {
    element.setAttribute('aria-pressed', !pressed);
  }
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

var pinDelete = function () {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
};

// Добавляем класс

var pinAdd = function (e) {
  var element = e.target.classList.contains('pin') ? e.target : e.target.parentElement;
  pinDelete();
  element.classList.add('pin--active');
  dialog.style.display = 'block';
};

// Добавляем действие по клику

var closeDialog = function () {
  dialog.style.display = 'none';
  pinDelete();
  changeAria(dialogClose);
};


var listenPress = function (e) {
  if (isActivate(e)) {
    pinAdd(e);
  }
};

tokyoPinMap.addEventListener('keydown', listenPress);

tokyoPinMap.addEventListener('keydown', function (e) {
  showSetupElement();
});

dialogClose.addEventListener('click', closeDialog);
tokyoPinMap.addEventListener('click', pinAdd);

// Проверяем время заезда и выезда

var formTime = noticeForm.querySelector('#time');
var formTimeout = noticeForm.querySelector('#timeout');

formTime.addEventListener('change', function () {
  formTimeout.selectedIndex = formTime.selectedIndex;
});

formTimeout.addEventListener('change', function () {
  formTime.selectedIndex = formTimeout.selectedIndex;
});


// проверяем стоимость за номер


var formType = noticeForm.querySelector('#type');
var formRoomNumber = noticeForm.querySelector('#room_number');
var formCapacity = noticeForm.querySelector('#capacity');
var formPrice = noticeForm.querySelector('#price');
var formTitle = noticeForm.querySelector('#title');
var formAddress = noticeForm.querySelector('#address');

formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

formPrice.required = true;
formPrice.type = 'number';
formPrice.min = 1000;
formPrice.max = 1000000;
formAddress.required = true;

formType.addEventListener('change', function (e) {
  formPrice.min = formType.value;
});

// Задаем начальные значения и проверяем кол-во гостей в номере

formRoomNumber.value = '1';
formCapacity.value = '1';

formRoomNumber.addEventListener('change', function (e) {
  formCapacity.value = e.target.value;
});
formCapacity.addEventListener('change', function (e) {
  formRoomNumber.value = e.target.value;
});
