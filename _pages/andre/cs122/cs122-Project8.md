---
title: 'Project 8 Instructions'
smartdown: true
header: 'none'
---


### Lab 9 

The canvas instructions are good here.

### Lab 10

Lab 10 is on **tuples**.  Tuples are covered in [Chapter 12](https://greenteapress.com/thinkpython2/html/thinkpython2013.html) of the book.

[step 1](::step1/button,transparent)
# :::: step1
Make a folder in `cs122` called `p8` for your project files.  Then add the files 
- `lab10-tuples.py`
# ::::


[step 2](::step2/button,transparent)
# :::: step2
You can create a function that accepts a variable or changing number of arguments.  Run the following code and figure out how it works.
```
# we can gather some values into a tuple
# the * is the scatter operator that unpacks a tuple
t = (10,20,30,40)
print(t)
print(*t)

def print_args(*args):
	for arg in args:
		print(arg)

print_args(1,3,4)

print_args(t)
```
# ::::

[step 3](::step3/button,transparent)
# :::: step3
You can return a tuple if you want to return multiple values. Convenient.
```
def int_div(num, divisor):
	# parentheses here are optional
	return (num // divisor , num % divisor)


# again, parentheses around tuple is optional
(quotient, remainder) = int_div(31, 3)

print(quotient, remainder)
```
# ::::

[step 4](::step4/button,transparent)
# :::: step4
Create a function called `number_stats(*args)` that accepts a variable length number of arguments of numbers. The function will return the number of arguments, minimum value, maximum value, mean and median as a tuple.

Yeah, he gives you this code.
```
def number_stats(*args):
   total = 0
   median = 0
   mean = 0
   max_val = 0
   min_val = -1
   for i in args:
      total += i
      if i > max_val:
         max_val = i
      if min_val == -1 or i < min_val:
         min_val = i

   if len(args) > 0:
      mean = total / len(args)

      t = sorted(args) # Returns sorted list

      if len(t) == 1:
         median = args[0]
      elif len(t) % 2 == 0:
         pos1 = (len(t) // 2)
         pos2 = (len(t) // 2) - 1
         median = (t[pos1] + t[pos2]) / 2
      else:
         median = t[len(t) // 2]


   return len(args), min_val, max_val, mean, median


data = 10, 20, 30, 40
count, minv, maxv, mean, median = number_stats(*data)
print("Count:", count)
print("Min:", minv)
print("Max:", maxv)
print("Mean:", mean)
print("Median:", median)
```
# ::::

[step 5](::step5/button,transparent)
# :::: step5
- Create and include a file `lab10-data.txt` that contains at least 100 random integers (see a previous assignment)
- Prompt the user for the name of a file
- Process the integers from the file to perform the number_stats() calculations, and output the results
# ::::


### Project 8

[step 6](::step6/button,transparent)
# :::: step6
The variable `d` is a dictionary of dictionaries. It has lists of dictionaries inside it. 

**Printing dictionaries and lists**. If you just print a dictionary it is hard to read.  He recommends copying and pasting a printed dictionary into an online [formatter](https://codebeautify.org/python-formatter-beautifier) to make it readable.  A better way is to 
- `import pprint`
- create a `PrettyPrinter` instance and 
- use it to print your dictionary or list.
- you can adjust the settings on your pretty printer to make it the way you want it.  Check out the [pretty printer page](https://docs.python.org/3/library/pprint.html)

```
import pprint

d = {
   'Songs': {
      '_fields_': ['Title', 'Artist'],
      '_data_': [
         {'Title': 'Believer', 'Artist': 'Imagine Dragons'},
         {'Title': 'Natural', 'Artist': 'Imagine Dragons'}
      ],
   },
   'Albums': {
      '_fields_': ['Album', 'Artist'],
      '_data_': [
         {'Album': 'Evolve', 'Artist': 'Imagine Dragons'},
         {'Album': 'Origins', 'Artist': 'Imagine Dragons'}
      ],
   },
}

print(d)

pp = pprint.PrettyPrinter(width=41, compact=True)

pp.pprint(d)
```
# ::::


[step 7](::step7/button,transparent)
# :::: step7
Make sure you know what these expressions return
- `d['Albums']`
- `d['Albums']['_fields_']`
- `d['Albums']['_data_']` 
- `d['Albums']['_data_'][0]` 
- `d['Albums']['_data_'][0]['Artist']`
# ::::




[step 8](::step8/button,transparent)
# :::: step8
From here you can go to the canvas page for Project 8 and scroll down to **Assignment** heading and start reading there.
# ::::


