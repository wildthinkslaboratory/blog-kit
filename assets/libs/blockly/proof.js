
Blockly.Blocks['proof_icon_prop'] = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldImage('/assets/images/icons/sun.svg', 30, 30), 'ICON');
    this.appendDummyInput().appendField(new Blockly.FieldDropdown(
      [
        ['sun', '/assets/images/icons/sun.svg'], 
        ['rain', '/assets/images/icons/rain.svg'], 
        ['snow', '/assets/images/icons/snow.svg'],
        ['school', '/assets/images/icons/school.svg'],
        ['homework', '/assets/images/icons/homework.svg']
      ]), 
      'DROPDOWN');

    this.setOutput(true, 'Boolean');
    this.setColour('#CCCCFF');
    this.setInputsInline(true);
    this.setOnChange(function(changeEvent) {
      let dropdown_value = this.getFieldValue('DROPDOWN');
      this.getField('ICON').doValueUpdate_(dropdown_value);

    });

  }
};

let propToEnglish = {
  'sun': "it's sunny",
  'rain': "it's raining",
  'snow': "it's snowing",
  'school': "there's school",
  'homework': "I must do my homework"
};

let propToEnglishNegation = {
  'sun': "it's not sunny",
  'rain': "it's not raining",
  'snow': "it's not snowing",
  'school': "there's no school",
  'homework': "I don't have to do my homework"
};



