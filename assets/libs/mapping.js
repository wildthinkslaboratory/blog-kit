let onAFFactory = function(formula, showFunction) {
  return function() {
    formula.classList.remove('highlightOffNarrow');
    formula.classList.add('highlightOnNarrow');
    showFunction();
  };
}

let offAFFactory = function(formula, hideFunction) {
  return function() {
    formula.classList.remove('highlightOnNarrow');
    formula.classList.add('highlightOffNarrow');
    hideFunction();
  };
}

let onWideAFFactory = function(formula, showFunction) {
  return function() {
    formula.classList.remove('highlightOffWide');
    formula.classList.add('highlightOnWide');
    showFunction();
  };
}

let offWideAFFactory = function(formula, hideFunction) {
  return function() {
    formula.classList.remove('highlightOnWide');
    formula.classList.add('highlightOffWide');
    hideFunction();
  };
}

let dummy = 5;


///////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    let mod = {
      exports: {}
    };
    factory(mod.exports);
    global.maplib = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.onWideAFFactory = onWideAFFactory;
  exports.offWideAFFactory = offWideAFFactory;
  exports.onAFFactory = onAFFactory;
  exports.offAFFactory = offAFFactory;
  exports.dummy = dummy;



});

