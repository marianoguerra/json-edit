/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview English strings.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

// Context menus.
Blockly.MSG_DUPLICATE_BLOCK = 'Duplicate';
Blockly.MSG_REMOVE_COMMENT = 'Remove Comment';
Blockly.MSG_ADD_COMMENT = 'Add Comment';
Blockly.MSG_EXTERNAL_INPUTS = 'External Inputs';
Blockly.MSG_INLINE_INPUTS = 'Inline Inputs';
Blockly.MSG_DELETE_BLOCK = 'Delete Block';
Blockly.MSG_DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.MSG_COLLAPSE_BLOCK = 'Collapse Block';
Blockly.MSG_EXPAND_BLOCK = 'Expand Block';
Blockly.MSG_DISABLE_BLOCK = 'Disable Block';
Blockly.MSG_ENABLE_BLOCK = 'Enable Block';
Blockly.MSG_HELP = 'Help';

// Variable renaming.
Blockly.MSG_CHANGE_VALUE_TITLE = 'Change value:';
Blockly.MSG_NEW_VARIABLE = 'New variable...';
Blockly.MSG_NEW_VARIABLE_TITLE = 'New variable name:';
Blockly.MSG_RENAME_VARIABLE = 'Rename variable...';
Blockly.MSG_RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';

// Toolbox.
Blockly.MSG_VARIABLE_CATEGORY = 'Variables';
Blockly.MSG_PROCEDURE_CATEGORY = 'Procedures';

// Control Blocks
Blockly.LANG_CATEGORY_CONTROLS = 'Control';
Blockly.LANG_CONTROLS_IF_HELPURL = 'http://code.google.com/p/blockly/wiki/If_Then';
Blockly.LANG_CONTROLS_IF_TOOLTIP_1 = 'If a value is true, then do some statements.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_2 = 'If a value is true, then do the first block of statements.\n' +
    'Otherwise, do the second block of statements.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_3 = 'If the first value is true, then do the first block of statements.\n' +
    'Otherwise, if the second value is true, do the second block of statements.';
Blockly.LANG_CONTROLS_IF_TOOLTIP_4 = 'If the first value is true, then do the first block of statements.\n' +
    'Otherwise, if the second value is true, do the second block of statements.\n' +
    'If none of the values are true, do the last block of statements.';
Blockly.LANG_CONTROLS_IF_MSG_IF = 'if';
Blockly.LANG_CONTROLS_IF_MSG_ELSEIF = 'else if';
Blockly.LANG_CONTROLS_IF_MSG_ELSE = 'else';
Blockly.LANG_CONTROLS_IF_MSG_THEN = 'do';

Blockly.LANG_CONTROLS_IF_IF_TITLE_IF = 'if';
Blockly.LANG_CONTROLS_IF_IF_TOOLTIP_1 = 'Add, remove, or reorder sections\n' +
    'to reconfigure this if block.';

Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF = 'else if';
Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP_1 = 'Add a condition to the if block.';

Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE = 'else';
Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP_1 = 'Add a final, catch-all condition to the if block.';

Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL = 'http://code.google.com/p/blockly/wiki/Repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT = 'repeat';
Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE = 'while';
Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = 'until';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = 'While a value is true, then do some statements.';
Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = 'While a value is false, then do some statements.';

Blockly.LANG_CONTROLS_FOR_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOR_INPUT_WITH = 'count with';
Blockly.LANG_CONTROLS_FOR_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOR_INPUT_FROM = 'from';
Blockly.LANG_CONTROLS_FOR_INPUT_TO = 'to';
Blockly.LANG_CONTROLS_FOR_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_FOR_TOOLTIP_1 = 'Count from a start number to an end number.\n' +
    'For each count, set the current count number to\n' +
    'variable "%1", and then do some statements.';

Blockly.LANG_CONTROLS_FOREACH_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM = 'for each item';
Blockly.LANG_CONTROLS_FOREACH_INPUT_VAR = 'x';
Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST = 'in list';
Blockly.LANG_CONTROLS_FOREACH_INPUT_DO = 'do';
Blockly.LANG_CONTROLS_FOREACH_TOOLTIP_1 = 'For each item in a list, set the item to\n' +
  'variable "%1", and then do some statements.';

Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL = 'http://en.wikipedia.org/wiki/Control_flow';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP = 'of loop';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = 'break out';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = 'continue with next iteration';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = 'Break out of the containing loop.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = 'Skip the rest of this loop, and\n' +
    'continue with the next iteration.';
Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING = 'Warning:\n' +
    'This block may only\n' +
    'be used within a loop.';

// Logic Blocks.
Blockly.LANG_CATEGORY_LOGIC = 'Logic';
Blockly.LANG_LOGIC_COMPARE_HELPURL = 'http://en.wikipedia.org/wiki/Inequality_(mathematics)';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ = 'Return true if both inputs equal each other.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ = 'Return true if both inputs are not equal to each other.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT = 'Return true if the first input is smaller\n' +
    'than the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE = 'Return true if the first input is smaller\n' +
    'than or equal to the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT = 'Return true if the first input is greater\n' +
    'than the second input.';
Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE = 'Return true if the first input is greater\n' +
    'than or equal to the second input.';

Blockly.LANG_LOGIC_OPERATION_HELPURL = 'http://code.google.com/p/blockly/wiki/And_Or';
Blockly.LANG_LOGIC_OPERATION_AND = 'and';
Blockly.LANG_LOGIC_OPERATION_OR = 'or';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND = 'Return true if both inputs are true.';
Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR = 'Return true if either inputs are true.';

Blockly.LANG_LOGIC_NEGATE_HELPURL = 'http://code.google.com/p/blockly/wiki/Not';
Blockly.LANG_LOGIC_NEGATE_INPUT_NOT = 'not';
Blockly.LANG_LOGIC_NEGATE_TOOLTIP_1 = 'Returns true if the input is false.\n' +
    'Returns false if the input is true.';

Blockly.LANG_LOGIC_BOOLEAN_HELPURL = 'http://code.google.com/p/blockly/wiki/True_False';
Blockly.LANG_LOGIC_BOOLEAN_TRUE = 'true';
Blockly.LANG_LOGIC_BOOLEAN_FALSE = 'false';
Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1 = 'Returns either true or false.';

// Math Blocks.
Blockly.LANG_CATEGORY_MATH = 'Math';
Blockly.LANG_MATH_NUMBER_HELPURL = 'http://en.wikipedia.org/wiki/Number';
Blockly.LANG_MATH_NUMBER_TOOLTIP_1 = 'A number.';

