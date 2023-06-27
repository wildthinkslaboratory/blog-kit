---
title: 'Project 1 Instructions'
smartdown: true
header: 'none'
---

[command line stuff](::commandline/button,transparent)
# :::: commandline
- `cd dname` - change to directory named `dname`
- `mkdir dname` - make a directory named `dname`
- `dir` - list files in a directory 
# ::::

## Project 1 Instructions

[step 1](::step1/button,transparent)
# :::: step1
- When you create files for your homework, use the exact name specified.  
- Your program should produce the exact output specified (small differences in number of spaces won't matter).  

He will use a computer program to run everyone's code and check that their output matches.  If your names are different or your output uses slightly different text it won't pass these tests even if your answer is correct. 
# ::::

[step 2](::step2/button,transparent)
# :::: step2
Create a folder in `cs122` called `p1`.  Create a file in `p1` called `p1.py`. 
# ::::

[step 3](::step3/button,transparent)
# :::: step3
Copy this code into `p1.py`
```
# CS 122 Summer 2023 Project 1 
# Author: Your Name
# Credit: Anyone you worked with, or leave blank
# Description: Introduction to programming problem set uses Python
# numeric data types and operations to solve a variety of small problems. 

#
# Question 1
#

print("Question 1")
print("------------------------------------------")

# Calculate the number of watermelons given 70 children at 3 slices,
# 80 adults at 2 slices, 14 slices per watermelon, add 25% extra, rounding up.

# Initialize variables with values
# ** your code **

# Calculate total number of watermelon slices and display number of slices
# ** your code **
print("Total slices:", total_slices)

# Add extra amount and display number of slices
# ** your code **
print("Total slices (including extra):", total_slices)

# Calculate number of watermelons and display number of watermelons
# ** your code **
print("Total watermelons", watermelons)

# Round the number of watermelons up and display number of watermelons
# ** your code **
print("Total watermelons (rounded up)", watermelons)

#
# Question 2
#

print()
print("Question 2")
print("------------------------------------------")

# Calculate total number of trips given 50, 100, 200 or 500 daily steps, 14
# steps per floor, and down and back up the stairs as one trip. Re-use the
# step variable. Round the number of trips up to the nearest whole integer.
# Recommended variable names: steps_per_floor, target_steps, trips

# Initialize variables
# ** your code **

# Calculate 50 steps and display number of trips
# ** your code **

# Calculate 100 steps and display number of trips
# ** your code **

# Calculate 200 steps and display number of trips
# ** your code **

# Calculate 500 steps and display number of trips
# ** your code **

#
# Question 3
#

print()
print("Question 3")
print("------------------------------------------")

# Calculate total distance walked per week given a pivot radius of 200 feet,
# six pivots, two inspections per day, and working five days a week. Round
# all results to two decimal places. Use 3.14, or math.pi, for the circumference
# equation calculation.

# Initialize variables
# ** your code **

# Calculate circumference of one pivot
# ** your code **

# Calculate and display total distance walked (feet and miles)
# ** your code **
```
# ::::

[step 4](::step4/button,transparent)
# :::: step4
At the top of the code put in your name as `Author` and make `Credit` part blank since you will be working alone.
# ::::

[step 5](::step5/button,transparent)
# :::: step5
# --partialborder q1
#### Question 1
You will be attending a family reunion, and the reunion coordinator wants you to bring watermelons for everyone. The coordinator stated that 150 people will attend the reunion, and 70 of the 150 will be children. The coordinator asks that you plan on two slices of watermelon for each adult, three slices for each child, with 25% extra for those that want more than the planned amounts. Each watermelon on average will produce 14 slices. You need to calculate the total number of watermelons, rounding up to the next highest count of watermelons.
# --partialborder

#### Solution
Take the following lines of code and insert them into `p1.py` in the proper places to solve Question 1.

```
import math

slices_per_adult = 2
print("Total slices (including extra):", total_slices)
children = 70
total_slices = total_slices + (total_slices * extra)
print("Total watermelons (rounded up):", watermelons)
slices_per_watermelon = 14
total_slices = (children * slices_per_child) + (adults * slices_per_adult)
print("Total slices:", total_slices)
watermelons = math.ceil(watermelons)
slices_per_child = 3
watermelons = total_slices / slices_per_watermelon
extra = 0.25
print("Total watermelons:", watermelons)
adults = 80
```

#### Output
Your code should produce this output.
```
Question 1
------------------------------------------
Total slices: 370
Total slices (including extra): 462.5
Total watermelons: 33.035714285714285
Total watermelons (rounded up): 34
```
# ::::

[step 6](::step6/button,transparent)
# :::: step6
Insert these comments into your code in appropriate places.  Make sure to put a blank line before each comment.
```
# Initialize variables with values
# Calculate total number of watermelon slices and display number of slices
# Add extra amount and display number of slices
# Calculate number of watermelons and display number of watermelons
# Round the number of watermelons up and display number of watermelons
```
# ::::

[step 7](::step7/button,transparent)
# :::: step7
# --partialborder q2
#### Question 2
Your friend was bragging about how many stairs he climbed each day because of his apartment location on the fourth floor. Calculate how many times your friend would have to go down then back up the stairs to reach his fourth floor apartment to reach 50, 100, 200 and 500 steps. The apartments all have vaulted ceilings, so use 14 steps per floor in your calculations. Remember to count down and back up as one trip. You will also reuse the variable that contains the target number of steps. Round up.
# --partialborder

#### Solution
Write a program that solves this problem and put it in `p1.py` in appropriate place.
**Notes:**
- Module `math` has a function `math.ceil()` that rounds a float up.
- Assume the building has a ground floor and the next floor is the first floor.
- Use the following variable names `steps_per_floor`, `floor`, `target_steps`, and `trips`

#### Output
```
Question 2
------------------------------------------
Trips for 50 steps: 1
Trips for 100 steps: 1
Trips for 200 steps: 2
Trips for 500 steps: 5
```
# ::::

[step 8](::step8/button,transparent)
# :::: step8
# --partialborder q3
#### Question 3
Your friend worked over the summer on a farm and one of his tasks was to check the irrigation. The farm used a circular stationary irrigation system (also know as center pivot irrigation), and one of your friend's tasks was to walk around and inspect the edge of the irrigation zone. Despite the obvious fitness advantages, your friend thought he'd walked over a hundred miles a week. Did your friend walk over a hundred miles in a single week?

According to your friend, each center pivot system has a radius of 200 feet. The farm had six center pivot systems, and your friend would inspect each system twice a day, five days a week. 
# --partialborder 

#### Solution
Write a program that solves this problem and put it in `p1.py` in appropriate place.
**Notes:**
- Module `math` has a constant `math.pi`.  
- `math.round()` will be helpful.
- Your final answer variable must be named `weekly_distance`

#### Output
```
Question 3
------------------------------------------
Weekly distance (feet): 75398.22
Weekly distance (miles): 14.28
```
# ::::