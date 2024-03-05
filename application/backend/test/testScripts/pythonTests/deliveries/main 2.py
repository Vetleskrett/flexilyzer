# Function that adds two numbers
def add(a, b):
    return a + b


# Function that subtracts two numbers
def subtract(a, b):
    return a - b


# Function that multiplies two numbers
def multiply(a, b):
    return a * b


# Determine if a number is positive, negative, or zero
def check_number(number):
    return number < 0


# Function that creates a list of continuous numbers from "start" value to "end" value, starting
def list_of_numbers(start, end):
    return [i for i in range(start, end + 1)]


# Function that duplicates all letters in a string, e.g. "hello" -> "hheelllloo"
def duplicate_letters(string):
    return "".join([letter * 3 for letter in string])


# Function that removes all vowels from a string
def remove_vowels(string):
    return "".join([letter for letter in string if letter not in "aeiouyæøå"])


# Function that moves the first element of the list to the end of the list
def modify_list(input_list):
    return input_list[1:] + input_list[0:1]