Blockly.LANG_MATH_ARITHMETIC_HELPURL = 'http://en.wikipedia.org/wiki/Arithmetic';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD = 'Return the sum of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS = 'Return the difference of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY = 'Return the product of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE = 'Return the quotient of the two numbers.';
Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER = 'Return the first number raised to\n' +
    'the power of the second number.';

Blockly.LANG_MATH_CHANGE_HELPURL = 'http://en.wikipedia.org/wiki/Negation';
Blockly.LANG_MATH_CHANGE_TITLE_CHANGE = 'change';
Blockly.LANG_MATH_CHANGE_TITLE_ITEM = 'item';
Blockly.LANG_MATH_CHANGE_INPUT_BY = 'by';
Blockly.LANG_MATH_CHANGE_TOOLTIP_1 = 'Add a number to variable "%1".';

Blockly.LANG_MATH_SINGLE_HELPURL = 'http://en.wikipedia.org/wiki/Square_root';
Blockly.LANG_MATH_SINGLE_OP_ROOT = 'square root';
Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE = 'absolute';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT = 'Return the square root of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS = 'Return the absolute value of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG = 'Return the negation of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LN = 'Return the natural logarithm of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10 = 'Return the base 10 logarithm of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP = 'Return e to the power of a number.';
Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10 = 'Return 10 to the power of a number.';

Blockly.LANG_MATH_ROUND_HELPURL = 'http://en.wikipedia.org/wiki/Rounding';
Blockly.LANG_MATH_ROUND_TOOLTIP_1 = 'Round a number up or down.';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUND = 'round';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP = 'round up';
Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN = 'round down';

Blockly.LANG_MATH_TRIG_HELPURL = 'http://en.wikipedia.org/wiki/Trigonometric_functions';
Blockly.LANG_MATH_TRIG_TOOLTIP_SIN = 'Return the sine of a degree.';
Blockly.LANG_MATH_TRIG_TOOLTIP_COS = 'Return the cosine of a degree.';
Blockly.LANG_MATH_TRIG_TOOLTIP_TAN = 'Return the tangent of a degree.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN = 'Return the arcsine of a number.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS = 'Return the arccosine of a number.';
Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN = 'Return the arctangent of a number.';

Blockly.LANG_MATH_ONLIST_HELPURL = '';
Blockly.LANG_MATH_ONLIST_INPUT_OFLIST = 'of list';
Blockly.LANG_MATH_ONLIST_OPERATOR_SUM = 'sum';
Blockly.LANG_MATH_ONLIST_OPERATOR_MIN = 'min';
Blockly.LANG_MATH_ONLIST_OPERATOR_MAX = 'max';
Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE = 'average';
Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN = 'median';
Blockly.LANG_MATH_ONLIST_OPERATOR_MODE = 'modes';
Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV = 'standard deviation';
Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM = 'random item';
Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM = 'Return the sum of all the numbers in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN = 'Return the smallest number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX = 'Return the largest number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE = 'Return the arithmetic mean of the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN = 'Return the median number in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE = 'Return a list of the most common item(s) in the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV = 'Return the standard deviation of the list.';
Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM = 'Return a random element from the list.';

Blockly.LANG_MATH_CONSTRAIN_HELPURL = 'http://en.wikipedia.org/wiki/Clamping_%28graphics%29';
Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN = 'constrain';
Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW = 'between (low)';
Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH = 'and (high)';
Blockly.LANG_MATH_CONSTRAIN_TOOLTIP_1 = 'Constrain a number to be between the specified limits (inclusive).';

Blockly.LANG_MATH_MODULO_HELPURL = 'http://en.wikipedia.org/wiki/Modulo_operation';
Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND = 'remainder of';
Blockly.LANG_MATH_MODULO_TOOLTIP_1 = 'Return the remainder of dividing both numbers.';

Blockly.LANG_MATH_RANDOM_INT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM = 'random integer from';
Blockly.LANG_MATH_RANDOM_INT_INPUT_TO = 'to';
Blockly.LANG_MATH_RANDOM_INT_TOOLTIP_1 = 'Return a random integer between the two\n' +
    'specified limits, inclusive.';

Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL = 'http://en.wikipedia.org/wiki/Random_number_generation';
Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM = 'random fraction';
Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP_1 = 'Return a random fraction between\n' +
    '0.0 (inclusive) and 1.0 (exclusive).';

// Text Blocks.
Blockly.LANG_CATEGORY_TEXT = 'Text';
Blockly.LANG_TEXT_TEXT_HELPURL = 'http://en.wikipedia.org/wiki/String_(computer_science)';
Blockly.LANG_TEXT_TEXT_TOOLTIP_1 = 'A letter, word, or line of text.';

Blockly.LANG_TEXT_JOIN_HELPURL = '';
Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH = 'create text with';
Blockly.LANG_TEXT_JOIN_TOOLTIP_1 = 'Create a piece of text by joining\n' +
    'together any number of items.';

Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN = 'join';
Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this text block.';

Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = 'item';
Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP_1 = 'Add an item to the text.';

Blockly.LANG_TEXT_APPEND_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_APPEND_TO = 'to';
Blockly.LANG_TEXT_APPEND_APPENDTEXT = 'append text';
Blockly.LANG_TEXT_APPEND_VARIABLE = 'item';
Blockly.LANG_TEXT_APPEND_TOOLTIP_1 = 'Append some text to variable "%1".';

Blockly.LANG_TEXT_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH = 'length';
Blockly.LANG_TEXT_LENGTH_TOOLTIP_1 = 'Returns number of letters (including spaces)\n' +
    'in the provided text.';

Blockly.LANG_TEXT_ISEMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY = 'is empty';
Blockly.LANG_TEXT_ISEMPTY_TOOLTIP_1 = 'Returns true if the provided text is empty.';

Blockly.LANG_TEXT_ENDSTRING_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_ENDSTRING_INPUT = 'letters in text';
Blockly.LANG_TEXT_ENDSTRING_TOOLTIP_1 = 'Returns specified number of letters at the beginning or end of the text.';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST = 'first';
Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST = 'last';

Blockly.LANG_TEXT_INDEXOF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_INDEXOF_TITLE_FIND = 'find';
Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE = 'occurrence of text';
Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT = 'in text';
Blockly.LANG_TEXT_INDEXOF_TOOLTIP_1 = 'Returns the index of the first/last occurrence\n' +
    'of first text in the second text.\n' +
    'Returns 0 if text is not found.';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST = 'first';
Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST = 'last';

