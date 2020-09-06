window.pcs = function (id) {
  'use strict';

  function get(id) {
    return document.getElementById(id);
  }

  function setCss(element, property, value) {
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function getColors() {
    let rndmColors = [];
    for (let i = 0; i < 3; i++) {
      rndmColors.push(Math.floor(Math.random() * 255));
    }
    return rndmColors;
  }

  function getRgb(rgbArray) {
    return 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
  }

  function setColors(element, property) {
    setCss(element, property, getRgb(getColors()));
  }

  let dataList = new Map();
  const theElem = get(id);

  return {
    /*setCss: (property, value) => setCss(theElem, property, value),
    getCss: property => getCss(theElem, property),*/
    css: function (property, value) {
      if (arguments.length < 2) { // get
        return getCss(theElem, property);
      }
      setCss(theElem, property, value);
      return this;
    },
    click: function (callback) {
      theElem.addEventListener('click', callback);
      return this;
    },
    hide: function () {
      setCss(theElem, 'display', 'none');
      return this;
    },
    show: function () {
      setCss(theElem, 'display', 'block');
      return this;
    },
    rndmColors: function (property = 'color', length = 1000, speed = 500) {
      const intervalId = setInterval(() => setColors(theElem, property), speed);
      setTimeout(() => {
        clearInterval(intervalId);
      }, length);
    },
    data: function (key, value) {
      if (arguments.length > 1) {
        dataList.set(key, value);
      } else {
        return console.log(dataList.get(key));
      }
    }
  };
};