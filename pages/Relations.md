# Relations

Let's start with a puzzle.  Here's a set of stuff.

![halfwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/2fc4fa2c4a8f54b0e90cd11451dc189cfb1568f8/stuff.jpeg)

Here are a bunch of pairs (groups of two) that we've made from our stuff. Twelve pairs to be exact. Together, these pairs describe a relationship that exists between our stuff.  Can you guess what it is?  See if you can get it by just looking at the pairs and then click on the pairs one by one to add them to a graph.  

```d3/autoplay


smartdown.importCssCode(
`
.link {
  stroke: #000;
  stroke-width: 4;
  fill: none;
}

.inactive {
	display: none;
}

`);


var nodes = [
	{
		name: 'fox',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/fox.jpeg',
	 	x: 0.25,
	 	y: 0.17,
	 	active: false
	 	},
	{
		name: 'owl',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/owl.jpeg',
	 	x: 0.75,
	 	y: 0.17,
	 	active: false 
	 	},
	{
		name: 'rabbit',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/rabbit.jpeg',
	 	x: 0.125,
	 	y: 0.5,
	 	active: false 
	 	},
	{
		name: 'mouse',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/mouse.jpeg',
	 	x: 0.375,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'bird',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/bird.jpeg',
	 	x: 0.625,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'cricket',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/cricket.jpeg',
	 	x: 0.875,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'wheat',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/wheat.jpeg',
	 	x: 0.83,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'grass',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/grass.jpeg',
	 	x: 0.5,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'carrot',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/carrot.jpeg',
	 	x: 0.17,
	 	y: 0.83,
	 	active: false  
	 	} 
];

var links = [
  {source: 0, target: 2, exitAdj: 'W', enterAdj: 'N', id: 0, active: true},
  {source: 0, target: 3, exitAdj: 'S', enterAdj: 'N', id: 1, active: true},
  {source: 0, target: 4, exitAdj: 'E', enterAdj: 'N', id: 2, active: true},
  {source: 1, target: 3, exitAdj: 'W', enterAdj: 'E', id: 3, active: true},
  {source: 1, target: 5, exitAdj: 'S', enterAdj: 'N', id: 4, active: true},
  {source: 2, target: 7, exitAdj: 'S', enterAdj: 'N', id: 5, active: true},
  {source: 2, target: 8, exitAdj: 'S', enterAdj: 'N', id: 6, active: true},
  {source: 3, target: 6, exitAdj: 'S', enterAdj: 'W', id: 7, active: true},
  {source: 4, target: 5, exitAdj: 'E', enterAdj: 'W', id: 8, active: true},
  {source: 4, target: 6, exitAdj: 'S', enterAdj: 'N', id: 9, active: true},
  {source: 5, target: 6, exitAdj: 'S', enterAdj: 'N', id: 10, active: true},
  {source: 5, target: 7, exitAdj: 'S', enterAdj: 'E', id: 11, active: true}
];

var dagLinks = [];


	


var target = this.div;
target.style.height = '100%';
target.style.width = '96%';
const pageWidth = target.offsetWidth;
const width = pageWidth * 0.75;
const xDivider = width * 0.25;
const height = width * 0.66;
const imgSize = height/6;
const linkImageSize = height/ links.length;
const linkWidth = xDivider/4;



function xAdjustment(heading) {
	if (heading == 'E') {
		return imgSize/2;
	}
	else if (heading == 'W') {
		return -imgSize/2;
	}
	return 0;
}

function yAdjustment(heading) {
	if (heading == 'S') {
		return imgSize/2;
	}
	else if (heading == 'N') {
		return -imgSize/2;
	}
	return 0;
}

var svg = d3.select(target)
			.append('svg')
			.attr('width',pageWidth)
			.attr('height', height);

	// define arrow markers for graph links
	svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  	.append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');


var pairs =	svg.selectAll('g')
   		.data(links)
   		.enter()
   		.append('g')
   		.attr('class', 'pair')
   		.on('click', function(d,i) {
   			if (d.active == true) {
        		dagLinks.push(d);
      			d.active = false;
      			nodes[d.source].active = true;
      			nodes[d.target].active = true;
        		render();	
			}
   		});


  	pairs.append('image')
  		.attr('xlink:href', function(l) {
			var sourceNode = nodes.filter(function(d, i) {
       		return i == l.source;
     		})[0];
			return sourceNode.url;
		})
		.attr('x', linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height',linkImageSize - 5);

	pairs.append('image')
		.attr('xlink:href', function(l) {
			var targetNode = nodes.filter(function(d, i) {
       		return i == l.target;
     		})[0];
			return targetNode.url;
		})
		.attr('x', 2*linkWidth + linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height', linkImageSize - 5);


	pairs.append('line')
		.classed('link', true)
  		.attr('x1', 1.5 * linkWidth)
  		.attr('y1', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr('x2', 2.25 * linkWidth)
  		.attr('y2', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr("marker-end", "url(#end-arrow)");

const duration = 2000;

function render() {

	svg.selectAll('g.pair')
		.data(links)
		.filter(function(d) { return d.active == false; })
		.classed('inactive', true);


  	svg.selectAll('node_image')
    .data(nodes.filter(function(d){ return d.active == true; }))
  	.enter()
  	.append('image')
	.attr('xlink:href', function(d) {
		return d.url;
		})
	.attr('x', function(d) {
		return d.x * width - imgSize/2 + xDivider;
		} )
	.attr('y', function(d) {
		return d.y * height - imgSize/2;
		})
	.attr('width',imgSize)
	.attr('height',imgSize);

	svg.selectAll('link') 
	.data(dagLinks)
	.enter();

	svg.selectAll("link")
   .data(dagLinks)
   .enter()
   .append("path")
   .attr("class", "link")
   .attr("d", function(l) {
   	var sourceNode = nodes.filter(function(d, i) {
       return i == l.source;
     })[0];
    const targetNode = nodes.filter(function(d, i) {
       return i == l.target;
     })[0];
    const xStart = xDivider + sourceNode.x * width + xAdjustment(l.exitAdj);
    const yStart = sourceNode.y * height + yAdjustment(l.exitAdj);
    const xControlPt1 = xStart + xAdjustment(l.exitAdj);
    const yControlPt1 = yStart + yAdjustment(l.exitAdj);
    const xEnd = xDivider + targetNode.x * width + xAdjustment(l.enterAdj);
    const yEnd = targetNode.y * height + yAdjustment(l.enterAdj);
    const xControlPt2 = xEnd + xAdjustment(l.enterAdj);
    const yControlPt2 = yEnd + yAdjustment(l.enterAdj);
    return `M ${xStart}, ${yStart} C ${xControlPt1}, ${yControlPt1} 
    		${xControlPt2}, ${yControlPt2} 
    		${xEnd}, ${yEnd}`;
   	})
   .attr("marker-end", "url(#end-arrow)");

  svg.selectAll('link')
  .data(dagLinks)
  .exit()
  .remove();

}



```
The pairs describe a food web between these plants and animals. The predators are on the top of the hierarchy and have only outgoing arrows. The plants are on the bottom and have only incoming arrows. In every pair, the first thing will eat the second.

