'use strict';

window.initializePins = (function () {
  var tokyo = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];

  var formFilters = document.querySelector('.tokyo__filters');
  var filterType = formFilters.querySelector('#housing_type');
  var housingPrice = formFilters.querySelector('#housing_price');
  var filterRooms = formFilters.querySelector('#housing_room-number');
  var filterGuests = formFilters.querySelector('#housing_guests-number');
  var filtersContainer = formFilters.querySelector('#housing_features');
  var filterFeatures = filtersContainer.querySelectorAll('input[type=checkbox]');

  var ANY_VALUE = 'any';
  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 1000000;

  var isInRange = function (field, jsonValue) {
    return (field.value === ANY_VALUE) || (jsonValue === field.value);
  };


  var isInRangePrice = function (item) {
    switch (housingPrice.value) {
      case 'low':
        return item.offer.price < MIN_PRICE_VALUE;
      case 'middle':
        return item.offer.price >= MIN_PRICE_VALUE && item.offer.price <= MAX_PRICE_VALUE;
      case 'hight':
        return item.offer.price > MAX_PRICE_VALUE;
    }
    return false;
  };

  var isInRangeFeatures = function (dataApartment) {

    var isFeatureChecked = function (feature) {
      return feature.checked;
    };

    var getNameFeature = function (feature) {
      return feature.value;
    };

    var checkedFeatures = [].filter.call(filterFeatures, isFeatureChecked).map(getNameFeature);
    var apartmentFeatures = dataApartment.offer.features;

    var checkFeatures = function (feature) {
      return apartmentFeatures.indexOf(feature) !== -1;
    };

    return (checkedFeatures.length === 0) || (checkedFeatures.every(checkFeatures));
  };
  var filterApartments = function (item) {
    return isInRange(filterType, item.offer.type) &&
      isInRangePrice(item) &&
      isInRange(filterRooms, item.offer.rooms.toString()) &&
      isInRange(filterGuests, item.offer.guests.toString()) &&
      isInRangeFeatures(item);
  };

  var loadData = function () {
    window.load(DATA_URL, function (data) {
      similarApartments = data;
      var slicedArr = similarApartments.slice(0, 3);
      renderData(slicedArr);
    });
  };


  var clearMap = function () {
    window.onCloseDialog();

    var pins = tokyo.querySelectorAll('.pin');

    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('pin__main')) {
        tokyo.removeChild(pins[i]);
      }
    }
  };

  formFilters.addEventListener('change', function () {
    clearMap();
    renderData(similarApartments.filter(filterApartments));
  });

  var renderData = function (arr) {
    arr.forEach(function (item) {
      fragment.appendChild(window.render(item));
    });
    tokyo.appendChild(fragment);
  };
  return {
    showPin: function (callback) {
      callback();
    },

    deleteClass: function () {
      var activePinNode = document.querySelector('.pin--active');
      if (activePinNode !== null) {
        activePinNode.classList.remove('pin--active');
      }
    },
    loadData: loadData
  };
})();