Blockly.LANG_TEXT_CHARAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_TEXT_CHARAT_INPUT_AT = 'letter at';
Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT = 'in text';
Blockly.LANG_TEXT_CHARAT_TOOLTIP_1 = 'Returns the letter at the specified position.';

Blockly.LANG_TEXT_CHANGECASE_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_CHANGECASE_TITLE_TO = 'to';
Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_1 = 'Return a copy of the text in a different case.';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE = 'UPPER CASE';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE = 'lower case';
Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE = 'Title Case';

Blockly.LANG_TEXT_TRIM_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_TRIM_TITLE_SPACE = 'trim spaces from';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'sides';
Blockly.LANG_TEXT_TRIM_TOOLTIP_1 = 'Return a copy of the text with spaces\n' +
    'removed from one or both ends.';
Blockly.LANG_TEXT_TRIM_TITLE_SIDES = 'sides';
Blockly.LANG_TEXT_TRIM_TITLE_SIDE = 'side';
Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH = 'both';
Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT = 'left';
Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT = 'right';

Blockly.LANG_TEXT_PRINT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_TEXT_PRINT_TITLE_PRINT = 'print';
Blockly.LANG_TEXT_PRINT_TOOLTIP_1 = 'Print the specified text, number or other value.';

Blockly.LANG_TEXT_PROMPT_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode92.html';
Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR = 'prompt for';
Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE = 'with message';
Blockly.LANG_TEXT_PROMPT_TOOLTIP_1 = 'Prompt for user input with the specified text.';
Blockly.LANG_TEXT_PROMPT_TYPE_TEXT = 'text';
Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER = 'number';

// Lists Blocks.
Blockly.LANG_CATEGORY_LISTS = 'Lists';
Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL = 'http://en.wikipedia.org/wiki/Linked_list#Empty_lists';
Blockly.LANG_LISTS_CREATE_EMPTY_TITLE_1 = 'create empty list';
Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP_1 = 'Returns a list, of length 0, containing no data records';

Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH = 'create list with';
Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP_1 = 'Create a list with any number of items.';

Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = 'list';
Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this list block.';

Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE = 'item';
Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP_1 = 'Add an item to the list.';

Blockly.LANG_LISTS_REPEAT_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_REPEAT_INPUT_WITH = 'create list with item';
Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED = 'repeated';
Blockly.LANG_LISTS_REPEAT_INPUT_TIMES = 'times';
Blockly.LANG_LISTS_REPEAT_TOOLTIP_1 = 'Creates a list consisting of the given value\n' +
    'repeated the specified number of times.';

Blockly.LANG_LISTS_LENGTH_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH = 'length';
Blockly.LANG_LISTS_LENGTH_TOOLTIP_1 = 'Returns the length of a list.';

Blockly.LANG_LISTS_IS_EMPTY_HELPURL = 'http://www.liv.ac.uk/HPC/HTMLF90Course/HTMLF90CourseNotesnode91.html';
Blockly.LANG_LISTS_INPUT_IS_EMPTY = 'is empty';
Blockly.LANG_LISTS_TOOLTIP_1 = 'Returns true if the list is empty.';

Blockly.LANG_LISTS_INDEX_OF_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND = 'find';
Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE = 'occurrence of item';
Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_INDEX_OF_TOOLTIP_1 = 'Returns the index of the first/last occurrence\n' +
    'of the item in the list.\n' +
    'Returns 0 if text is not found.';
Blockly.LANG_LISTS_INDEX_OF_FIRST = 'first';
Blockly.LANG_LISTS_INDEX_OF_LAST = 'last';

Blockly.LANG_LISTS_GET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_GET_INDEX_INPUT_AT = 'get item at';
Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_1 = 'Returns the value at the specified position in a list.';

Blockly.LANG_LISTS_SET_INDEX_HELPURL = 'http://publib.boulder.ibm.com/infocenter/lnxpcomp/v8v101/index.jsp?topic=%2Fcom.ibm.xlcpp8l.doc%2Flanguage%2Fref%2Farsubex.htm';
Blockly.LANG_LISTS_SET_INDEX_INPUT_AT = 'set item at';
Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST = 'in list';
Blockly.LANG_LISTS_SET_INDEX_INPUT_TO = 'to';
Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1 = 'Sets the value at the specified position in a list.';

// Variables Blocks.
Blockly.LANG_VARIABLES_GET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_GET_TITLE_1 = 'get';
Blockly.LANG_VARIABLES_GET_ITEM = 'item';
Blockly.LANG_VARIABLES_GET_TOOLTIP_1 = 'Returns the value of this variable.';

Blockly.LANG_VARIABLES_SET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
Blockly.LANG_VARIABLES_SET_TITLE_1 = 'set';
Blockly.LANG_VARIABLES_SET_ITEM = 'item';
Blockly.LANG_VARIABLES_SET_TOOLTIP_1 = 'Sets this variable to be equal to the input.';

// Procedures Blocks.
Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE = 'procedure';
Blockly.LANG_PROCEDURES_DEFNORETURN_DO = 'do';
Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP_1 = 'A procedure with no return value.';

Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_DEFRETURN_DO = Blockly.LANG_PROCEDURES_DEFNORETURN_DO;
Blockly.LANG_PROCEDURES_DEFRETURN_RETURN = 'return';
Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP_1 = 'A procedure with a return value.';

Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING = 'Warning:\n' +
    'This procedure has\n' +
    'duplicate parameters.';

Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLNORETURN_CALL = 'do';
Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE = 'procedure';
Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP_1 = 'Call a procedure with no return value.';

Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL = 'http://en.wikipedia.org/wiki/Procedure_%28computer_science%29';
Blockly.LANG_PROCEDURES_CALLRETURN_CALL = Blockly.LANG_PROCEDURES_CALLNORETURN_CALL;
Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE = Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE;
Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP_1 = 'Call a procedure with a return value.';

Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE = 'parameters';
Blockly.LANG_PROCEDURES_MUTATORARG_TITLE = 'variable:';

Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF = 'Highlight Procedure';
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Control blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.controls_if = {
  // If/elseif/else condition.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_IF_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('IF0')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_IF);
    this.appendStatementInput('DO0')
        .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.LANG_CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
    for (var x = 1; x <= this.elseifCount_; x++) {
      this.appendValueInput('IF' + x)
          .setCheck(Boolean)
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + x)
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 1; x <= this.elseifCount_; x++) {
      var elseifBlock = new Blockly.Block(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = new Blockly.Block(workspace, 'controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var x = this.elseifCount_; x > 0; x--) {
      this.removeInput('IF' + x);
      this.removeInput('DO' + x);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              .setCheck(Boolean)
              .appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSEIF);
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendTitle(Blockly.LANG_CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendTitle(Blockly.LANG_CONTROLS_IF_MSG_ELSE);
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + x);
          var inputDo = this.getInput('DO' + x);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          x++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.controls_if_if = {
  // If condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_IF_TITLE_IF);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_CONTROLS_IF_IF_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_elseif = {
  // Else-If condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSEIF_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_if_else = {
  // Else condition.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_ELSE_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.controls_whileUntil = {
  // Do while/until loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_WHILEUNTIL_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('BOOL')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'MODE');
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('MODE');
      return Blockly.Language.controls_whileUntil.TOOLTIPS[op];
    });
  }
};

