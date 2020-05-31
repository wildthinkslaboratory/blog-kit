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


class Task {
  constructor(document, wrapperId, taskId) {
    this.wrapper = document.getElementById(wrapperId);
    this.wrapper.style.width = "50%";
    this.task = document.getElementById(taskId);
    this.task.classList.remove('decoration-aliceblue');
    this.task.classList.add('task');
  }
}

class Note {
  constructor(document, wrapperId, taskId) {
    this.wrapper = document.getElementById(wrapperId);
    this.wrapper.style.width = "80%";
    this.task = document.getElementById(taskId);
    this.task.classList.remove('decoration-aliceblue');
    this.task.classList.add('note');
  }
}

class Alert {
  constructor(document, wrapperId, taskId) {
    this.wrapper = document.getElementById(wrapperId);
    this.wrapper.style.width = "50%";
    this.task = document.getElementById(taskId);
    this.task.classList.remove('decoration-aliceblue');
    this.task.classList.add('alert');
  }
}
let dummy = 5;

hintChecker = {
  'equals' : function(answer, value) { return answer == value; },
  'contains' : function(answer, value) { return answer.includes(value); },
}

class ProblemAnswer{
  constructor(answers, hints) {
    this.answers = answers;
    this.hints = hints;


  }

  checkAnswer(answer) {
    return this.answers.includes(answer);
  }

  checkHints(answer) {
    for (let i=0; i < this.hints.length; i++) {
      let [constraint, value, hint] = this.hints[i];

      if (hintChecker[constraint](answer,value)) {
        return 'Hint: ' + hint;
      }
    }
    return 'Keep trying.';
  }
}


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
  exports.Task = Task;
  exports.Note = Note;
  exports.Alert = Alert;
  exports.ProblemAnswer = ProblemAnswer;
  exports.dummy = dummy;



});

