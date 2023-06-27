---
title: 'Project 2 Instructions'
smartdown: true
header: 'none'
---

## Some starting stuff

[sublime shortcuts](::sublime/button,transparent)
# :::: sublime
- `Ctrl /` - to comment and uncomment a line
-  `Ctrl [` to indent line and `Ctrl ]` to unindent line
# ::::

[Comment Expectations](::comments/button,transparent)
# :::: comments
Your files should have the following structure

- Header Comments
- References - links to helpful websites 
- Function definitions - single line comments where appropriate with space above them
- Test section - single line comment denoting the test section.  Test section is where you run your code on a few values and print out the result.
# ::::

[step 1](::step1/button,transparent)
# :::: step1
- Create a `p2` directory in `cs122`
- Add the following files to `p2`:  `lab2-square.py`, `lab2-light.py`, `p2-pythagorean.py`, `p2-cement.py`, `p2-travel.py`
# ::::


## Parts of Lab 1 and Lab 2 passed in with Project 1

# :::: pseudocode
# --partialborder pseudo
**pseudocode** is a plain language description of the steps in an algorithm.
# --partialborder
# ::::

[step 2](::step2/button,transparent)
# :::: step2
Copy the following [pseudocode](::pseudocode/tooltip) into file `lab2-square.py`
```
# CS 122 Summer 2023 Lab 2
# Author: Your Name
# Partner: Your Partner
# Description: Create a function that returns the square of any positive integer

# Step 1: Define a function that accepts a number

# Step 2: Verify the number is a positive integer (we will not be able to code this step yet)

# Step 3: Multiply the number by itself

# Step 4: Return the result

# Step 5: Test
```
# ::::


[step 3](::step3/button,transparent)
# :::: step3


In file `lab2-square.py` write a function `square` that returns the square of a number.  Call the function on values 2, 10, and 100.


#### Output
Your program should produce the following output
```
4, 100, 10000
```
# ::::


[step 4](::step4/button,transparent)
# :::: step4

In the file `lab2-light.py` solve the following problem.

# --partialborder
#### Problem
Calculate the average amount of time in seconds light will take to reach the surface of the Earth and Jupiter. We will use average distances in our calculations.

- The speed of light is 186,282 miles per second (mps) in a vacuum.
- The average distance of the sun from the Earth is 93,000,000 miles.
- The average distance of the sun from Jupiter is 484,000,000 miles.
# --partialborder

#### Solution
- Use `math.round()` to set the number of decimal places to 2.
- Your function should be named like this `avg_light_travel_seconds(distance_miles)`
- Make a **void** function `print_results(planetary_object, time_to_object)` to print your results.
#### Output
```
Light travels from the sun to the Earth an average of 499.24 seconds.
Light travels from the sun to Jupiter an average of 2598.21 seconds.
```
# ::::


## Project 2 Instructions

[step 5](::step5/button,transparent)
# :::: step5
# --partialborder pythag
#### Problem 
In file `p2-pythagorean.py` create the following functions.

```
# Calculate missing side c
calc_side_c ( a, b )

# Calculate missing side a or b
calc_side_ab ( ab, c )
```
# --partialborder

#### Solution
- Each function should only be one line
- `math.pow()`, `math.sqrt()`, `math.round()` will be useful
- Round to nearest hundredths
- include the expected comments.
- test `calc_side_c` with values 5 and 10 and print output.
- test `calc_side_ab` with values 4 and 8 and print output.

#### Output
```
c = 11.18
a/b = 6.93
```
# ::::


[step 6](::step6/button,transparent)
# :::: step6
Ok, this will annoy you, but it's part of the assignment. He gives you some references about pythagorean thereom.