Blockly.Language.controls_whileUntil.OPERATORS =
    [[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
     [Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];

Blockly.Language.controls_whileUntil.TOOLTIPS = {
  WHILE: Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
  UNTIL: Blockly.LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
};

Blockly.Language.controls_for = {
  // For loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FOR_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_WITH)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR');
    this.appendValueInput('FROM')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOR_TOOLTIP_1.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.controls_forEach = {
  // For each loop.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FOREACH_HELPURL,
  init: function() {
    this.setColour(120);
    this.appendValueInput('LIST')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_ITEM)
        .appendTitle(new Blockly.FieldVariable(null), 'VAR')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_INLIST);
    this.appendStatementInput('DO')
        .appendTitle(Blockly.LANG_CONTROLS_FOREACH_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOREACH_TOOLTIP_1.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.controls_flow_statements = {
  // Flow statements: continue, break.
  category: Blockly.LANG_CATEGORY_CONTROLS,
  helpUrl: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_HELPURL,
  init: function() {
    this.setColour(120);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendDummyInput()
        .appendTitle(dropdown, 'FLOW')
        .appendTitle(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
    this.setPreviousStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('FLOW');
      return Blockly.Language.controls_flow_statements.TOOLTIPS[op];
    });
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a control statement?
    var block = this;
    do {
      if (block.type == 'controls_forEach' ||
          block.type == 'controls_for' ||
          block.type == 'controls_whileUntil') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  }
};

Blockly.Language.controls_flow_statements.OPERATORS =
    [[Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
     [Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];

Blockly.Language.controls_flow_statements.TOOLTIPS = {
  BREAK: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
  CONTINUE: Blockly.LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Logic blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.logic_compare = {
  // Comparison operator.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_compare.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_compare.OPERATORS =
    [['=', 'EQ'],
     ['\u2260', 'NEQ'],
     ['<', 'LT'],
     ['\u2264', 'LTE'],
     ['>', 'GT'],
     ['\u2265', 'GTE']];

Blockly.Language.logic_compare.TOOLTIPS = {
  EQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ,
  NEQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ,
  LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
  LTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE,
  GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT,
  GTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE
};

Blockly.Language.logic_operation = {
  // Logical operations: 'and', 'or'.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('A')
        .setCheck(Boolean);
    this.appendValueInput('B')
        .setCheck(Boolean)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return Blockly.Language.logic_operation.TOOLTIPS[op];
    });
  }
};

Blockly.Language.logic_operation.OPERATORS =
    [[Blockly.LANG_LOGIC_OPERATION_AND, 'AND'],
     [Blockly.LANG_LOGIC_OPERATION_OR, 'OR']];

Blockly.Language.logic_operation.TOOLTIPS = {
  AND: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND,
  OR: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR
};

Blockly.Language.logic_negate = {
  // Negation.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_NEGATE_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendValueInput('BOOL')
        .setCheck(Boolean)
        .appendTitle(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT);
    this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP_1);
  }
};

Blockly.Language.logic_boolean = {
  // Boolean data type: true and false.
  category: Blockly.LANG_CATEGORY_LOGIC,
  helpUrl: Blockly.LANG_LOGIC_BOOLEAN_HELPURL,
  init: function() {
    this.setColour(120);
    this.setOutput(true, Boolean);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'BOOL');
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  }
};

Blockly.Language.logic_boolean.OPERATORS =
    [[Blockly.LANG_LOGIC_BOOLEAN_TRUE, 'TRUE'],
     [Blockly.LANG_LOGIC_BOOLEAN_FALSE, 'FALSE']];
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Math blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.math_number = {
  // Numeric value.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_NUMBER_HELPURL,
  init: function() {
    this.setColour(230);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput('0',
        Blockly.Language.math_number.validator), 'NUM');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_MATH_NUMBER_TOOLTIP_1);
  }
};

Blockly.Language.math_number.validator = function(text) {
  // Ensure that only a number may be entered.
  // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
  var n = window.parseFloat(text || 0);
  return window.isNaN(n) ? null : String(n);
};

Blockly.Language.math_arithmetic = {
  // Basic arithmetic operator.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_ARITHMETIC_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('A')
        .setCheck(Number);
    this.appendValueInput('B')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_arithmetic.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_arithmetic.OPERATORS =
    [['+', 'ADD'],
     ['-', 'MINUS'],
     ['\u00D7', 'MULTIPLY'],
     ['\u00F7', 'DIVIDE'],
     ['^', 'POWER']];

Blockly.Language.math_arithmetic.TOOLTIPS = {
  ADD: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_ADD,
  MINUS: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MINUS,
  MULTIPLY: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
  DIVIDE: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE,
  POWER: Blockly.LANG_MATH_ARITHMETIC_TOOLTIP_POWER
};

Blockly.Language.math_change = {
  // Add to a variable in place.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_CHANGE_HELPURL,
  init: function() {
    this.setColour(230);
    this.appendValueInput('DELTA')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CHANGE_TITLE_CHANGE)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_MATH_CHANGE_TITLE_ITEM), 'VAR')
        .appendTitle(Blockly.LANG_MATH_CHANGE_INPUT_BY);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_MATH_CHANGE_TOOLTIP_1.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};


