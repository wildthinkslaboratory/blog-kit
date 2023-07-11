---
title: 'Project 6 Instructions'
smartdown: true
header: 'none'
---



[step 1](::step1/button,transparent)
# :::: step1
Make a folder in `cs122` called `p6` for your project files.  Then add the files 
- `lab6-grades.py`
- `lab7-word-check.py`
- `lab7-word-stats.py`
- `random_numbers.txt`
- `p6_shared.py`        Pay careful attention to dash - vs. underscore _ in file names.  They matter.
- `p6-random.py`
# ::::


## Lab 6 work

[step 2](::step2/button,transparent)
# :::: step2
# --partialborder q
Write some code that will input grades from the user and print a summary of those grades.
# --partialborder

#### Output 
```
Enter score: 25
Enter score: 50
Enter score: 75
Enter score:
*** Results ***
Count:  3
Average:  50.0
Low score:  25
High score:  75
```

#### Specifications
- He says: You do not need to create your own user-defined functions for this lab.
- Your program must repeatedly prompt the user for a score until nothing is entered (simply pressing the Return/Enter key rather than typing in a value).
- Add guardian code to prevent division by zero in the average calculation. You can display, "No scores entered" if no scores were entered by the user.
# ::::

## Lab 7 work

[step 3](::step3/button,transparent)
# :::: step3
You need to download [words_alpha.txt](https://github.com/dwyl/english-words/blob/master/words_alpha.txt), a textfile with a dictionary of words.  It's a big file so you need to click the download button on the right. You can also download it from the Lab 7 page in canvas. Put it in your `p6` directory.

# ::::


[step 4](::step4/button,transparent)
# :::: step4
In file `lab7-word-check.py`
# --partialborder q1
This first program will prompt the user for input (a word), exit if nothing entered, or search through the list of words in `words_alpha.txt` to determine if the word (case insensitive) is found.
# --partialborder

#### Output
```
Enter a search word (blank to exit): Test
Word test found
Enter a search word (blank to exit): aabb
Word aabb not found
Enter a search word (blank to exit): 
```
Then he gives you code to solve the problem that you can check after you've written your own.
# ::::


[step 5](::step5/button,transparent)
# :::: step5
In file `lab7-word-stats.py`
# --partialborder q2
Write a program that loops over the input file and creates the output below.
# --partialborder

#### Output
```
Count: 370099
Longest word is dichlorodiphenyltrichloroethane (31)
Shortest word is a (1)
Palindromes: 232 (0.06%)
First letter counts
A: 25417 (6.87%)
B: 18413 (4.98%)
C: 32106 (8.67%)
D: 18732 (5.06%)
E: 14197 (3.84%)
F: 11893 (3.21%)
G: 10953 (2.96%)
H: 13743 (3.71%)
I: 13199 (3.57%)
J: 2840 (0.77%)
K: 3952 (1.07%)
L: 10002 (2.7%)
M: 19805 (5.35%)
N: 13458 (3.64%)
O: 12681 (3.43%)
P: 34860 (9.42%)
Q: 1793 (0.48%)
R: 16783 (4.53%)
S: 38761 (10.47%)
T: 18818 (5.08%)
U: 22767 (6.15%)
V: 5329 (1.44%)
W: 6559 (1.77%)
X: 507 (0.14%)
Y: 1143 (0.31%)
Z: 1388 (0.38%)
Other: 0 (0.0%)
```
- round percentages to the nearest hundredths.
# ::::

## Project 6

[step 6](::step6/button,transparent)
# :::: step6
At the top of file `random_numbers.txt` paste the following.
```
# https://www.random.org/integers/?num=100&min=1&max=100&col=1&base=10&format=plain&rnd=new
```

Then go to [this page](https://www.random.org/integers/?num=100&min=1&max=100&col=1&base=10&format=plain&rnd=new) and copy all the numbers into `random_numbers.txt` below the web address.

**Note:** The numbers you get are randomly generated.  Each time you click on the link will give a different set of 100 random numbers.  So the content everyone's `random_numbers.txt` will be different.
# ::::


[step 7](::step7/button,transparent)
# :::: step7
In file `p6-random.py` 
# --partialborder q3
Write a program that will
- read each line of random_numbers.txt 
- Count the number of lines that start with a # (comment lines)
- Count the number of lines that are not comments
- Sum the values of all non-comment lines
- find the average of the numbers
- print a summary
# --partialborder

#### Sample Output
```
Count: 100
Comments: 1
Total: 4796
Average: 47.96
```

# ::::


[step 8](::step8/button,transparent)
# :::: step8

**Padding** is something you do to a string that makes is a specific length (longer) by filling in extra spaces on the left or right with a specified character. 

**Example** The string `'abc'` can be padded out on the left with the character `' '` to length 10 giving the string `'       abc'`

In file `p6-shared.py` create the following functions:
- `pad_string()`: Parameters include a string to be formatted, the size of the format space, a direction (e.g. left padded or right padded), and the padding character; direction must default to left padded, and the padding character must default to a single space; if the the length of the data to be formatted is greater than the size of the format space, simply return the original data to be formatted
- `pad_left()`: Parameters include data to be formatted, the size of the format space, and the padding character; call `pad_string()`, passing the data, size and formatting character, and explicitly set the padding direction to left padded
- `pad_right()`: Parameters include data to be formatted, the size of the format space, and the padding character; call pad_string(), passing the data, size and formatting character, and explicitly set the padding direction to right padded

# ::::

[step 9](::step9/button,transparent)
# :::: step9
Import your functions into `p6-random.py` by adding this line to the top of your code.
```
from p6_shared import pad_left, pad_right
```
Pad your output code. Use 10 as the padding space for both pad_left() and pad_right(), but rather than code 10 directly into each function call, create two variables, `label_spacing` and `num_spacing`, that may be easily changed to adjust the formatting.

#### Output
```
Count:           100
Comments:          1
Total:          5191
Average:       51.91
```
# ::::


[step 10](::step10/button,transparent)
# :::: step10
Make your code read the filename of the random numbers from the user.
```
Enter filename (blank to exit): random_numbers.txt
Count:           100
Comments:          1
Total:          5191
Average:       51.91
Enter filename (blank to exit):
```

# ::::

[step 11](::step11/button,transparent)
# :::: step11
Make your code check to see if the inputed file exists by importing `os` module
```
import os
```
and calling
```
os.path.exists(filename)
```
which will return `True` or `False`

#### Output
```
Enter filename (blank to exit): not_a_real_file.txt
Invalid filename: not_a_real_file.txt
Enter filename (blank to exit): 
```
# ::::



[check code](::check/button,transparent)
# :::: check
His checks
`random_numbers.txt`
- Verify valid text file with numbers

`p6_shared.py`
- Verify using required functions: pad_string(), pad_left(), and pad_right()
- Verify pad_left() and pad_right() call pad_string()

`p6-random.py`
- Verify os library is imported
- Verify p6_shared.py library imported
- Verify using input()
- Verify using a while loop
- Verify using pad_left() with each output line
- Verify using pad_right() with each output line
- Verify checking for file existence and invalid filename message possible
- Verify using break statement(s)
- Verify a comment count is output
- Verify a total count is output
- Verify an average is output

Some other checks I think are important
- close all files when done with them
- strip all input lines
- comment appropriately
# ::::

