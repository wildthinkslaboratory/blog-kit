

const NDGenerator = new Blockly.Generator('NaturalDeduction');

function remove_outer_parentheses(text) {
	if (text.length == 0) return text;
	if (text[0] == '(' && text[text.length-1] == ')') {
		return text.slice(1, text.length-1);
	}
	return text;
}



NDGenerator.ORDER_ATOMIC = 0;
NDGenerator.ORDER_NEGATION = 1;
NDGenerator.ORDER_AND = 2;
NDGenerator.ORDER_OR = 3;
NDGenerator.ORDER_IF_THEN = 4;

NDGenerator.ORDER_NONE = 100;
NDGenerator.INDENT = '  ';


NDGenerator['proof_icon_prop'] = function(block) {
  const code = this.getField('DROPDOWN').getDisplayText_();
  return [code, NDGenerator.ORDER_NONE];
};



NDGenerator['proof_contradiction'] = function(block) {
  const code = '\u22A5';
  return [code, NDGenerator.ORDER_NONE];
};



NDGenerator['proof_not'] = function(block) {
  let value_prop = NDGenerator.valueToCode(block, 'prop', NDGenerator.ORDER_ATOMIC);
  let propBlock = block.getInputTargetBlock('prop');

  if (propBlock && propBlock.type == 'proof_icon_prop') {
  	value_prop = remove_outer_parentheses(value_prop);
  }
  let code = '\u00AC' + value_prop;

  return [code, NDGenerator.ORDER_NEGATION];
};



NDGenerator['proof_if_then'] = function(block) {
  let value_premise = NDGenerator.valueToCode(block, 'premise', NDGenerator.ORDER_ATOMIC);
  let premiseBlock = block.getInputTargetBlock('premise');
  if (premiseBlock && premiseBlock.type == 'proof_icon_prop') {
  	value_premise = remove_outer_parentheses(value_premise);
  }

  let value_conclusion = NDGenerator.valueToCode(block, 'conclusion', NDGenerator.ORDER_ATOMIC);
  let conclusionBlock = block.getInputTargetBlock('conclusion');
  if (conclusionBlock && conclusionBlock.type == 'proof_icon_prop') {
  	value_conclusion = remove_outer_parentheses(value_conclusion);
  }

  let code = value_premise + ' \u2192 ' + value_conclusion;

  return [code, NDGenerator.ORDER_IF_THEN];
};



NDGenerator['proof_and'] = function(block) {
  let value_prop1 = NDGenerator.valueToCode(block, 'prop1', NDGenerator.ORDER_ATOMIC);
  let prop1Block = block.getInputTargetBlock('prop1');
  if (prop1Block && prop1Block.type == 'proof_icon_prop') {
  	value_prop1 = remove_outer_parentheses(value_prop1);
  }

  let value_prop2 = NDGenerator.valueToCode(block, 'prop2', NDGenerator.ORDER_ATOMIC);
  let prop2Block = block.getInputTargetBlock('prop2');
  if (prop2Block && prop2Block.type == 'proof_icon_prop') {
  	value_prop2 = remove_outer_parentheses(value_prop2);
  }

  let code = value_prop1 + ' \u2227 ' + value_prop2;

  return [code, NDGenerator.ORDER_AND];
};



NDGenerator['proof_or'] = function(block) {
  let value_prop1 = NDGenerator.valueToCode(block, 'prop1', NDGenerator.ORDER_ATOMIC);
  let prop1Block = block.getInputTargetBlock('prop1');
  if (prop1Block && prop1Block.type == 'proof_icon_prop') {
  	value_prop1 = remove_outer_parentheses(value_prop1);
  }

  let value_prop2 = NDGenerator.valueToCode(block, 'prop2', NDGenerator.ORDER_ATOMIC);
  let prop2Block = block.getInputTargetBlock('prop2');
  if (prop2Block && prop2Block.type == 'proof_icon_prop') {
  	value_prop2 = remove_outer_parentheses(value_prop2);
  }

  let code = value_prop1 + ' \u2228 ' + value_prop2;

  return [code, NDGenerator.ORDER_AND];
};

NDGenerator['proof_statement'] = function(block) {
  let value_name = NDGenerator.valueToCode(block, 'bool_statement', NDGenerator.ORDER_ATOMIC);
  value_name = remove_outer_parentheses(value_name);
  return value_name + '\n';
};

NDGenerator['proof_given'] = function(block) {
  let value_name = NDGenerator.valueToCode(block, 'bool_statement', NDGenerator.ORDER_ATOMIC);
  value_name = remove_outer_parentheses(value_name);
  return 'Given: ' + value_name + '\n';
};

NDGenerator['proof_if_then_intro'] = function(block) {
  const assumption = 'Assume: ' + NDGenerator.valueToCode(block, 'Assumption', NDGenerator.ORDER_ATOMIC);
  let statements_proof = NDGenerator.statementToCode(block,'proof');
  if (statements_proof) {
  	statements_proof = NDGenerator.prefixLines(
  		statements_proof, 
  		NDGenerator.INDENT);
  }
  else { statements_proof = ''; }
  const conclusion = 'Conclude: ' + NDGenerator.valueToCode(block, 'if_then', NDGenerator.ORDER_ATOMIC);
  
  return assumption + '\n' + statements_proof + conclusion + '\n';
};

NDGenerator.finish = function(code) {
  return code;
};


NDGenerator.scrubNakedValue = function(line) {
  return line + '\n';
};

NDGenerator.scrub_ = function(block, code, opt_thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = opt_thisOnly ? '' : NDGenerator.blockToCode(nextBlock);
  return code +  nextCode;
};



