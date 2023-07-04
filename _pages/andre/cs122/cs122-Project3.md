---
title: 'Project 3 Instructions'
smartdown: true
header: 'none'
---


[comments](::comments/button,transparent)
# :::: comments
In this class he wants you to use very specific comment formats called DocStrings.  You can then run the program [Sphinx](https://www.sphinx-doc.org/en/master/#get-started) on your code and it will use the DocStrings to generate an html web page or a LaTeX page that documents your code. Python will also display your docstring with the `help` function.

All files should have the comment header and all functions should have docstrings.
# ::::

[step 1](::step1/button,transparent)
# :::: step1
Make a folder in `cs122` called `p3` for your project files.  Then add the files 
- `lab3-circle.py`
- `p3-reverse.py`
- `p3-grid.py`
- `p3-turtle.py`
# ::::

## Parts of Lab 3 passed in with Project 3

[step 2](::step2/button,transparent)
# :::: step2
Add the following code to `lab3-circle.py`
```
# Import Turtle graphics module and create a turtle for drawing
import turtle

def move(t, x, y):
   """
   Move Turtle to x, y position
   """
   t.pu()
   t.goto(x, y)
   t.pd()

def draw_circle(t, radius, x, y):
   """
   Draw a circle with radius using Turtle t at centered position x, y
   """
   move(t, x, y - radius)
   t.circle(radius)

```

#### Problem
Write a function that draws a series of concentric circles centered at a point `(x,y)` with following parameters
```
draw_concentric_circles(turtle, num_circles, starting_radius, radius_inc, x, y)
```

#### Output
Call your function with following command to see your circles.
```
draw_concentric_circles(t, 3, 50, 25, 0, 0)
```

If you want to see what it's supposed to look like, go to the bottom of the Lab 3 page in canvas.
# ::::


## Project 3 Instructions

[step 3](::step3/button,transparent)
# :::: step3
The main Project 3 page isn't too cluttered.  Just start reading at the **Question 1** heading.  Ignore everything above that.
# ::::


## Chapter 4 terms to know for the quiz
- **method** A function that is associated with an object and called using dot notation.
- **loop** A part of a program that can run repeatedly.
- **encapsulation** The process of transforming a sequence of statements into a function definition.
- **generalization** The process of replacing something unnecessarily specific (like a number) with something appropriately general (like a variable or parameter).
- **keyword argument** An argument that includes the name of the parameter as a “keyword”.
- **interface** A description of how to use a function, including the name and descriptions of the arguments and return value.
- **refactoring** The process of modifying a working program to improve function interfaces and other qualities of the code.
- **development plan** A process for writing programs.
- **docstring** A string that appears at the top of a function definition to document the function’s interface.
- **precondition** A requirement that should be satisfied by the caller before a function starts.
- **postcondition** A requirement that should be satisfied by the function before it ends.

