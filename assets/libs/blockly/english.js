/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating English for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.English');

// goog.require('Blockly.Generator');
// goog.require('Blockly.utils.global');
// goog.require('Blockly.utils.string');


/**
 * English code generator.
 * @type {!Blockly.Generator}
 */
Blockly.English = new Blockly.Generator('English');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.English.addReservedWords(
    // https://developer.mozilla.org/en-US/docs/Web/English/Reference/Lexical_grammar#Keywords
    'break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,' +
    'implements,interface,let,package,private,protected,public,static,' +
    'await,' +
    'null,true,false,' +
    // Magic variable.
    'arguments,' +
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/English/Reference/Operators/Operator_Precedence
 */
Blockly.English.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.English.ORDER_NEW = 1.1;            // new
Blockly.English.ORDER_MEMBER = 1.2;         // . []
Blockly.English.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.English.ORDER_INCREMENT = 3;        // ++
Blockly.English.ORDER_DECREMENT = 3;        // --
Blockly.English.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.English.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.English.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.English.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.English.ORDER_TYPEOF = 4.5;         // typeof
Blockly.English.ORDER_VOID = 4.6;           // void
Blockly.English.ORDER_DELETE = 4.7;         // delete
Blockly.English.ORDER_AWAIT = 4.8;          // await
Blockly.English.ORDER_EXPONENTIATION = 5.0; // **
Blockly.English.ORDER_MULTIPLICATION = 5.1; // *
Blockly.English.ORDER_DIVISION = 5.2;       // /
Blockly.English.ORDER_MODULUS = 5.3;        // %
Blockly.English.ORDER_SUBTRACTION = 6.1;    // -
Blockly.English.ORDER_ADDITION = 6.2;       // +
Blockly.English.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.English.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.English.ORDER_IN = 8;               // in
Blockly.English.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.English.ORDER_EQUALITY = 9;         // == != === !==
Blockly.English.ORDER_BITWISE_AND = 10;     // &
Blockly.English.ORDER_BITWISE_XOR = 11;     // ^
Blockly.English.ORDER_BITWISE_OR = 12;      // |
Blockly.English.ORDER_LOGICAL_AND = 13;     // &&
Blockly.English.ORDER_LOGICAL_OR = 14;      // ||
Blockly.English.ORDER_CONDITIONAL = 15;     // ?:
Blockly.English.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.English.ORDER_YIELD = 17;           // yield
Blockly.English.ORDER_COMMA = 18;           // ,
Blockly.English.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.English.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.English.ORDER_FUNCTION_CALL, Blockly.English.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.English.ORDER_FUNCTION_CALL, Blockly.English.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.English.ORDER_MEMBER, Blockly.English.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.English.ORDER_MEMBER, Blockly.English.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.English.ORDER_LOGICAL_NOT, Blockly.English.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.English.ORDER_MULTIPLICATION, Blockly.English.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.English.ORDER_ADDITION, Blockly.English.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.English.ORDER_LOGICAL_AND, Blockly.English.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.English.ORDER_LOGICAL_OR, Blockly.English.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.English.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.English.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.English.functionNames_ = Object.create(null);

  if (!Blockly.English.variableDB_) {
    Blockly.English.variableDB_ =
        new Blockly.Names(Blockly.English.RESERVED_WORDS_);
  } else {
    Blockly.English.variableDB_.reset();
  }

  Blockly.English.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.English.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.English.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.English.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.English.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.English.definitions_) {
    definitions.push(Blockly.English.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.English.definitions_;
  delete Blockly.English.functionNames_;
  Blockly.English.variableDB_.reset();
  //return definitions.join('\n\n') + '\n\n\n' + code;
  return code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.English.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped English string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} English string.
 * @private
 */
Blockly.English.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Encode a string as a properly escaped multiline English string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} English string.
 * @private
 */
Blockly.English.multiline_quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  var lines = string.split(/\n/g).map(Blockly.English.quote_);
  return lines.join(' + \'\\n\' +\n');
};

/**
 * Common tasks for generating English from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The English code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} English code with comments and subsequent blocks added.
 * @private
 */
Blockly.English.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.English.COMMENT_WRAP - 3);
      commentCode += Blockly.English.prefixLines(comment + '\n', '// ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.English.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.English.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.English.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.English.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.English.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.English.valueToCode(block, atId,
        Blockly.English.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.English.valueToCode(block, atId,
        Blockly.English.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.English.valueToCode(block, atId,
        Blockly.English.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.English.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = Number(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.English.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.English.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-' + at + '';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.English.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = ' ' + at + ' ';
    }
  }
  return at;
};
