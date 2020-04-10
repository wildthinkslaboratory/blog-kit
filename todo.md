
High level plan
-----------------
- clean up calc lib and make it sparkle
- write secant
- write secant/rectangle
- create an enticing homepage that expresses the wildthinks values
- fill out my current content
	- fractal
	- make exploding dots into a treasure hunt like rectangle
- design a calculus section for major results and proofs
	- definition of the derivative
	- chain rule
	- fundamental theorem of calculus
	- derivatives of sin and cos
	- derivative of e^x
	- derivatives of ln
	- limits (i only care about what happens close)
	- continuity


today's plan
--------------------
- add names to toolbar demo
- review widget names
- review widget inheritence
- finish implementing SecantArray
- and Secant Rectangle Array
- get the toolbar page working over here.
- write down some specs I need based on my new storyline ideas.
- then I've got to spend time cleaning up the code and documenting and refining the subtle display elements.  Need to cut down this bug list because it's causing me anxiety.


sliders can position relative to either endpoint
work on kiosk mode 
go over all highlight operations and make sure I like the look
rectangles are for rate problems
need to unify color schemes, fix stroke color
review the Xerror system.
need a way of placing text based on number of letters.
is my code efficient?  How do we test this?
need an enum for types so I can easily add types without breaking old code.
identify the widget interface
	area
	rise
	setAnnotations
	onUpdate
	setPrecision
	setSnapMargin
	run

sort out standardizaton of widget names / input parameters. what about secant rectangles.
	maybe it should be 'change', 'units', 'rate'

not happy with the maxX function. fix it.
work total area for rect array is wrong sometimes.

go through calc lib and comment and clean up


TO DO
- clean up my calc lib
	- what can I do about the names initialization happening before super()?
	- update SecantArray
	- update RectSecantArray
	


- can we add units to work rectangle?
- rectangle4 remove jsxgraph copyright and do we need units?
- plan secant and rectangles        Sat/Sun

- derivative and chain rule         Mon / Tue
- secant                            1 week
- ftc                               1 week
- work on branding.


Quick and Easy
- I've messed up the formatting for header titles and subtitles
- bug in fly
- report problem of popup widths.  I'm currently using shadow to control the width.
- report bug that assets aren't watched.
- balance text is not updating
- headers for all pages
- review all pages for resizing issues
- review all pages for mobile issues
- test all pages in different browsers.
- get a fucking favicon
- home page logo needs to scale for smaller screens
- map needs to rescale too

Larger Issues
- add code to detect phones and give a warning / message
- CNAME
- not sure that contact page is working
- NAVIGATION
	- navigation between pages
	- stop open in new tab?
	- rectangle needs a navigation bar
	- once I have a navigation bar, the exploding dots pages could be broken down.
- rectangle resizing is off for medium screens.  This affects adding rectangles placement.
- would slowing down draw rate help performance for static periods of p5js?
- add resources for fly problem

HOME PAGE
- add featured video section?
- I need better branding
- revise the About section, About Andre, About Smartdown, About Wildthinks

ways to leave feedback
patreon page
logo work



- write secant chapter
- write secant / rectangle
- add accumulated change to rectangle
- revise Relations
- plan my proof app


-------------------------------------------------------------------------------------

Branding
- I'm not going to baby people.  It will be what ever is interesting.  
- The goal is to push people to be creative.
- The goal is to allow people to explore.


secant rectangle
1. pick any secant, it has a corresponding rectangle
2. pick any rectangle, it has an infinte set of secants.
3. secant and rectangle are a pair.  They express the same relationship in different ways.
4. solve an area under curve problem without access to the total area.  Do a whole series of these. What would you do if you didn't have a way to add up the area?  

- ask Lego robotics folks to try out my web page.
- ask Nicky case to add me to the explorable explanation website
- ask James Tanton for feedback
- epsilon stream
- Kiki Prottsman
- Aran Clauson 
- JSXGraph folks
- local highschool teachers