Blockly.defineBlocksWithJsonArray([{
  "type": "proof_proposition",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "symbol",
      "text": "A"
    },
    {
      "type": "field_input",
      "name": "statement",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "negation",
      "text": ""
    }
  ],
  "output": "Boolean",
  "colour": 230,
  "tooltip": "Proposition",
  "helpUrl": ""
},
{
  "type": "proof_not",
  "message0": "not %1",
  "args0": [
    {
      "type": "input_value",
      "name": "prop",
      "check": "Boolean"
    }
  ],
  "output": "Boolean",
  "colour": '#BB77BB',
  "tooltip": "not statement",
  "helpUrl": ""
},
{
  "type": "proof_and",
  "message0": "%1 and %2",
  "args0": [
    {
      "type": "input_value",
      "name": "prop1",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "prop2",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '#BB77BB',
  "tooltip": "and statement",
  "helpUrl": ""
},
{
  "type": "proof_or",
  "message0": "%1 or %2",
  "args0": [
    {
      "type": "input_value",
      "name": "prop1",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "prop2",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '#BB77BB',
  "tooltip": "or statement",
  "helpUrl": ""
},
{
  "type": "proof_if_then",
  "message0": "if %1 then %2",
  "args0": [
    {
      "type": "input_value",
      "name": "premise",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "conclusion",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '#BB77BB',
  "tooltip": "if then statement",
  "helpUrl": ""
},
{
  "type": "proof_contradiction",
  "message0": "contradiction",
  "output": null,
  "colour": '#BB77BB',
  "tooltip": "contradiction",
  "helpUrl": ""
},
{
  "type": "proof_statement",
  "message0": "%1",
  "args0": [
    {
      "type": "input_value",
      "name": "bool_statement",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '#AAAADD',
  "tooltip": "statement",
  "helpUrl": ""
},
{
  "type": "proof_given",
  "message0": "Given: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "bool_statement",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '#AAAADD',
  "tooltip": "statement",
  "helpUrl": ""
},
{
  "type": "proof_if_then_intro",
  "message0": "assume %1 proof %2 conclude %3",
  "args0": [
    {
      "type": "input_value",
      "name": "Assumption",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "proof"
    },
    {
      "type": "input_value",
      "name": "if_then",
      "check": "Boolean"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": '#999999',
  "tooltip": "if then introduction",
  "helpUrl": ""
},
{
  "type": "proof_if_then_elim",
  "message0": "if then %1 premise %2 conclude %3",
  "args0": [
    {
      "type": "input_value",
      "name": "if_then",
      "check": "Boolean",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "premise",
      "check": "Boolean",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "conclusion",
      "check": "Boolean",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": '#999999',
  "tooltip": "if then elimination",
  "helpUrl": ""
},
{
  "type": "proof_not_intro",
  "message0": "assume %1 proof %2 negation %3",
  "args0": [
    {
      "type": "input_value",
      "name": "assumption",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "proof"
    },
    {
      "type": "input_value",
      "name": "negation",
      "check": "Boolean"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "not introduction",
  "helpUrl": ""
},
{
  "type": "proof_contradiction_intro",
  "message0": "proposition %1 negation %2 contradiction %3",
  "args0": [
    {
      "type": "input_value",
      "name": "prop",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "negation",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "contradiction"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "contradiction introduction",
  "helpUrl": ""
},
{
  "type": "proof_and_intro",
  "message0": "p1 %1 p2 %2 conclude %3",
  "args0": [
    {
      "type": "input_value",
      "name": "prop1",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "prop2",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "and",
      "check": "and"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "and introduction",
  "helpUrl": ""
},
{
  "type": "proof_and_elim",
  "message0": "and %1 conclude %2",
  "args0": [
    {
      "type": "input_value",
      "name": "and",
      "check": "and"
    },
    {
      "type": "input_value",
      "name": "prop",
      "check": "Boolean"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "and elimination",
  "helpUrl": ""
},
{
  "type": "proof_or_intro",
  "message0": " %1 conclude %2",
  "args0": [
    {
      "type": "input_value",
      "name": "prop",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "or",
      "check": "or"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "or introduction",
  "helpUrl": ""
},
{
  "type": "proof_or_elim",
  "message0": "or %1 assume 1 %2 proof 1 %3 assume 2 %4 proof 2 %5 conclude %6",
  "args0": [
    {
      "type": "input_value",
      "name": "or",
      "check": "or"
    },
    {
      "type": "input_value",
      "name": "assume1",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "proof1"
    },
    {
      "type": "input_value",
      "name": "assume2",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "proof 2"
    },
    {
      "type": "input_value",
      "name": "conclusion",
      "check": "Boolean"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "or elimination",
  "helpUrl": ""
}]);  // END JSON EXTRACT (Do not delete this comment.)


function clearOuterParentheses(block, name, code) {
  let cleanCode = code
  let targetBlock = block.getInputTargetBlock(name);
  if (targetBlock && (targetBlock.type == 'proof_proposition' || targetBlock.type == 'proof_contradiction')) {
    cleanCode = cleanCode.replace('(', '');
    cleanCode = cleanCode.replace(')', '');
  }
  return cleanCode;
}

///////////////////////////   PROPOSITION.      ///////////////////////////////////

Blockly.English['proof_proposition'] = function(block) {
  let statement = block.getFieldValue('statement');
  let symbol = block.getFieldValue('symbol');
  let code = statement;
  if (statement == '') {
    code = symbol;
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.English.ORDER_NONE];
};

Blockly.English['proof_icon_prop'] = function(block) {
  
  var code = propToEnglish[this.getField('DROPDOWN').getDisplayText_()];

  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.English['proof_statement'] = function(block) {
  let value_name = Blockly.English.valueToCode(block, 'bool_statement', Blockly.English.ORDER_ATOMIC);
  value_name = clearOuterParentheses(block,'bool_statement',value_name);
  let code = value_name + '\n';

  let targetBlock = block.getInputTargetBlock('bool_statement');
  if (targetBlock && targetBlock.type == 'proof_contradiction') {
    code = 'This is a ' + value_name + '\n';
  }

  return code;
};

Blockly.English['proof_given'] = function(block) {
  let value_name = Blockly.English.valueToCode(block, 'bool_statement', Blockly.English.ORDER_ATOMIC) || ' ';
  value_name = clearOuterParentheses(block,'bool_statement',value_name);

  let code = 'Given: ' + value_name + '\n';

  return code;
};


///////////////////////////   CONNECTIVES.      ///////////////////////////////////


Blockly.English['proof_if_then'] = function(block) {
  let value_premise = Blockly.English.valueToCode(block, 'premise', Blockly.English.ORDER_ATOMIC);
  let value_conclusion = Blockly.English.valueToCode(block, 'conclusion', Blockly.English.ORDER_ATOMIC);

  value_premise = clearOuterParentheses(block,'premise',value_premise);
  value_conclusion = clearOuterParentheses(block,'conclusion',value_conclusion);

  let code = 'if ' + value_premise + ', then ' + value_conclusion;
  
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.English.ORDER_NONE];
};

Blockly.English['proof_not'] = function(block) {
  let value_prop = Blockly.English.valueToCode(block, 'prop', Blockly.English.ORDER_ATOMIC);
  let code = 'not ' + value_prop;

  let targetBlock = block.getInputTargetBlock('prop');
  if (targetBlock && targetBlock.type == 'proof_icon_prop') {
    code = propToEnglishNegation[targetBlock.getField('DROPDOWN').getDisplayText_()];
  }

  code = clearOuterParentheses(block,'prop',code);

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.English.ORDER_NONE];
};

Blockly.English['proof_and'] = function(block) {
  let value_prop1 = Blockly.English.valueToCode(block, 'prop1', Blockly.English.ORDER_ATOMIC);
  let value_prop2 = Blockly.English.valueToCode(block, 'prop2', Blockly.English.ORDER_ATOMIC);

  value_prop1 = clearOuterParentheses(block,'prop1',value_prop1);
  value_prop2 = clearOuterParentheses(block,'prop2',value_prop2);

  let code = value_prop1 + ' and ' + value_prop2;

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.English.ORDER_NONE];
};

Blockly.English['proof_or'] = function(block) {
  let value_prop1 = Blockly.English.valueToCode(block, 'prop1', Blockly.English.ORDER_ATOMIC);
  let value_prop2 = Blockly.English.valueToCode(block, 'prop2', Blockly.English.ORDER_ATOMIC);

  value_prop1 = clearOuterParentheses(block,'prop1',value_prop1);
  value_prop2 = clearOuterParentheses(block,'prop2',value_prop2);

  let code = value_prop1 + ' or ' + value_prop2;

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.English.ORDER_NONE];
};

Blockly.English['proof_contradiction'] = function(block) {
  // TODO: Assemble English into code letiable.
  let code = 'CONTRADICTION';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.English.ORDER_NONE];
};

///////////////////////////   INTRO AND ELIM      ///////////////////////////////////


Blockly.English['proof_if_then_intro'] = function(block) {
  let value_assumption = Blockly.English.valueToCode(block, 'Assumption', Blockly.English.ORDER_ATOMIC);
  let statements_proof = Blockly.English.statementToCode(block, 'proof');
  let conclusion = Blockly.English.valueToCode(block, 'if_then', Blockly.English.ORDER_ATOMIC);

  let code = 'Assume ' + value_assumption + '\n';
  code += 'It follows that: \n' + statements_proof + '\n';
  code += 'We conclude that ' + conclusion;
  
  code = code.replaceAll('(', '');
  code = code.replaceAll(')', '');

  return code;
};


Blockly.English['proof_if_then_elim'] = function(block) {
  let value_if_then = Blockly.English.valueToCode(block, 'if_then', Blockly.English.ORDER_ATOMIC);
  let value_premise = Blockly.English.valueToCode(block, 'premise', Blockly.English.ORDER_ATOMIC);
  let value_conclusion = Blockly.English.valueToCode(block, 'conclusion', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = 'We know that ' + value_if_then + '\n';
  code += 'We also know that ' + value_premise + '\n';
  code += 'We can conclude that ' + value_conclusion + '\n';
  return code;
};



Blockly.English['proof_not_intro'] = function(block) {
  let value_assumption = Blockly.English.valueToCode(block, 'assumption', Blockly.English.ORDER_ATOMIC);
  let statements_proof = Blockly.English.statementToCode(block, 'proof');
  let value_negation = Blockly.English.valueToCode(block, 'negation', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = '...;\n';
  return code;
};

Blockly.English['proof_contradiction_intro'] = function(block) {
  let value_prop = Blockly.English.valueToCode(block, 'prop', Blockly.English.ORDER_ATOMIC);
  let value_negation = Blockly.English.valueToCode(block, 'negation', Blockly.English.ORDER_ATOMIC);
  let value_contradiction = Blockly.English.valueToCode(block, 'contradiction', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = '...;\n';
  return code;
};


Blockly.English['proof_and_intro'] = function(block) {
  let value_prop1 = Blockly.English.valueToCode(block, 'prop1', Blockly.English.ORDER_ATOMIC);
  let value_prop2 = Blockly.English.valueToCode(block, 'prop2', Blockly.English.ORDER_ATOMIC);
  let value_and = Blockly.English.valueToCode(block, 'and', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = '...;\n';
  return code;
};

Blockly.English['proof_and_elim'] = function(block) {
  let value_and = Blockly.English.valueToCode(block, 'and', Blockly.English.ORDER_ATOMIC);
  let value_prop = Blockly.English.valueToCode(block, 'prop', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = '...;\n';
  return code;
};

Blockly.English['proof_or_intro'] = function(block) {
  let value_prop = Blockly.English.valueToCode(block, 'prop', Blockly.English.ORDER_ATOMIC);
  let value_or = Blockly.English.valueToCode(block, 'or', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = '...;\n';
  return code;
};

Blockly.English['proof_or_elim'] = function(block) {
  let value_or = Blockly.English.valueToCode(block, 'or', Blockly.English.ORDER_ATOMIC);
  let value_assume1 = Blockly.English.valueToCode(block, 'assume1', Blockly.English.ORDER_ATOMIC);
  let statements_proof1 = Blockly.English.statementToCode(block, 'proof1');
  let value_assume2 = Blockly.English.valueToCode(block, 'assume2', Blockly.English.ORDER_ATOMIC);
  let statements_proof_2 = Blockly.English.statementToCode(block, 'proof 2');
  let value_conclusion = Blockly.English.valueToCode(block, 'conclusion', Blockly.English.ORDER_ATOMIC);
  // TODO: Assemble English into code letiable.
  let code = '...;\n';
  return code;
};