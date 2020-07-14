---
title: Blockly Demo 
header: 'none'
smartdown: true
---
### Blockly Demo

[Show Javascript](:=show=true) [Run Javascript](:=run=true)
```javascript /autoplay
//smartdown.import=/assets/libs/blockly/blockly_compressed.js
//smartdown.import=/assets/libs/blockly/blocks_compressed.js
//smartdown.import=/assets/libs/blockly/msg/js/en.js
//smartdown.import=/assets/libs/blockly/javascript_compressed.js

const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';
myDiv.innerHTML = 
`<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
<xml id="toolbox" style="display: none">
  <block type="controls_if"></block>
  <block type="controls_repeat_ext"></block>
  <block type="logic_compare"></block>
  <block type="math_number"></block>
  <block type="math_arithmetic"></block>
  <block type="text"></block>
  <block type="text_print"></block>
</xml>

  <xml xmlns="https://developers.google.com/blockly/xml" id="startBlocks" style="display: none">
    <block type="controls_if" inline="false" x="20" y="20">
      <mutation else="1"></mutation>
      <value name="IF0">
        <block type="logic_compare" inline="true">
          <field name="OP">EQ</field>
          <value name="A">
            <block type="math_arithmetic" inline="true">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">6</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">7</field>
                </block>
              </value>
            </block>
          </value>
          <value name="B">
            <block type="math_number">
              <field name="NUM">42</field>
            </block>
          </value>
        </block>
      </value>
      <statement name="DO0">
        <block type="text_print" inline="false">
          <value name="TEXT">
            <block type="text">
              <field name="TEXT">Don't panic</field>
            </block>
          </value>
        </block>
      </statement>
      <statement name="ELSE">
        <block type="text_print" inline="false">
          <value name="TEXT">
            <block type="text">
              <field name="TEXT">Panic</field>
            </block>
          </value>
        </block>
      </statement>
    </block>
  </xml>
  `

let blocklyDiv = document.getElementById('blocklyDiv');
// let demoWorkspace = Blockly.inject(blocklyDiv,
//     {toolbox: document.getElementById('toolbox')});

let demoWorkspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
                           demoWorkspace);

function showCode() {
  // Generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  let code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  alert(code);
}

function runCode() {
  // Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  let code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}


this.sizeChanged = function() {
  blocklyDiv.style.width = window.innerWidth * 0.8 + 'px';
  blocklyDiv.style.height = window.innerHeight * 0.7 + 'px';
  Blockly.svgResize(demoWorkspace);
};

this.sizeChanged();
smartdown.setVariable('show', false);
smartdown.setVariable('run', false);

this.dependOn = ['show', 'run'];
this.depend = function() {
	if (env.show == true) {
		smartdown.setVariable('show', false);
		showCode();
	}

	if (env.run == true) {
		smartdown.setVariable('run', false);
		runCode();
	}
}

```