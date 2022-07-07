### Blockly Proof Demo

```javascript /autoplay
//smartdown.import=https://unpkg.com/blockly@3.20200625.2/blockly.min.js
//smartdown.import=/assets/libs/blockly/english.js
//smartdown.import=/assets/libs/blockly/nd.js
//smartdown.import=/assets/libs/blockly/proof.js



smartdown.showDisclosure('proof','','transparent,bottomleft,draggable,shadow,outline');
smartdown.showDisclosure('xml','','transparent,bottomright,draggable,shadow,outline');


this.div.innerHTML = 
`<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Proposition">
    <block type="proof_icon_prop"></block>
    <block type="proof_statement"></block>
    <block type="proof_given"></block>
  </category>
  <category name="Connectives">
    <block type="proof_not"></block>
    <block type="proof_or"></block>
    <block type="proof_and"></block>
    <block type="proof_if_then"></block>
    <block type="proof_contradiction"></block>
  </category>
  <category name="If Then">
    <block type="proof_if_then_intro"></block>
    <block type="proof_if_then_elim"></block>
  </category>
</xml>
`


let blocklyDiv = document.getElementById('blocklyDiv');
let demoWorkspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox')});
// Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
//                            demoWorkspace);
                         

function showProof() {
  // Generate JavaScript code and display it.
  Blockly.English.INFINITE_LOOP_TRAP = null;
  let code = Blockly.English.workspaceToCode(demoWorkspace);
  code = '\`\`\`\n' + code + '\n\`\`\`';
  smartdown.setVariable('javascriptCode', code);
}

function toND() {
  let code = NDGenerator.workspaceToCode(demoWorkspace);
  code = '\`\`\`\n' + code + '\n\`\`\`';
  smartdown.setVariable('javascriptCode', code);
}


function blocksToXml() {
  let xmlDom = Blockly.Xml.workspaceToDom(demoWorkspace);
  //let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  let xml_text = Blockly.Xml.domToText(xmlDom);
  smartdown.setVariable('xmlCode', xml_text);
}

this.sizeChanged = function() {
  blocklyDiv.style.width = window.innerWidth * 0.8 + 'px';
  blocklyDiv.style.height = window.innerHeight * 0.7 + 'px';
  Blockly.svgResize(demoWorkspace);
};

this.sizeChanged();

function updateCode(event) {
  let blocks = demoWorkspace.getTopBlocks(true);
  //showProof();
  //blocksToXml();
  toND();
}
demoWorkspace.addChangeListener(updateCode);


smartdown.setVariable('show', false);
smartdown.setVariable('run', false);
smartdown.setVariable('javascriptCode', '');
smartdown.setVariable('xmlCode', '');


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

# :::: proof
# --outlinebox olb

##### Proof
[](:!javascriptCode|markdown)

# --outlinebox 
# ::::
 
# :::: xml
# --outlinebox olb2

##### XML
[](:!xmlCode|markdown)

# --outlinebox 
# ::::

