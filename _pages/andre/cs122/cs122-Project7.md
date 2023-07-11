---
title: 'Project 7 Instructions'
smartdown: true
header: 'none'
---



[step 1](::step1/button,transparent)
# :::: step1
Make a folder in `cs122` called `p7` for your project files.  Then add the files 
- `lab8-lists.py`
# ::::


## Lab 8 stuff

[step 2](::step2/button,transparent)
# :::: step2
Copy this code into `lab8-lists.py`
```
import random

def gen_random_integer_list(num, start_range = 1, end_range = 100, sort_list = 'N'):
   t = []
   if num <= 0:
      print('num must be > 0')
   elif not isinstance(num, int):
      print('num must be an integer')
   elif not isinstance(start_range, int) or not isinstance(end_range, int):
      print('start_range and end_range must be integers')
   else:
      for i in range(num):
         r = random.randint(start_range, end_range)
         t.append(r)

      if sort_list.upper() == 'Y':
         t.sort()

   return t
```

- Add an appropriate docstring and comments.
- Test your function with different parameters and make sure you understand it.

# ::::

[step 3](::step3/button,transparent)
# :::: step3
Now generate 100 random numbers to represent test scores
```
t = gen_random_integer_list(100)
```
and add functions `get_low_score`, `get_high_score`, `get_median_score` and `get_mean_score`.  They should all
- take a list as parameter
- check to make sure parameter is a list. print 'List argument expected' if parameter not a list, and return -1.
If list is empty return 0

For `get_low_score`, `get_high_score`
- create a copy of the list
- sort the list
- return the first / last element (depending on whether you want high or low)

For `get_mean_score` use the `sum()` function for lists.

For `get_median_score`
 - If list only contains a single element, return that value as the median
 - If the list contains even number of elements, average the two middle values as the median
 - If the list contains an odd number of elements, the middle element is the median score

# ::::

[step 4](::step4/button,transparent)
# :::: step4
Add a function `count_range()`  that takes a list, and two ints indicating the low and high of a range. The function should return the number of scores within that range (use >= and <=). Give it appropriate guardian code to check the types of the parameters.
- print 'List argument expected' if parameter not a list, and return -1
- If start or end are not integers, print 'start and end must be integers' and return -1
- If start > end or start == end, print 'start must be < end' and return -1
- If list is empty return 0
# ::::

[step 5](::step5/button,transparent)
# :::: step5
Add function `list_range()` to count number of each letter grade.
A: 90+
B: 80 - 89
C: 70 - 79
D: 60 - 69
F: < 60

#### Output
```
A - 11
B - 4
C - 15
D - 12
F - 58
``` 
# ::::


## Project 7

The canvas page is pretty good. Scroll down to the 'Assignment' heading.