Working with pairs like this is a great way to wrap your head around what's going on within or between sets of stuff.  We just pick up two elements and compare them.  We can ask a yes or no question like: "Is this one bigger than that one?" or "Are they the same color?". If we make lots and lots of pairwise comparisons and put all of the answers together, a picture emerges and we can see a pattern. In math we call these pairwise comparisons a relation.

You use relations all the time when you do math, but you may not be aware of them.  Functions, like $f(x) = x + 2$, are relations. Statements like $3 \geq 4$ or $4 \times 3 = 12$ are statements about relations.   Relations give us a way to describe the patterns and relationships we see in the world.  They might describe relationships between numbers or they might describe relationships between other stuff: people, websites, words, ideas, whatever stuff you care about.  

Relations are made from pairs.  So, what's a pair?  It's just two things put together, just as you'd expect. What things?  Anything you want. Lots of things come in pairs.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/6d038aa6b0d21ce503d4628a5dff3a292056030d/pairs.jpeg)

## Ordered Pairs

In math, the order that we put things together in a pair matters.  Here's a more precise definition of a pair.

----

# --outlinebox notation
**Definition 1**
If we have two things $a$ and $b$ we can put them together to form the **ordered pair** $$a \rightarrow b.$$  We can change the order to create the pair $b \rightarrow a$.  The order is important and the pair $a \rightarrow b$ is not the same as the pair $b \rightarrow a$.

