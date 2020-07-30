---
title: Blockly Demo 
header: 'none'
smartdown: true
---
### Blockly Demo

```javascript /autoplay
//smartdown.import=https://unpkg.com/blockly@3.20200625.2/blockly.min.js
//smartdown.import=/assets/libs/blockly/english.js
//smartdown.import=/assets/libs/blockly/proof.js



//smartdown.showDisclosure('proof','','transparent,topleft,draggable,shadow,outline');


this.div.innerHTML = 
`<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Proposition">
    <block type="proof_proposition"></block>
    <block type="proof_statement"></block>
    <block type="proof_given"></block>
    <block type="proof_icon_prop"></block>
  </category>
  <category name="Connectives">
    <block type="proof_not"></block>
    <block type="proof_or"></block>
    <block type="proof_and"></block>
    <block type="proof_if_then"></block>
    <block type="proof_contradiction"></block>
  </category>
  <category name="Not">
    <block type="proof_not_intro"></block>
    <block type="proof_contradiction_intro"></block>
  </category>
  <category name="Or">
    <block type="proof_or_intro"></block>
    <block type="proof_or_elim"></block>
  </category>
  <category name="And">
    <block type="proof_and_intro"></block>
    <block type="proof_and_elim"></block>
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




this.sizeChanged = function() {
  blocklyDiv.style.width = window.innerWidth * 0.8 + 'px';
  blocklyDiv.style.height = window.innerHeight * 0.7 + 'px';
  Blockly.svgResize(demoWorkspace);
};

this.sizeChanged();

function updateCode(event) {
  let blocks = demoWorkspace.getTopBlocks(true);
  showProof();
}
demoWorkspace.addChangeListener(updateCode);


smartdown.setVariable('show', false);
smartdown.setVariable('run', false);
smartdown.setVariable('javascriptCode', '');


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
 
# :::: proof
<xml xmlns="https://developers.google.com/blockly/xml" id="startBlocks" style="display: none">
  <block type="proof_given" x="20" y="20">
    <value name="bool_statement">
      <block type="proof_if_then" >
        <value name="premise">
          <block type="proof_proposition" >
            <field name="symbol">FRIDAY</field>
            <field name="statement">it's Friday</field>
            <field name="negation">it's not Friday</field>
          </block>
        </value>
        <value name="conclusion">
          <block type="proof_not">
            <value name="prop">
              <block type="proof_proposition">
                <field name="symbol">SCHOOL_TOMORROW</field>
                <field name="statement">there's school tomorrow</field>
                <field name="negation">there's no school tomorrow</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="proof_given" x="20" y="20">
        <value name="bool_statement">
          <block type="proof_if_then" >
            <value name="premise">
              <block type="proof_not">
                <value name="prop">
                  <block type="proof_proposition">
                    <field name="symbol">SCHOOL_TOMORROW</field>
                    <field name="statement">there's school tomorrow</field>
                    <field name="negation">there's no school tomorrow</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="conclusion">
              <block type="proof_not">
                <value name="prop">
                  <block type="proof_proposition">
                    <field name="symbol">HOMEWORK_TONIGHT</field>
                    <field name="statement">I have homework tonight</field>
                    <field name="negation">I have no homework tonight</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="proof_if_then_intro">
            <value name="Assumption">
              <block type="proof_proposition" >
                <field name="symbol">FRIDAY</field>
                <field name="statement">it's Friday</field>
                <field name="negation">it's not Friday</field>
              </block>
            </value>
            <statement name="proof">
              <block type="proof_statement">
                <value name="bool_statement">
                  <block type="proof_not">
                    <value name="prop">
                      <block type="proof_proposition">
                        <field name="symbol">SCHOOL_TOMORROW</field>
                        <field name="statement">there's school tomorrow</field>
                        <field name="negation">there's no school tomorrow</field>
                      </block>
                    </value>
                  </block>            
                </value>
                <next>
                  <block type="proof_statement">
                    <value name="bool_statement">
                      <block type="proof_not">
                        <value name="prop">
                          <block type="proof_proposition">
                            <field name="symbol">HOMEWORK_TONIGHT</field>
                            <field name="statement">I have homework tonight</field>
                            <field name="negation">I have no homework tonight</field>
                          </block>
                        </value>
                      </block>                 
                    <value>
                  </block>
                </next>
              </block>
            </statement>
            <value name="if_then">
              <block type="proof_if_then" >
                <value name="premise">
                  <block type="proof_proposition" >
                    <field name="symbol">FRIDAY</field>
                    <field name="statement">it's Friday</field>
                    <field name="negation">it's not Friday</field>
                  </block>
                </value>
                <value name="conclusion">
                  <block type="proof_not">
                    <value name="prop">
                      <block type="proof_proposition">
                        <field name="symbol">HOMEWORK_TONIGHT</field>
                        <field name="statement">I have homework tonight</field>
                        <field name="negation">I have no homework tonight</field>
                      </block>
                    </value>
                  </block> 
                </value>
              </block>

            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
# ::::