Blockly.Language.math_single = {
  // Advanced math operators with single operand.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_SINGLE_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_single.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_single.OPERATORS =
    [[Blockly.LANG_MATH_SINGLE_OP_ROOT, 'ROOT'],
     [Blockly.LANG_MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
     ['-', 'NEG'],
     ['ln', 'LN'],
     ['log10', 'LOG10'],
     ['e^', 'EXP'],
     ['10^', 'POW10']];

Blockly.Language.math_single.TOOLTIPS = {
  ROOT: Blockly.LANG_MATH_SINGLE_TOOLTIP_ROOT,
  ABS: Blockly.LANG_MATH_SINGLE_TOOLTIP_ABS,
  NEG: Blockly.LANG_MATH_SINGLE_TOOLTIP_NEG,
  LN: Blockly.LANG_MATH_SINGLE_TOOLTIP_LN,
  LOG10: Blockly.LANG_MATH_SINGLE_TOOLTIP_LOG10,
  EXP: Blockly.LANG_MATH_SINGLE_TOOLTIP_EXP,
  POW10: Blockly.LANG_MATH_SINGLE_TOOLTIP_POW10
};


Blockly.Language.math_round = {
  // Rounding functions.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_ROUND_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setTooltip(Blockly.LANG_MATH_ROUND_TOOLTIP_1);
  }
};

Blockly.Language.math_round.OPERATORS =
    [[Blockly.LANG_MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
     [Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
     [Blockly.LANG_MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']];

Blockly.Language.math_trig = {
  // Trigonometry operators.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_TRIG_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_trig.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_trig.OPERATORS =
    [['sin', 'SIN'],
     ['cos', 'COS'],
     ['tan', 'TAN'],
     ['asin', 'ASIN'],
     ['acos', 'ACOS'],
     ['atan', 'ATAN']];

Blockly.Language.math_trig.TOOLTIPS = {
  SIN: Blockly.LANG_MATH_TRIG_TOOLTIP_SIN,
  COS: Blockly.LANG_MATH_TRIG_TOOLTIP_COS,
  TAN: Blockly.LANG_MATH_TRIG_TOOLTIP_TAN,
  ASIN: Blockly.LANG_MATH_TRIG_TOOLTIP_ASIN,
  ACOS: Blockly.LANG_MATH_TRIG_TOOLTIP_ACOS,
  ATAN: Blockly.LANG_MATH_TRIG_TOOLTIP_ATAN
};

Blockly.Language.math_on_list = {
  // Evaluate a list of numbers to return sum, average, min, max, etc.
  // Some functions also work on text (min, max, mode, median).
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_ONLIST_HELPURL,
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour(230);
    this.setOutput(true, Number);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS, function(newOp) {
      if (newOp == Blockly.LANG_MATH_ONLIST_OPERATOR_MODE) {
        thisBlock.outputConnection.setCheck(Array);
      } else {
        thisBlock.outputConnection.setCheck(Number);
      }
      this.setText(newOp);
    });
    this.appendValueInput('LIST')
        .setCheck(Array)
        .appendTitle(dropdown, 'OP')
        .appendTitle(Blockly.LANG_MATH_ONLIST_INPUT_OFLIST);
    this.setTooltip(function() {
      var mode = thisBlock.getTitleValue('OP');
      return Blockly.Language.math_on_list.TOOLTIPS[mode];
    });
  }
};

Blockly.Language.math_on_list.OPERATORS =
    [[Blockly.LANG_MATH_ONLIST_OPERATOR_SUM, 'SUM'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MIN, 'MIN'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MAX, 'MAX'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_MODE, 'MODE'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
     [Blockly.LANG_MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']];

Blockly.Language.math_on_list.TOOLTIPS = {
  SUM: Blockly.LANG_MATH_ONLIST_TOOLTIP_SUM,
  MIN: Blockly.LANG_MATH_ONLIST_TOOLTIP_MIN,
  MAX: Blockly.LANG_MATH_ONLIST_TOOLTIP_MAX,
  AVERAGE: Blockly.LANG_MATH_ONLIST_TOOLTIP_AVERAGE,
  MEDIAN: Blockly.LANG_MATH_ONLIST_TOOLTIP_MEDIAN,
  MODE: Blockly.LANG_MATH_ONLIST_TOOLTIP_MODE,
  STD_DEV: Blockly.LANG_MATH_ONLIST_TOOLTIP_STD_DEV,
  RANDOM: Blockly.LANG_MATH_ONLIST_TOOLTIP_RANDOM
};

Blockly.Language.math_constrain = {
  // Constrain a number between two limits.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_CONSTRAIN_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN);
    this.appendValueInput('LOW')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW);
    this.appendValueInput('HIGH')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_CONSTRAIN_TOOLTIP_1);
  }
};

Blockly.Language.math_modulo = {
  // Remainder of a division.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_MODULO_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('DIVIDEND')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_MODULO_INPUT_DIVIDEND);
    this.appendValueInput('DIVISOR')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle('\u00F7');
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_MODULO_TOOLTIP_1);
  }
};

Blockly.Language.math_random_int = {
  // Random integer between [X] and [Y].
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_RANDOM_INT_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendValueInput('FROM')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_MATH_RANDOM_INT_INPUT_TO);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_RANDOM_INT_TOOLTIP_1);
  }
};

Blockly.Language.math_random_float = {
  // Random fraction between 0 and 1.
  category: Blockly.LANG_CATEGORY_MATH,
  helpUrl: Blockly.LANG_MATH_RANDOM_FLOAT_HELPURL,
  init: function() {
    this.setColour(230);
    this.setOutput(true, Number);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_MATH_RANDOM_FLOAT_TITLE_RANDOM);
    this.setTooltip(Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP_1);
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.text = {
  // Text value.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_TEXT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote0.png', 12, 12))
        .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote1.png', 12, 12));
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TEXT_TOOLTIP_1);
  }
};

Blockly.Language.text_join = {
  // Create a string made up of any number of elements of any type.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_JOIN_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('ADD0')
        .appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
    this.appendValueInput('ADD1');
    this.setOutput(true, String);
    this.setMutator(new Blockly.Mutator(['text_create_join_item']));
    this.setTooltip(Blockly.LANG_TEXT_JOIN_TOOLTIP_1);
    this.itemCount_ = 2;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('ADD' + x);
      if (x == 0) {
        input.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
      }
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote0.png', 12, 12))
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote1.png', 12, 12));
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'text_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'text_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('ADD' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('ADD' + this.itemCount_);
      if (this.itemCount_ == 0) {
        input.appendTitle(Blockly.LANG_TEXT_JOIN_TITLE_CREATEWITH);
      }
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote0.png', 12, 12))
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote1.png', 12, 12));
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.text_create_join_container = {
  // Container.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.text_create_join_item = {
  // Add items.
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.text_append = {
  // Append to a variable in place.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_APPEND_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(Blockly.LANG_TEXT_APPEND_TO)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_TEXT_APPEND_VARIABLE), 'VAR')
        .appendTitle(Blockly.LANG_TEXT_APPEND_APPENDTEXT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_TEXT_APPEND_TOOLTIP_1.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.text_length = {
  // String length.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_LENGTH_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck([String, Array])
        .appendTitle(Blockly.LANG_TEXT_LENGTH_INPUT_LENGTH);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_TEXT_LENGTH_TOOLTIP_1);
  }
};

Blockly.Language.text_isEmpty = {
  // Is the string null?
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_ISEMPTY_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck([String, Array])
        .appendTitle(Blockly.LANG_TEXT_ISEMPTY_INPUT_ISEMPTY);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_TEXT_ISEMPTY_TOOLTIP_1);
  }
};

Blockly.Language.text_endString = {
  // Return a leading or trailing substring.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_ENDSTRING_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, String);
    var menu = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(menu, 'END');
    this.appendValueInput('TEXT')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_ENDSTRING_INPUT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_ENDSTRING_TOOLTIP_1);
  }
};