The **cartesian product** of two sets $A$ and $B$ is the set of all **ordered pairs** $a \rightarrow b$ that can be made with the first element $a$ being chosen from set $A$ and the second element $b$ being chosen from set $B$.  We sometimes use the symbols $A \times B$ to represent this set of ordered pairs.  

The cartesian product of a single set $A$ is the set of all ordered pairs we can make with the first and second element both being chosen from the set $A$.  Note that this includes pairs of the form $a \rightarrow a$ where the first and second element are the same thing.  This set of pairs can be described with the symbols $A \times A$.

[Notes on Notation and Ordered Pairs](::pair_notation/center,shadow)
[Same definition, more math symbols](::math_def_pair/center/shadow)
# --outlinebox

# :::: math_def_pair

# --outlinebox math_pair
**Definition 1** 
For sets $A$ and $B$ the **cartesian product** of $A$ and $B$ is denoted by $A \times B$ and equals
$$\{a \rightarrow b \, | \, a \in A, \, b \in B \}$$

An element $a \rightarrow b$ of $A \times B$ is called an **ordered pair**.
[Close](::math_def_pair)
# --outlinebox
# ::::

# :::: pair_notation
# --aliceblue pair_notation_dec
#### Notation for Ordered Pairs

The arrow notation $a \rightarrow b$ we use for pairs is not the standard notation.  Pairs are more commonly represented by surrounding two elements $a$ and $b$ with parentheses seperated by a comma $(a,b)$.  Most people's introduction to pairs is graphing points on the two dimensional coordinate plane.  
![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/23e062f0eb125b79970538509b95eae7ef38c957/xyplanepairs.jpeg)
In this narrow context, parentheses pairs make fairly good sense, but here we want to talk about pairs in a much bigger more general context.  
The advantage of the arrow notation is that it makes clear the order of the elements in the pair.  It also looks like an edge in a directed graph which is an intuitive model for learning about relations and functions.  So we'll write pairs with arrows $a \rightarrow b$ so long as it avoids confusion with other notations.

 [Close](::pair_notation)
# --aliceblue
# ::::



We can form a cartesian product between two sets of numbers.



#### --aliceblue example1

**Example 1** 
If $A = \\{ 2,3,4 \\}$ and $B = \\{ 3,5 \\}$, then the *cartesian product* $A \times B$ is the set of pairs

$$ 
\begin{eqnarray}
2 \rightarrow 3 \; \; \; \; \; & 2 \rightarrow 5 \; \; \; \; \;& 3 \rightarrow 3 \\
3 \rightarrow 5 \; \; \; \; \; & 4 \rightarrow 3 \; \; \; \; \;& 4 \rightarrow 5
\end{eqnarray}
$$

A tree diagram is a nice way to visualize a cartesian product. Expand the tree below by clicking on the nodes.

 **A $\times$ B**
```d3/autoplay


smartdown.importCssCode(
`
.node circle {
  fill: #fff;
  stroke: #929;
  stroke-width: 3px;
}

.node text {
  font: 18px sans-serif;
}

