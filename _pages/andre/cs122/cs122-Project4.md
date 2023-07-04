---
title: 'Project 4 Instructions'
smartdown: true
header: 'none'
---



[step 1](::step1/button,transparent)
# :::: step1
Make a folder in `cs122` called `p4` for your project files.  Then add the files 
- `lab4-calendar.py`
- `p4-outline.txt`
- `p4-yearday-v1.py`
- `p4-yearday-v2.py`

# ::::

## Parts of Lab 4 passed in with Project 4

[step 2](::step2/button,transparent)
# :::: step2
# --partialborder month
Create a fruitful function called get_full_month() that 
- accepts a single integer number from 1 through 12 and returns the full name of the month (e.g. January, February)
- Returns an empty string if the month number is not 1 through 12
- uses an `if`, `elif`, `else` statement
- Prints an error in the following format if the month number is invalid where `xx` is the invalid argument value
`Must be an integer between 1 and 12 (xx is invalid)`
# --partialborder

# ::::


[step 3](::step3/button,transparent)
# :::: step3
# --partialborder fullmonth
Create a void function `test_get_full_month()` that contains a for loop to test your function using the range of 14 (0 - 13). 
# --partialborder

#### Output
```
Must be an integer between 1 and 12 (0 is invalid).
0 
1 January
2 February
3 March
4 April
5 May
6 June
7 July
8 August
9 September
10 October
11 November
12 December
Must be an integer between 1 and 12 (13 is invalid).
13
```

He gives a lot of hints and suggestions that I have left out.  You know where to find them if you want them.
# ::::


[step 4](::step4/button,transparent)
# :::: step4
# --partialborder leap
Create a function called `is_leap_year()` that accepts a single integer number and will return either `True` if the parameter is a leap year, or `False` if the parameter is not a leap year.
# --partialborder

**Rules for leap years**
	1. If the year is evenly divisible by 4, go to step 2. Otherwise, go to step 5.
	2. If the year is evenly divisible by 100, go to step 3. Otherwise, go to step 4.
	3. If the year is evenly divisible by 400, go to step 4. Otherwise, go to step 5.
	4. The year is a leap year (it has 366 days).
	5. The year is not a leap year (it has 365 days)
# ::::


[step 5](::step5/button,transparent)
# :::: step5
# --partialborder
Create a function `test_is_leap_year(start_year, end_year)` to test your `is_leap_year()` function with values 1996 and 2112.
- Accept a starting year integer and ending year integer that represents the range of years used for testing
- Use a for loop to loop over the range from `start_year` to `end_year + 1`, printing any years within the range that are leap years
```
for year in range(start_year, end_year + 1):   # Using range with a start and end value
```
# --partialborder
He gives more hints on the canvas page.

#### Output
```
1996
2000
2004
2008
2012
2016
2020
2024
2028
2032
2036
2040
2044
2048
2052
2056
2060
2064
2068
2072
2076
2080
2084
2088
2092
2096
2104
2108
2112
```
# ::::

[step 6](::step6/button,transparent)
# :::: step6
# --partialborder
**Extra Credit**  
- Create a void function `validate_is_leap_year(start_year, end_year)` that uses a for loop to loop over the years. 
- Import the `calendar` module, and use function `calendar.isleap()` to test your function.
- Print any years that do not match 
- count the number of mismatches
- After looping through all of the years, print a statement indicating the number of mismatches, or print "No mismatches found" if the counter variable remained 0. 

If your `is_leap_year()` function is correct, no mismatches will be found.
# --partialborder
# ::::


## Project 4

[step 7](::step7/button,transparent)
# :::: step7
So this is a weird assignment. He has a problem he wants you to solve, but he wants you do solve it in three phases. 

- write an algorithm idea in text
- write an algorithm without using any functions
- rework your code to use functions
# ::::

[step 8](::step8/button,transparent)
# :::: step8
# --partialborder
Design a program that prompts a user for a year, a day of the year (an integer between 1 and either 365 or 366 to account for leap year), and output the month, day and year. For example, give the year 2018, and the day 335, your Python program would return December 1, 2018.
# --partialborder
# ::::


[step 9](::step9/button,transparent)
# :::: step9
In `p4-outline.txt` list the steps required for your compuation.
# ::::

[step 10](::step10/button,transparent)
# :::: step10
In `p4-yearday-v1.py` use your outline as comments and write a function to solve the problem.
- Use `is_leap_year()` function from lab 4 
- do not use any other user defined functions.
- Prompt user `Enter year: `
- Prompt user `Enter day of year: `
- Return a string with format Month Day, Year (e.g. December 1, 2018)
# ::::