Blockly.Language.text_endString.OPERATORS =
    [[Blockly.LANG_TEXT_ENDSTRING_OPERATOR_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_ENDSTRING_OPERATOR_LAST, 'LAST']];

Blockly.Language.text_indexOf = {
  // Find a substring in the text.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_INDEXOF_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, Number);
    this.appendValueInput('FIND')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_INDEXOF_TITLE_FIND)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'END')
        .appendTitle(Blockly.LANG_TEXT_INDEXOF_INPUT_OCCURRENCE);
    this.appendValueInput('VALUE')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_INDEXOF_INPUT_INTEXT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_INDEXOF_TOOLTIP_1);
  }
};

Blockly.Language.text_indexOf.OPERATORS =
    [[Blockly.LANG_TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'],
     [Blockly.LANG_TEXT_INDEXOF_OPERATOR_LAST, 'LAST']];

Blockly.Language.text_charAt = {
  // Get a character from the string.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_CHARAT_HELPURL,
  init: function() {
    this.setColour(160);
    this.setOutput(true, String);
    this.appendValueInput('AT')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_TEXT_CHARAT_INPUT_AT);
    this.appendValueInput('VALUE')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_CHARAT_INPUT_INTEXT);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_TEXT_CHARAT_TOOLTIP_1);
  }
};

Blockly.Language.text_changeCase = {
  // Change capitalization.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_CHANGECASE_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_CHANGECASE_TITLE_TO)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'CASE');
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_CHANGECASE_TOOLTIP_1);
  }
};

Blockly.Language.text_changeCase.OPERATORS =
    [[Blockly.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
     [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE'],
     [Blockly.LANG_TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']];

Blockly.Language.text_trim = {
  // Trim spaces.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_TRIM_HELPURL,
  init: function() {
    this.setColour(160);
    var menu = new Blockly.FieldDropdown(this.OPERATORS, function(text) {
      var newTitle = (text == Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH) ?
          Blockly.LANG_TEXT_TRIM_TITLE_SIDES :
          Blockly.LANG_TEXT_TRIM_TITLE_SIDE;
      this.sourceBlock_.setTitleValue(newTitle, 'SIDES');
      this.setText(text);
    });
    this.appendValueInput('TEXT')
        .setCheck(String)
        .appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SPACE)
        .appendTitle(menu, 'MODE')
        .appendTitle(Blockly.LANG_TEXT_TRIM_TITLE_SIDES, 'SIDES');
    this.setOutput(true, String);
    this.setTooltip(Blockly.LANG_TEXT_TRIM_TOOLTIP_1);
  },
  mutationToDom: function() {
    // Save whether the 'sides' title should be plural or singular.
    var container = document.createElement('mutation');
    var plural = (this.getTitleValue('MODE') == 'BOTH');
    container.setAttribute('plural', plural);
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the 'sides' title as plural or singular.
    var plural = (xmlElement.getAttribute('plural') == 'true');
    this.setTitleValue(plural ? Blockly.LANG_TEXT_TRIM_TITLE_SIDES :
                      Blockly.LANG_TEXT_TRIM_TITLE_SIDE, 'SIDES');
  }
};

Blockly.Language.text_trim.OPERATORS =
    [[Blockly.LANG_TEXT_TRIM_OPERATOR_BOTH, 'BOTH'],
     [Blockly.LANG_TEXT_TRIM_OPERATOR_LEFT, 'LEFT'],
     [Blockly.LANG_TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']];

Blockly.Language.text_print = {
  // Print statement.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_PRINT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(Blockly.LANG_TEXT_PRINT_TITLE_PRINT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_PRINT_TOOLTIP_1);
  }
};

Blockly.Language.text_prompt = {
  // Prompt function.
  category: Blockly.LANG_CATEGORY_TEXT,
  helpUrl: Blockly.LANG_TEXT_PROMPT_HELPURL,
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_PROMPT_TITLE_PROMPT_FOR)
        .appendTitle(new Blockly.FieldDropdown(this.TYPES), 'TYPE')
        .appendTitle(Blockly.LANG_TEXT_PROMPT_TITILE_WITH_MESSAGE)
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote0.png', 12, 12))
        .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote1.png', 12, 12));
    this.setOutput(true, [Number, String]);
    this.setTooltip(Blockly.LANG_TEXT_PROMPT_TOOLTIP_1);
  }
};

Blockly.Language.text_prompt.TYPES =
    [[Blockly.LANG_TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
     [Blockly.LANG_TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview List blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.lists_create_empty = {
  // Create an empty list.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_CREATE_EMPTY_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Array);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE_1);
    this.setTooltip(Blockly.LANG_LISTS_CREATE_EMPTY_TOOLTIP_1);
  }
};

Blockly.Language.lists_create_with = {
  // Create a list with any number of elements of any type.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: '',
  init: function() {
    this.setColour(210);
    this.appendValueInput('ADD0')
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH);
    this.appendValueInput('ADD1');
    this.appendValueInput('ADD2');
    this.setOutput(true, Array);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_TOOLTIP_1);
    this.itemCount_ = 3;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(container) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('ADD' + x);
      if (x == 0) {
        input.appendTitle(Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH);
      }
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE_1);
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('ADD' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('ADD' + this.itemCount_);
      if (this.itemCount_ == 0) {
        input.appendTitle(Blockly.LANG_LISTS_CREATE_WITH_INPUT_WITH);
      }
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(Blockly.LANG_LISTS_CREATE_EMPTY_TITLE_1);
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.lists_create_with_container = {
  // Container.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_CONTAINER_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.lists_create_with_item = {
  // Add items.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.lists_repeat = {
  // Create a list with one element repeated.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_REPEAT_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Array);
    this.appendValueInput('ITEM')
        .appendTitle(Blockly.LANG_LISTS_REPEAT_INPUT_WITH);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_LISTS_REPEAT_INPUT_REPEATED);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_LISTS_REPEAT_INPUT_TIMES);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LISTS_REPEAT_TOOLTIP_1);
  }
};