.treelink {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

`);


var treeData =
  {
    'name'  : 'A',
    'value': '',
    'children': [
      { 
        'name': 'B',
        'value': '2',
        'children': [
          { 
          	'name': '',
          	'value': '3',
          	'pair': '2 \u2192 3' 
          },
          { 
          	'name': '',
          	'value': '5',
          	'pair': '2 \u2192 5' }
        ]
      },
      { 
        'name': 'B',
        'value': '3',
        'children': [
          { 
          	'name': '',
          	'value': '3',
          	'pair': '3 \u2192 3' 
          },
          { 
          	'name': '',
          	'value': '5',
          	'pair': '3 \u2192 5' 
          }
        ]
      },
      { 
        'name': 'B',
        'value': '4',
        'children': [
          { 
          	'name': '',
          	'value': '3',
          	'pair': '4 \u2192 3' 
          },
          { 
          	'name': '',
          	'value': '5',
          	'pair': '4 \u2192 5'
          }
        ]
      }
    ]
  };


var myDiv = this.div;
myDiv.style.height = '100%';
myDiv.style.width = '96%';
const pageWidth = myDiv.offsetWidth;
const pageHeight = pageWidth * 0.3;


const margin = {top: 20, right: 90, bottom: 30, left: 90};
const width = pageWidth - margin.left - margin.right;
const height = pageHeight - margin.top - margin.bottom;


const closed_fill = '#c5c';  // node color
const open_fill = '#fff';

// a svg drawing with a group added, placed in upper left
var svg = d3.select(myDiv).append('svg')         
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var i = 0;
var duration = 750;  // transition duration


// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);


// Assigns parent, children, height, depth
var root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height/2;
root.y0 = 0;


// Collapse after the second level
root.children.forEach(collapse);
update(root);


// Collapse the node and all it's children
// basically we hide the children by storing the tree in the hidden _children field
// then set children to null
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}


function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', function(d) {
          return d._children ? closed_fill : open_fill;
      });

  // Add labels for set name
  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', function(d) {
      	  	return 7;
          //return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', function(d) {
          return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) { return d.data.name; });

  // Add labels for the set elements
  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', -25)
      .attr('text-anchor', function(d) {
          return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) { return d.data.value; });


  // Add labels for the leaf node pairs
  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', 25)
      .attr('text-anchor', function(d) {
          return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) { return d.data.pair; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', function(d) { 
        return 'translate(' + d.y + ',' + d.x + ')';
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style('fill', function(d) {
        return d._children ? closed_fill : open_fill;
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', function(d) {
          return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.treelink')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'treelink')
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}


```
Notice that the cartesian product $A \times B$ is not the same as the cartesian product $B \times A$, although they have the same number of pairs in them.

 **B $\times$ A**
```d3/autoplay


smartdown.importCssCode(
`
.node circle {
  fill: #fff;
  stroke: #929;
  stroke-width: 3px;
}

.node text {
  font: 18px sans-serif;
}

.treelink {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}


`);

var treeData = 
{
	'name': 'B',
	'value': '',
	'children': [
	{ 
  		'name': 'A',
  		'value': '3',
  		'children': [
		{ 
        	'name': '',
        	'value': '2',
  			'pair': '3 \u2192 2' 
      	},
      	{ 
        	'name': '',
        	'value': '3',
        	'pair': '3 \u2192 3'
      	},
      	{ 
	        'name': '',
	        'value': '4',
	        'pair': '3 \u2192 4'
      	}
  		]
  	},
  	{ 
  		'name': 'A',
  		'value': '5',
  		'children': [
		{ 
	        'name': '',
	        'value': '2',
	  		'pair': '5 \u2192 2' 
      	},
      	{ 
	        'name': '',
	        'value': '3',
	        'pair': '5 \u2192 3'
      	},
      	{ 
	        'name': '',
	        'value': '4',
	        'pair': '5 \u2192 4'
      	}
  		]
  	}
	]	
}



var myDiv = this.div;
myDiv.style.height = '100%';
myDiv.style.width = '96%';
const pageWidth = myDiv.offsetWidth;
const pageHeight = pageWidth * 0.3;


const margin = {top: 20, right: 90, bottom: 30, left: 90};
const width = pageWidth - margin.left - margin.right;
const height = pageHeight - margin.top - margin.bottom;


const closed_fill = '#c5c';  // node color
const open_fill = '#fff';

// a svg drawing with a group added, placed in upper left
var svg = d3.select(myDiv).append('svg')         
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var i = 0;
var duration = 750;  // transition duration


// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);


// Assigns parent, children, height, depth
var root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height/2;
root.y0 = 0;


// Collapse after the second level
root.children.forEach(collapse);
update(root);


// Collapse the node and all it's children
// basically we hide the children by storing the tree in the hidden _children field
// then set children to null
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}


function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', function(d) {
          return d._children ? closed_fill : open_fill;
      });

  // Add labels for set name
  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', function(d) {
            return 7;
          //return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', function(d) {
          return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) { return d.data.name; });

  // Add labels for the set elements
  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', -25)
      .attr('text-anchor', function(d) {
          return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) { return d.data.value; });


  // Add labels for the leaf node pairs
  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', 25)
      .attr('text-anchor', function(d) {
          return d.children || d._children ? 'end' : 'start';
      })
      .text(function(d) { return d.data.pair; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', function(d) { 
        return 'translate(' + d.y + ',' + d.x + ')';
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style('fill', function(d) {
        return d._children ? closed_fill : open_fill;
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr('transform', function(d) {
          return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.treelink')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'treelink')
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}


```
#### --aliceblue



#### --aliceblue example2

**Example 2** 
If $A = \\{ 2,3,4 \\}$ then the *cartesian product* $A \times A$ is the set of pairs

$$ 
\begin{eqnarray}
2 \rightarrow 2 \; \; \; \; \; & 2 \rightarrow 3 \; \; \; \; \;& 2 \rightarrow 4 \\
3 \rightarrow 2 \; \; \; \; \; & 3 \rightarrow 3 \; \; \; \; \;& 3 \rightarrow 4 \\
4 \rightarrow 2 \; \; \; \; \; & 4 \rightarrow 3 \; \; \; \; \;& 4 \rightarrow 4 
\end{eqnarray}
$$

#### --aliceblue


Think about all the possible pairs we could make with our set of stuff from the earlier puzzle.  There's a lot of them. There are $9$ ways we could pick the first element of a pair and $9$ ways we could pick the second element of the pair.  That's $9 \times 9 = 81$ different pairs we could make. Here's the full cartesian product of them with all $81$ pairs.

![fullwidth](https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/1cbeba9f6aa2ac0c759106fa3e534e67c7ea2718/foodweb.jpeg) 



A **relation** is just a subset of those pairs. 
# --outlinebox def_binary_relation

**Definition 2** 
For sets $A$, $B$, any subset of the cartesian product $A \times B$ is called a **binary relation** from $A$ to $B$. Any subset of $A \times A$ is called a **binary relation** on $A$.

# --outlinebox


Here's another relation on our set of stuff.  What do you think this relation represents?  Are they just a randomly selected subset of those $81$ pairs?  There's nothing in the definition that says a relation can't be random. However, this relation is not.  There is some unifying question that was asked for all $81$ pairs and this is the collection of pairs for which the answer was yes. Click on the pairs to create a graph.

```d3/autoplay


smartdown.importCssCode(
`
.link {
  stroke: #000;
  stroke-width: 4;
  fill: none;
}

.inactive {
	display: none;
}

`);


var nodes = [
	{
		name: 'fox',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/fox.jpeg',
	 	x: 0.25,
	 	y: 0.17,
	 	active: false
	 	},
	{
		name: 'owl',
	 	url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/owl.jpeg',
	 	x: 0.83,
	 	y: 0.17,
	 	active: false 
	 	},
	{
		name: 'rabbit',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/rabbit.jpeg',
	 	x: 0.125,
	 	y: 0.5,
	 	active: false 
	 	},
	{
		name: 'mouse',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/mouse.jpeg',
	 	x: 0.325,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'bird',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/bird.jpeg',
	 	x: 0.5,
	 	y: 0.17,
	 	active: false  
	 	},
	{
		name: 'cricket',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/cricket.jpeg',
	 	x: 0.17,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'wheat',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/wheat.jpeg',
	 	x: 0.625,
	 	y: 0.5,
	 	active: false  
	 	},
	{
		name: 'grass',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/grass.jpeg',
	 	x: 0.5,
	 	y: 0.83,
	 	active: false  
	 	},
	{
		name: 'carrot',
		url: 'https://gist.githubusercontent.com/wildthinkslaboratory/ac98c0bb68ccf7528dc39fa1922d2bdb/raw/bba97e7daf0b769f71765771769d121bd4351ecd/carrot.jpeg',
	 	x: 0.83,
	 	y: 0.83,
	 	active: false  
	 	} 
];

var links = [
  {source: 0, target: 2, exitAdj: 'W', enterAdj: 'N', id: 0, active: true},
  {source: 2, target: 0, exitAdj: 'N', enterAdj: 'W', id: 1, active: true},
  {source: 0, target: 3, exitAdj: 'E', enterAdj: 'N', id: 2, active: true},
  {source: 3, target: 0, exitAdj: 'N', enterAdj: 'E', id: 3, active: true},
  {source: 2, target: 3, exitAdj: 'E', enterAdj: 'W', id: 4, active: true},
  {source: 3, target: 2, exitAdj: 'W', enterAdj: 'E', id: 5, active: true},
  {source: 1, target: 4, exitAdj: 'W', enterAdj: 'E', id: 6, active: true},
  {source: 4, target: 1, exitAdj: 'E', enterAdj: 'W', id: 7, active: true},
  {source: 6, target: 7, exitAdj: 'W', enterAdj: 'N', id: 8, active: true},
  {source: 7, target: 6, exitAdj: 'N', enterAdj: 'W', id: 9, active: true},
  {source: 6, target: 8, exitAdj: 'E', enterAdj: 'N', id: 10, active: true},
  {source: 8, target: 6, exitAdj: 'N', enterAdj: 'E', id: 11, active: true},
  {source: 7, target: 8, exitAdj: 'E', enterAdj: 'W', id: 12, active: true},
  {source: 8, target: 7, exitAdj: 'W', enterAdj: 'E', id: 13, active: true},
];

var dagLinks = [];


	


var target = this.div;
target.style.height = '100%';
target.style.width = '96%';
const pageWidth = target.offsetWidth;
const width = pageWidth * 0.75;
const xDivider = width * 0.25;
const height = width * 0.66;
const imgSize = height/6;
const linkImageSize = height/ links.length;
const linkWidth = xDivider/4;



function xAdjustment(heading) {
	if (heading == 'E') {
		return imgSize/2;
	}
	else if (heading == 'W') {
		return -imgSize/2;
	}
	return 0;
}

function yAdjustment(heading) {
	if (heading == 'S') {
		return imgSize/2;
	}
	else if (heading == 'N') {
		return -imgSize/2;
	}
	return 0;
}

var svg = d3.select(target)
			.append('svg')
			.attr('width',pageWidth)
			.attr('height', height);

	// define arrow markers for graph links
	svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  	.append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');


var pairs =	svg.selectAll('g')
   		.data(links)
   		.enter()
   		.append('g')
   		.attr('class', 'pair')
   		.on('click', function(d,i) {
   			if (d.active == true) {
        		dagLinks.push(d);
      			d.active = false;
      			nodes[d.source].active = true;
      			nodes[d.target].active = true;
      			if (dagLinks.length == 14) {
					nodes[5].active = true;
				}
        		render();	
			}

   		});


  	pairs.append('image')
  		.attr('xlink:href', function(l) {
			var sourceNode = nodes.filter(function(d, i) {
       		return i == l.source;
     		})[0];
			return sourceNode.url;
		})
		.attr('x', linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height',linkImageSize - 5);

	pairs.append('image')
		.attr('xlink:href', function(l) {
			var targetNode = nodes.filter(function(d, i) {
       		return i == l.target;
     		})[0];
			return targetNode.url;
		})
		.attr('x', 2*linkWidth + linkWidth/2)
		.attr('y', function(d) {
			return d.id * linkImageSize;
		})
		.attr('width',linkImageSize - 5)
		.attr('height', linkImageSize - 5);


	pairs.append('line')
		.classed('link', true)
  		.attr('x1', 1.5 * linkWidth)
  		.attr('y1', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr('x2', 2.25 * linkWidth)
  		.attr('y2', function(d) {return (d.id + 1) * linkImageSize - linkImageSize/2;})
  		.attr("marker-end", "url(#end-arrow)");

const duration = 2000;

function render() {

	svg.selectAll('g.pair')
		.data(links)
		.filter(function(d) { return d.active == false; })
		.classed('inactive', true);


  	svg.selectAll('node_image')
    .data(nodes.filter(function(d){ return d.active == true; }))
  	.enter()
  	.append('image')
	.attr('xlink:href', function(d) {
		return d.url;
		})
	.attr('x', function(d) {
		return d.x * width - imgSize/2 + xDivider;
		} )
	.attr('y', function(d) {
		return d.y * height - imgSize/2;
		})
	.attr('width',imgSize)
	.attr('height',imgSize);

	svg.selectAll('link') 
	.data(dagLinks)
	.enter();

	svg.selectAll("link")
   .data(dagLinks)
   .enter()
   .append("path")
   .attr("class", "link")
   .attr("d", function(l) {
   	var sourceNode = nodes.filter(function(d, i) {
       return i == l.source;
     })[0];
    const targetNode = nodes.filter(function(d, i) {
       return i == l.target;
     })[0];
    const xStart = xDivider + sourceNode.x * width + xAdjustment(l.exitAdj);
    const yStart = sourceNode.y * height + yAdjustment(l.exitAdj);
    const xControlPt1 = xStart + xAdjustment(l.exitAdj);
    const yControlPt1 = yStart + yAdjustment(l.exitAdj);
    const xEnd = xDivider + targetNode.x * width + xAdjustment(l.enterAdj);
    const yEnd = targetNode.y * height + yAdjustment(l.enterAdj);
    const xControlPt2 = xEnd + xAdjustment(l.enterAdj);
    const yControlPt2 = yEnd + yAdjustment(l.enterAdj);
    return `M ${xStart}, ${yStart} C ${xControlPt1}, ${yControlPt1} 
    		${xControlPt2}, ${yControlPt2} 
    		${xEnd}, ${yEnd}`;
   	})
   .attr("marker-end", "url(#end-arrow)");

  svg.selectAll('link')
  .data(dagLinks)
  .exit()
  .remove();

}



```

 The birds are related to each other, the plants are all related to each other and the mammals are also grouped together.  The cricket is all alone and not related to anyone else. Two elements are related if they share a taxonomic group.  You could quibble with the structure of this relation since it doesn't follow the classic taxonomy groupings. The animals are broken down into three groups while the plants are all lumped together into one.  However, this is math and in math you get to make up your own relations.  I made this one up and this is the way I made it.  You can always make a different one with whatever stuff you like and whatever groups you want.  


# Relations You Already Know from Math Class

So now that you've seen we can use relations to organize our favorite stuff, let's talk about some relations that you already know.

- greater than or equals (partial orders, total orders)
- equals (equivalence classes)
- functions

# Guess the Relation

# :::: guess_the_relation

#### --partialborder problem1

**Problem 1.1** 

Let the following set of pairs be part of a larger infinite set of pairs that form a relation on the natural numbers.

$$
\begin{eqnarray}
(1,2)\,\,(1,3)\,\, (1,4)\,\, (1,5) \,\, (2,3) \\
(2,4)\,\, (2,5)\,\, (3,4)\,\, (3,5)\,\, (4,5)
\end{eqnarray}
$$

Which of the following pairs do you think belongs in this relation?

A) $(5,1)$
B) $(3,3)$
C) $(70,69)$
D) $(4,8)$

[Your Answer](:?answer) 

```javascript/autoplay
smartdown.setVariable('answer', '');
this.dependOn = ['answer'];
this.depend = function() {
	if (env.answer === 'D' || env.answer === 'd') {
		smartdown.toggleDisclosureButton('sol1');	
	}	
};
```

[Show Solution](::sol1)

# :::: sol1

# --outlinebox solution1
Solution:
This set of pairs forms the less than relation .
# --outlinebox

# ::::

#### --partialborder
# ::::

# Online Field Trip
# :::: feild_trip
real world examples
function - gdp -> happiness
feild trip to the [marvel universe](https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/index.html) 

[vaccine game VAX](http://vax.herokuapp.com)
different relations - friend, romance, work, enemy, family
function - movie

# ::::

# More Exercises



[Partial Orders and Equivalence Relations](:@MoreRelations)