[step 11](::step11/button,transparent)
# :::: step11
#### Add code to validate the user input
- Validate the year is > 0, if not, print the error, "Year must be > 0"
- Validate the day of the year is > 0, if not, print the error, "Day of year must be > 0"
- Validate the day of the year is less than the day of the year, depending on whether the year is a leap year, and if not, print either the error "Day must be <= 365" or "Day must be <= 366"
# ::::

[step 12](::step12/button,transparent)
# :::: step12
Test your code.
**Notes:** Helpful website for testing your output. [Day of Year Calculator](http://mistupid.com/calendar/dayofyear.htm)
# ::::

[step 13](::step13/button,transparent)
# :::: step13
In `p4-yearday-v2.py` rewrite your code with functions.  He wants these functions:

- Add a void function `start()` that encapsulates all of your original v1 code, and then call the `start()` function. 
- Add a fruitful function `valid_year(year)` that replaces year validity checks, printing out any error, and returning `True` if the year is valid, or `False` if the year is invalid. 
- Add a fruitful function `valid_day_of_year(year, day_of_year)` that replaces day of year validity checks, printing out any error, and returning `True` if the day of year is valid, or `False` if the day of year is invalid. 
- Add a fruitful function `input_year()` that encapsulates the prompting for the year, and returns either 0 if the year is invalid, or the year as an integer. 
- Add a fruitful function `input_day_of_year(year)` that encapsulates the prompting for the day of the year, and returns either 0 if the day of the year is invalid, or the day of the year as an integer. Note that the function includes a year parameter, so your function should also call both `valid_day_of_year()` and `valid_year()` functions. 
- Add a fruitful function `get_days_in_year(year)` that returns 0 for an invalid year, or the number of days in a year as an integer, and use this function in your code.
- Add a fruitful function `valid_month(month)` that returns `True` if a month is valid (e.g. 0 < month <= 12), or `False` for an invalid month, with error output of "Month must be > 0" and "Month must be <= 12"
- Add a fruitful function `translate_month(month)` that returns an empty string for an invalid month (call `valid_month()`), or the month as a full month string (e.g. January, December)
- Add a fruitful function `get_days_in_month(year, month)` that returns the number of days in a month as an integer, accounting for leap year, or returns 0 if the year or month is invalid. You should be able to use this function in your code, but even if you can't use this function, create the function. If you can use the function, then use it.
- Add a fruitful function `valid_day(year, month, day)` that returns `False` if the year, month or day are invalid, or `True` if the arguments are valid.
- Add a fruitful function `get_date_string(year, month, day)` that returns an empty string if the year, month or day are invalid, or a string formatted as Month Day, Year (e.g. December 1, 2018).
# ::::

[step 14](::step14/button,transparent)
# :::: step14
Do the usual documentation.
# ::::

[step 15](::step15/button,transparent)
# :::: step15
#### Output
Here's some potential outputs.
```
Enter year: 2019
Enter day of year: 63
March 4, 2019
```
```
Enter year: 2020
Enter day of year: 64
March 4, 2020
```
```
Enter year: 0
Year must be > 0
```
```
Enter year: 2020
Enter day of year: 0
Day of year must be > 0
```
```
Enter year: 2018
Enter day of year: 366
Day of year must be <= 365
```
```
Enter year: 2020
Enter day of year: 367
Day of year must be <= 366
```
# ::::


##  Glossary for Chapter 5
- **floor division** An operator, denoted //, that divides two numbers and rounds down (toward negative infinity) to an integer.
- **modulus operator** An operator, denoted with a percent sign (%), that works on integers and returns the remainder when one number is divided by another.
- **boolean expression** An expression whose value is either True or False.
- **relational operator** One of the operators that compares its operands: ==, !=, >, <, >=, and <=.
- **logical operator** One of the operators that combines boolean expressions: and, or, and not.
conditional statement**
A statement that controls the flow of execution depending on some condition.
- **condition** The boolean expression in a conditional statement that determines which branch runs.
- **compound statement** A statement that consists of a header and a body. The header ends with a colon (:). The body is indented relative to the header.
- **branch** One of the alternative sequences of statements in a conditional statement.
- **chained conditional** A conditional statement with a series of alternative branches.
- **nested conditional** A conditional statement that appears in one of the branches of another conditional statement.
- **return statement** A statement that causes a function to end immediately and return to the caller.
- **recursion** The process of calling the function that is currently executing.
- **base case** A conditional branch in a recursive function that does not make a recursive call.
- **infinite recursion** A recursion that doesn’t have a base case, or never reaches it. Eventually, an infinite recursion causes a runtime error.