Blockly.Language.lists_length = {
  // List length.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_LENGTH_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput('VALUE')
        .setCheck([Array, String])
        .appendTitle(Blockly.LANG_LISTS_LENGTH_INPUT_LENGTH);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LANG_LISTS_LENGTH_TOOLTIP_1);
  }
};

Blockly.Language.lists_isEmpty = {
  // Is the list empty?
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_IS_EMPTY_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput('VALUE')
        .setCheck([Array, String])
        .appendTitle(Blockly.LANG_LISTS_INPUT_IS_EMPTY);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LISTS_TOOLTIP_1);
  }
};

Blockly.Language.lists_indexOf = {
  // Find an item in the list.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_INDEX_OF_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Number);
    this.appendValueInput('FIND')
        .appendTitle(Blockly.LANG_LISTS_INDEX_OF_TITLE_FIND)
        .appendTitle(new Blockly.FieldDropdown(this.OPERATORS), 'END')
        .appendTitle(Blockly.LANG_LISTS_INDEX_OF_INPUT_OCCURRENCE);
    this.appendValueInput('VALUE')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_INDEX_OF_INPUT_IN_LIST);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LISTS_INDEX_OF_TOOLTIP_1);
  }
};

Blockly.Language.lists_indexOf.OPERATORS =
    [[Blockly.LANG_LISTS_INDEX_OF_FIRST, 'FIRST'],
     [Blockly.LANG_LISTS_INDEX_OF_LAST, 'LAST']];

Blockly.Language.lists_getIndex = {
  // Get element at index.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_GET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, null);
    this.appendValueInput('AT')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_LISTS_GET_INDEX_INPUT_AT);
    this.appendValueInput('VALUE')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_GET_INDEX_INPUT_IN_LIST);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LISTS_GET_INDEX_TOOLTIP_1);
  }
};

Blockly.Language.lists_setIndex = {
  // Set element at index.
  category: Blockly.LANG_CATEGORY_LISTS,
  helpUrl: Blockly.LANG_LISTS_SET_INDEX_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput('AT')
        .setCheck(Number)
        .appendTitle(Blockly.LANG_LISTS_SET_INDEX_INPUT_AT);
    this.appendValueInput('LIST')
        .setCheck(Array)
        .appendTitle(Blockly.LANG_LISTS_SET_INDEX_INPUT_IN_LIST);
    this.appendValueInput('TO')
        .appendTitle(Blockly.LANG_LISTS_SET_INDEX_INPUT_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP_1);
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.variables_get = {
  // Variable getter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_VARIABLES_GET_TITLE_1)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_VARIABLES_GET_TOOLTIP_1);
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Language.variables_set = {
  // Variable setter.
  category: null,  // Variables are handled specially.
  helpUrl: Blockly.LANG_VARIABLES_SET_HELPURL,
  init: function() {
    this.setColour(330);
    this.appendValueInput('VALUE')
        .appendTitle(Blockly.LANG_VARIABLES_SET_TITLE_1)
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_VARIABLES_SET_ITEM), 'VAR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_VARIABLES_SET_TOOLTIP_1);
  },
  getVars: function() {
    return [this.getTitleValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Procedure blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.Language.procedures_defnoreturn = {
  // Define a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFNORETURN_HELPURL,
  init: function() {
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(
        Blockly.LANG_PROCEDURES_DEFNORETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle(Blockly.LANG_PROCEDURES_DEFNORETURN_DO);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFNORETURN_TOOLTIP_1);
    this.arguments_ = [];
  },
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var x = 0; x < this.arguments_.length; x++) {
      if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[x].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.LANG_PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = this.arguments_.join(', ');
    this.setTitleValue(paramString, 'PARAMS');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'procedures_mutatorcontainer');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.arguments_.length; x++) {
      var paramBlock = new Blockly.Block(workspace, 'procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setTitleValue(this.arguments_[x], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = x;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
                                     this.workspace, this.arguments_, null);
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getTitleValue('NAME'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this.getTitleValue('NAME'),
        this.workspace, this.arguments_, this.paramIds_);
  },
  dispose: function() {
    var name = this.getTitleValue('NAME');
    var editable = this.editable;
    var workspace = this.workspace;
    // Call parent's destructor.
    Blockly.Block.prototype.dispose.apply(this, arguments);
    if (editable) {
      // Dispose of any callers.
      Blockly.Procedures.disposeCallers(name, workspace);
    }
  },
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES NOT have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, false];
  },
  getVars: function() {
    return this.arguments_;
  },
  renameVar: function(oldName, newName) {
    var change = false;
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible_()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var x = 0, block; block = blocks[x]; x++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getTitleValue('NAME'))) {
            block.setTitleValue(newName, 'NAME');
          }
        }
      }
    }
  }
};