-[Pythagorean Theorem CalculatorLinks to an external site.](https://www.rapidtables.com/calc/math/pythagorean-calculator.html)
-[Math Forum: Ask Dr. Math: Pythagorean TheoremLinks to an external site.](https://www.nctm.org/classroomresources/)
-[Mathematical Functions - PythonLinks to an external site.](https://docs.python.org/3/library/math.html)

And he wants you to include them as comments in your code.  The idea is that if someone was reading your code and was a dumbass, they might find these links helpful.  So put this in your code. (I've put them in markdown format.  That's how you do links in StackEdit.)

```
'''
References:

-[Pythagorean Theorem CalculatorLinks to an external site.](https://www.rapidtables.com/calc/math/pythagorean-calculator.html)
-[Math Forum: Ask Dr. Math: Pythagorean TheoremLinks to an external site.](https://www.nctm.org/classroomresources/)
-[Mathematical Functions - PythonLinks to an external site.](https://docs.python.org/3/library/math.html)
'''
```

# ::::

[step 7](::step7/button,transparent)
# :::: step7
In file `p2-cement.py`
# --partialborder cement
#### Problem
You volunteered to help pour two cement slabs for a friend. Your friend asked you to calculate the amount of cement you would need. Both slabs will be 4" thick. The first slab is 6' by 10'. The second slab is 10' by 20'.

Note: the double quotation (") indicates inches, and the single quotation (') indicates feet.
# --partialborder

#### Solution
Functions should be like these
```
# Return cement amount in yards using cubic inches given thickness (t), width (w) and length (l) in inches
calc_yards_cement ( t, w, l)

# Output (print) results of calculating yards given thickness (t), width (w) and length (l) in inches
print_results ( t, w, l)
```

- round to nearest hundredths.
- test your function on specified two slabs.
- use appropriate comments
- make a `print_results()` function and a `calc_yards_cement()` function.

#### Output
```
A cement slab 4" thick, 72" wide and 120" long requires 0.74 cubic yards of cement
A cement slab 4" thick, 120" wide and 240" long requires 2.47 cubic yards of cement
```
# ::::

[step 8](::step8/button,transparent)
# :::: step8
Reference section again

-[Concrete Calculator - How Many Yards?](https://www.concretenetwork.com/concrete/howmuch/calculator.htm)
-[How To Calculate Cubic Yards CalculatorLinks to an external site.](https://todayshomeowner.com/lawn-garden/video/cubic-yard-calculator/)


To add to your code:
```
'''
References:

-[Concrete Calculator - How Many Yards?](https://www.concretenetwork.com/concrete/howmuch/calculator.htm)
-[How To Calculate Cubic Yards CalculatorLinks to an external site.](https://todayshomeowner.com/lawn-garden/video/cubic-yard-calculator/)
'''
```

# ::::

[step 9](::step9/button,transparent)
# :::: step9
In file `p2-travel.py` 

# --partialborder travel
#### Problem
While traveling home for the holiday, you wondered how much time you'd save if you drove faster. The distance home is 90 miles, and you decided to compare driving 55 mph versus 70 mph. You also wondered if driving faster around town really saves you that much time. The around-town distance you chose was 10 miles, using speeds of 25 and 35 mph. Of course, you decided that no amount of time savings is worth the risk to yourself or others, but you still wanted to find the answer.
# --partialborder

#### Solution
Functions should be called like this.
```
# Calculate travel time in minutes given the distance in miles and the speed in mph
calc_travel_time ( distance, speed )

# Output the travel time hours, minutes and seconds given distance and speed
print_travel_time ( distance, speed )
```

- Write functions `calc_travel_time` and `print_travel_time`
- comments as appropriate

#### Output
```
To travel 90 miles at 55 MPH will take 1 hr, 38 min and 11 sec
To travel 90 miles at 70 MPH will take 1 hr, 17 min and 9 sec
To travel 10 miles at 25 MPH will take 0 hr, 24 min and 0 sec
To travel 10 miles at 35 MPH will take 0 hr, 17 min and 9 sec
```
# ::::

[step 10](::step10/button,transparent)
# :::: step10
Reference section

-[Speed Distance Time Calculator](https://www.calculatorsoup.com/calculators/math/speed-distance-time-calculator.php)


To add to your code:
```
'''
References:

-[Speed Distance Time Calculator](https://www.calculatorsoup.com/calculators/math/speed-distance-time-calculator.php)
'''
```

# ::::


## Final Check!

[Output](::out/button,transparent)
# :::: out
`p2-pythagorean.py`
```
c = 11.18
a = 6.93
```
`p2-cement.py`
```
A cement slab 4" thick, 48" wide and 120" long requires 0.74 yards of cement
A cement slab 4" thick, 180" wide and 240" long requires 2.47 yards of cement
```
`p2-travel.py`
```
To travel 90 miles at 55 MPH will take 1 hr, 38 min and 11 sec
To travel 90 miles at 70 MPH will take 1 hr, 17 min and 9 sec
To travel 10 miles at 25 MPH will take 0 hr, 24 min and 0 sec
To travel 10 miles at 35 MPH will take 0 hr, 17 min and 9 sec
```
# ::::


[check!](::check/button,transparent)
# :::: check
`p2-pythagorean.py`

- Verify calc_side_c() declared
- Verify calc_side_ab() declared
- Verify at least two single line comments
- Verify use of round()
- Verify functions include return statements
- Verify correct output from calc_side_c()
- Verify correct output from calc_side_ab()

`p2-cement.py`

- Verify calc_yards_cement() declared
- Verify calc_yards_cement() uses return
- Verify print_results() declared
- Verify at least two single line comments
- Verify use of pow()
- Verify use of round()
- Verify correct output for cement slab calculations

`p2-travel.py`

- Verify calc_travel_time() declared
- Verify calc_travel_time() uses return
- Verify print_travel_time() declared
- Verify at least two single line comments used
- Verify use of round()
- Verify correct output for travel calculations

# ::::