Blockly.Language.procedures_defreturn = {
  // Define a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_DEFRETURN_HELPURL,
  init: function() {
    this.setColour(290);
    var name = Blockly.Procedures.findLegalName(
        Blockly.LANG_PROCEDURES_DEFRETURN_PROCEDURE, this);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput(name,
        Blockly.Procedures.rename), 'NAME')
        .appendTitle('', 'PARAMS');
    this.appendStatementInput('STACK')
        .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_DO);
    this.appendValueInput('RETURN')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    this.setTooltip(Blockly.LANG_PROCEDURES_DEFRETURN_TOOLTIP_1);
    this.arguments_ = [];
  },
  updateParams_: Blockly.Language.procedures_defnoreturn.updateParams_,
  mutationToDom: Blockly.Language.procedures_defnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_defnoreturn.domToMutation,
  decompose: Blockly.Language.procedures_defnoreturn.decompose,
  compose: Blockly.Language.procedures_defnoreturn.compose,
  dispose: Blockly.Language.procedures_defnoreturn.dispose,
  getProcedureDef: function() {
    // Return the name of the defined procedure,
    // a list of all its arguments,
    // and that it DOES have a return value.
    return [this.getTitleValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Language.procedures_defnoreturn.getVars,
  renameVar: Blockly.Language.procedures_defnoreturn.renameVar
};

Blockly.Language.procedures_mutatorcontainer = {
  // Procedure container (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_MUTATORCONTAINER_TITLE);
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg = {
  // Procedure argument (for mutator dialog).
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_MUTATORARG_TITLE)
        .appendTitle(new Blockly.FieldTextInput('x',
        Blockly.Language.procedures_mutatorarg.validator), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Language.procedures_mutatorarg.validator = function(newVar) {
  // Merge runs of whitespace.  Strip leading and trailing whitespace.
  // Beyond this, all names are legal.
  newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
  return newVar || null;
};

Blockly.Language.procedures_callnoreturn = {
  // Call a procedure with no return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLNORETURN_HELPURL,
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_CALL)
        .appendTitle(Blockly.LANG_PROCEDURES_CALLNORETURN_PROCEDURE, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLNORETURN_TOOLTIP_1);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
  },
  getProcedureCall: function() {
    return this.getTitleValue('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('NAME'))) {
      this.setTitleValue(newName, 'NAME');
    }
  },
  setProcedureParameters: function(paramNames, paramIds) {
    // Data structures for parameters on each call block:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // paramNames = ['x', 'y', 'z']
    //     New param names.
    // paramIds = ['piua', 'f8b_', 'oi.o']
    //     IDs of params (consistent for each parameter through the life of a
    //     mutator, regardless of param renaming).
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkArguments_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      this.quarkConnections_ = {};
      this.quarkArguments_ = null;
      return;
    }
    if (paramIds.length != paramNames.length) {
      throw 'Error: paramNames and paramIds must be the same length.';
    }
    if (!this.quarkArguments_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      if (paramNames.join('\n') == this.arguments_.join('\n')) {
        // No change to the parameters, allow quarkConnections_ to be
        // populated with the existing connections.
        this.quarkArguments_ = paramIds;
      } else {
        this.quarkArguments_ = [];
      }
    }
    // Switch off rendering while the block is rebuilt.
    var savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (var x = this.arguments_.length - 1; x >= 0; x--) {
      var input = this.getInput('ARG' + x);
      if (input) {
        var connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkArguments_[x]] = connection;
        // Disconnect all argument blocks and remove all inputs.
        this.removeInput('ARG' + x);
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    this.quarkArguments_ = paramIds;
    for (var x = 0; x < this.arguments_.length; x++) {
      var input = this.appendValueInput('ARG' + x)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendTitle(this.arguments_[x]);
      if (this.quarkArguments_) {
        // Reconnect any child blocks.
        var quarkName = this.quarkArguments_[x];
        if (quarkName in this.quarkConnections_) {
          var connection = this.quarkConnections_[quarkName];
          if (!connection || connection.targetConnection ||
              connection.sourceBlock_.workspace != this.workspace) {
            // Block no longer exists or has been attached elsewhere.
            delete this.quarkConnections_[quarkName];
          } else {
            input.connection.connect(connection);
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  mutationToDom: function() {
    // Save the name and arguments (none of which are editable).
    var container = document.createElement('mutation');
    container.setAttribute('name', this.getTitleValue('NAME'));
    for (var x = 0; x < this.arguments_.length; x++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[x]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    // Restore the name and parameters.
    var name = xmlElement.getAttribute('name');
    this.setTitleValue(name, 'NAME');
    var def = Blockly.Procedures.getDefinition(name, this.workspace);
    if (def && def.mutator.isVisible()) {
      // Initialize caller with the mutator's IDs.
      this.setProcedureParameters(def.arguments_, def.paramIds_);
    } else {
      this.arguments_ = [];
      for (var x = 0, childNode; childNode = xmlElement.childNodes[x]; x++) {
        if (childNode.nodeName.toLowerCase() == 'arg') {
          this.arguments_.push(childNode.getAttribute('name'));
        }
      }
      // For the second argument (paramIds) use the arguments list as a dummy
      // list.
      this.setProcedureParameters(this.arguments_, this.arguments_);
    }
  },
  renameVar: function(oldName, newName) {
    for (var x = 0; x < this.arguments_.length; x++) {
      if (Blockly.Names.equals(oldName, this.arguments_[x])) {
        this.arguments_[x] = newName;
        this.getInput('ARG' + x).titleRow[0].setText(newName);
      }
    }
  },
  customContextMenu: function(options) {
    // Add option to find caller.
    var option = {enabled: true};
    option.text = Blockly.LANG_PROCEDURES_HIGHLIGHT_DEF;
    var name = this.getTitleValue('NAME');
    var workspace = this.workspace;
    option.callback = function() {
      var def = Blockly.Procedures.getDefinition(name, workspace);
      def && def.select();
    };
    options.push(option);
  }
};

Blockly.Language.procedures_callreturn = {
  // Call a procedure with a return value.
  category: null,  // Procedures are handled specially.
  helpUrl: Blockly.LANG_PROCEDURES_CALLRETURN_HELPURL,
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_PROCEDURES_CALLRETURN_CALL)
        .appendTitle(Blockly.LANG_PROCEDURES_CALLRETURN_PROCEDURE, 'NAME');
    this.setOutput(true, null);
    this.setTooltip(Blockly.LANG_PROCEDURES_CALLRETURN_TOOLTIP_1);
    this.arguments_ = [];
    this.quarkConnections_ = null;
    this.quarkArguments_ = null;
  },
  getProcedureCall: Blockly.Language.procedures_callnoreturn.getProcedureCall,
  renameProcedure: Blockly.Language.procedures_callnoreturn.renameProcedure,
  setProcedureParameters:
      Blockly.Language.procedures_callnoreturn.setProcedureParameters,
  mutationToDom: Blockly.Language.procedures_callnoreturn.mutationToDom,
  domToMutation: Blockly.Language.procedures_callnoreturn.domToMutation,
  renameVar: Blockly.Language.procedures_callnoreturn.renameVar,
  customContextMenu: Blockly.Language.procedures_callnoreturn.customContextMenu
};

Blockly.Language.procedures_return = {
  // Return value in a procedure 
  category: null,
  helpUrl: null,
  init: function() {
    this.setColour(290);
    this.appendValueInput("VALUE", Number)
      .appendTitle(Blockly.LANG_PROCEDURES_DEFRETURN_RETURN);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("return in procedure");
  }
};

Blockly.Language.procedures_null = {
  // Return nothing
  category: null,
  helpUrl: null,
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle('Null');
    this.setOutput(true,null);
    this.setTooltip('Return nothing');
  }
};

