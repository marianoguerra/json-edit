/*global Blockly, document, window, location*/
var eflang = (function () {
    'use strict';
    var JS = Blockly.JavaScript,
        Lang = Blockly.Blocks,
        B = Blockly;

    B.HSV_VALUE = 0.75;
    B.HSV_SATURATION = 0.30;
    Lang.TEXT_TYPE_HUE = 79;
    Lang.COLOUR_TYPE_HUE = 191;
    Lang.VARIABLE_TYPE_HUE = 330;
    Lang.PROCEDURE_TYPE_HUE = 290;
    Lang.LIST_TYPE_HUE = 260;
    Lang.LOOPS_TYPE_HUE = 120;
    Lang.LOGIC_TYPE_HUE = 210;

    B.LANG_VARIABLES_GET_FIELD_INPUT_FIELD = "get";
    B.LANG_VARIABLES_GET_FIELD_INPUT_IN = 'from object';
    B.LANG_VARIABLES_GET_FIELD_INPUT_FROM_TOOLTIP_1 = 'Returns the value of field in an object.';
    // Out Variables Blocks.
    B.LANG_VARIABLES_OUTGET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
    B.LANG_VARIABLES_OUTGET_TITLE_1 = 'get outvar';
    B.LANG_VARIABLES_OUTGET_ITEM = 'item';
    B.LANG_VARIABLES_OUTGET_TOOLTIP_1 = 'Returns the value of this output variable.';
    B.LANG_VARIABLES_VALUEGET_TOOLTIP_1 = 'Returns the field inside the value field';

    B.LANG_VARIABLES_OUTSET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
    B.LANG_VARIABLES_OUTSET_TITLE_1 = 'set outvar';
    B.LANG_VARIABLES_OUTSET_ITEM = 'item';
    B.LANG_VARIABLES_OUTSET_TOOLTIP_1 = 'Sets this output variable to be equal to the input.';

    B.LANG_CONST_OUTGET_TITLE_1 = "get constant";
    B.LANG_CONST_OUTGET_TOOLTIP_1 = "Returns the value of a constant";

    B.LANG_CATEGORY_OBJS = "Objects";
    B.LANG_CATEGORY_PROCS = "Procedures";

    B.LANG_PROCS_CALL_NAME = 'procedureName';
    B.LANG_PROCS_CALL_WITH_INPUT_WITH = 'with';
    B.LANG_PROCS_CALL_WITH_TOOLTIP_1 = 'Call a procedure with any number of arguments.';

    B.LANG_PROCS_CALL_WITH_CONTAINER_TITLE_ADD = 'procedure';
    B.LANG_PROCS_CALL_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this procedure call.';

    B.LANG_PROCS_CALL_WITH_NAME = 'Call';
    B.LANG_PROCS_CALL_WITH_ITEM_TITLE = 'argument';
    B.LANG_PROCS_CALL_WITH_ITEM_TOOLTIP_1 = 'Add an argument to the argument list.';

    B.LANG_OBJS_CREATE_WITH_INPUT_WITH = 'create object with';
    B.LANG_OBJS_CREATE_WITH_TOOLTIP_1 = 'Create an object with any number of fields.';

    B.LANG_OBJS_CREATE_WITH_CONTAINER_TITLE_ADD = 'object';
    B.LANG_OBJS_CREATE_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this object block.';

    B.LANG_OBJS_CREATE_WITH_ITEM_TITLE = 'field';
    B.LANG_OBJS_CREATE_WITH_ITEM_TOOLTIP_1 = 'Add a field to the object.';

    B.eflang = {};
    B.eflang.constants = [["NAME", "NAME"]];
    B.eflang.constantsPath = "libs.consts.";
    B.eflang.math_set_precision_fun = "libs.format.floatPrecision";
    B.eflang.db_store_fun = "libs.store.set";
    B.eflang.db_fetch_fun = "libs.store.get";
    B.eflang.db_incr_fun = "libs.store.incr";
    B.eflang.db_decr_fun = "libs.store.decr";

    Lang.const_get = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
            .appendTitle(B.LANG_CONST_OUTGET_TITLE_1)
            .appendTitle(new B.FieldDropdown(B.eflang.constants), 'CONST');

            this.setOutput(true, null);
            this.setTooltip(B.LANG_CONST_OUTGET_TOOLTIP_1);
        }
    };

    Lang.variables_outget = {
        helpUrl: B.LANG_VARIABLES_GET_HELPURL,
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle(B.LANG_VARIABLES_OUTGET_TITLE_1)
                .appendTitle(new B.FieldTextInput("name"), 'VAR');
            this.setOutput(true, null);
            this.setTooltip(B.LANG_VARIABLES_OUTGET_TOOLTIP_1);
        }
    };

    Lang.variables_outget_str = {
        helpUrl: B.LANG_VARIABLES_GET_HELPURL,
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle("get from outvar")
                .appendTitle(new B.FieldTextInput("name"), 'VAR');
            this.appendValueInput('KEY')
                .setCheck("String")
                .appendTitle("key");
            this.setOutput(true, null);
            this.setTooltip(B.LANG_VARIABLES_OUTGET_TOOLTIP_1);
            this.setInputsInline(true);
        }
    };

    Lang.variables_valueget = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle("get value")
                .appendTitle(new B.FieldTextInput("name"), 'VAR');
            this.setOutput(true, null);
            this.setTooltip(B.LANG_VARIABLES_VALUEGET_TOOLTIP_1);
        },
    };

    Lang.variables_valueget_str = {
        helpUrl: B.LANG_VARIABLES_GET_HELPURL,
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle("get from value")
                .appendTitle(new B.FieldTextInput("name"), 'VAR');
            this.appendValueInput('KEY')
                .setCheck("String")
                .appendTitle("key");
            this.setOutput(true, null);
            this.setTooltip(B.LANG_VARIABLES_VALUEGET_TOOLTIP_1);
            this.setInputsInline(true);
        }
    };

    Lang.variables_outset = {
        helpUrl: B.LANG_VARIABLES_OUTSET_HELPURL,
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendValueInput('VALUE')
                .appendTitle(B.LANG_VARIABLES_OUTSET_TITLE_1)
                .appendTitle(new B.FieldTextInput(B.LANG_VARIABLES_OUTSET_ITEM
), 'VAR');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(B.LANG_VARIABLES_OUTSET_TOOLTIP_1);
        }
    };

    JS.const_get = function () {
        var code = this.getTitleValue('CONST');
        return [B.eflang.constantsPath + code, JS.ORDER_ATOMIC];
    };

    JS.variables_outget = function () {
        // Variable getter.
        var code = this.getTitleValue('VAR');
        return ["env." + code, JS.ORDER_ATOMIC];
    };

    JS.variables_outget_str = function () {
        var code = this.getTitleValue('VAR'),
            key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key';
        return ["env." + code + "[" + key + "]", JS.ORDER_ATOMIC];
    };

    JS.variables_valueget = function () {
        // Variable getter.
        var code = this.getTitleValue('VAR');
        return ["env.value." + code, JS.ORDER_ATOMIC];
    };

    JS.variables_valueget_str = function () {
        var code = this.getTitleValue('VAR'),
            key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key';
        return ["env.value." + code + "[" + key + "]", JS.ORDER_ATOMIC];
    };

    JS.variables_outset = function () {
        // Variable setter.
        var argument0 = JS.valueToCode(this, 'VALUE',
                                       JS.ORDER_ASSIGNMENT) || '0',
            varName = this.getTitleValue('VAR');

        return "env." + varName + ' = ' + argument0 + ';\n';
    };

    B.LANG_VARIABLES_GETPATH_TITLE = "get var path";
    B.LANG_VARIABLES_GETPATH_ITEM = "item.child";
    B.LANG_VARIABLES_GETPATH_TOOLTIP = 'Returns the value of this path.';

    Lang.variables_getpath = {
        helpUrl: B.LANG_VARIABLES_GET_HELPURL,
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
            .appendTitle(B.LANG_VARIABLES_GETPATH_TITLE)
            .appendTitle(new B.FieldTextInput(
                B.LANG_VARIABLES_GETPATH_ITEM), 'VAR');
            this.setOutput(true, null);
            this.setTooltip(B.LANG_VARIABLES_GETPATH_TOOLTIP);
        }
    };

    JS.variables_getpath = function () {
        var code = this.getTitleValue('VAR');
        return [code, JS.ORDER_ATOMIC];
    };

    JS.objs_create_with = function () {
        // Create a list with any number of elements of any type.
        var n, code = new Array(this.itemCount_);

        for (n = 0; n < this.itemCount_; n += 1) {
            code[n] = (this.getTitleValue('FIELD' + n)) + ": " +
                (JS.valueToCode(this, 'FIELD' + n,
                                JS.ORDER_COMMA) || 'null');
        }
        code = '{' + code.join(', ') + '}';
        return [code, JS.ORDER_ATOMIC];
    };


    Lang.objs_create_with = {
        addField: function (num, title) {
            var input = this.appendValueInput('FIELD' + num);

            //if (num === 0) {
            //    input.appendTitle(B.LANG_OBJS_CREATE_WITH_INPUT_WITH);
            //}

            input
                .appendTitle("key")
                .appendTitle(new B.FieldTextInput(title ||
                              B.LANG_VARIABLES_OUTSET_ITEM), 'FIELD' + num)
                .appendTitle(":");

            return input;
        },
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.addField(0);
            this.addField(1);
            this.addField(2);
            this.setOutput(true, Array);
            this.setMutator(new B.Mutator(['objs_create_with_item']));
            this.setTooltip(B.LANG_OBJS_CREATE_WITH_TOOLTIP_1);
            this.itemCount_ = 3;
        },
        mutationToDom: function (workspace) {
            var container = document.createElement('mutation');
            container.setAttribute('items', this.itemCount_);
            return container;
        },
        domToMutation: function (container) {
            var x, input;
            for (x = 0; x < this.itemCount_; x += 1) {
                this.removeInput('FIELD' + x);
            }
            this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
            for (x = 0; x < this.itemCount_; x += 1) {
                input = this.addField(x);
            }
            if (this.itemCount_ === 0) {
                this.appendDummyInput('EMPTY')
                .appendTitle(B.LANG_OBJS_CREATE_EMPTY_TITLE_1);
            }
        },
        decompose: function (workspace) {
            var connection, x, itemBlock, containerBlock = new B.Block(workspace,
                                             'objs_create_with_container');
            containerBlock.initSvg();
            connection = containerBlock.getInput('STACK').connection;
            for (x = 0; x < this.itemCount_; x += 1) {
                itemBlock = new B.Block(workspace, 'objs_create_with_item');
                itemBlock.initSvg();
                connection.connect(itemBlock.previousConnection);
                connection = itemBlock.nextConnection;
            }

            return containerBlock;
        },
        compose: function (containerBlock) {
            var x, itemBlock, oldInput, oldTitle, input, oldInputs = [];
            // Disconnect all input blocks and remove all inputs.
            if (this.itemCount_ === 0) {
                this.removeInput('EMPTY');
            } else {
                for (x = this.itemCount_ - 1; x >= 0; x -= 1) {
                    oldInputs.push(this.getInput('FIELD' + x));
                    this.removeInput('FIELD' + x);
                }
            }

            oldInputs.reverse();
            this.itemCount_ = 0;
            // Rebuild the block's inputs.
            itemBlock = containerBlock.getInputTargetBlock('STACK');
            while (itemBlock) {
                oldInput = oldInputs[this.itemCount_];
                oldTitle = (oldInput) ? oldInput.titleRow[1].getText() : null;
                input = this.addField(this.itemCount_, oldTitle);

                // Reconnect any child blocks.
                if (itemBlock.valueConnection_) {
                    input.connection.connect(itemBlock.valueConnection_);
                }
                this.itemCount_ += 1;
                itemBlock = itemBlock.nextConnection &&
                    itemBlock.nextConnection.targetBlock();
            }
            if (this.itemCount_ === 0) {
                this.appendDummyInput('EMPTY')
                .appendTitle(B.LANG_OBJS_CREATE_EMPTY_TITLE_1);
            }
        },
        saveConnections: function (containerBlock) {
            // Store a pointer to any connected child blocks.
            var input,
                itemBlock = containerBlock.getInputTargetBlock('STACK'),
                x = 0;
            while (itemBlock) {
                input = this.getInput('FIELD' + x);
                itemBlock.valueConnection_ = input && input.connection.targetConnection;
                x += 1;
                itemBlock = itemBlock.nextConnection &&
                    itemBlock.nextConnection.targetBlock();
            }
        }
    };

    Lang.objs_create_with_container = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
            .appendTitle(B.LANG_OBJS_CREATE_WITH_CONTAINER_TITLE_ADD);
            this.appendStatementInput('STACK');
            this.setTooltip(B.LANG_OBJS_CREATE_WITH_CONTAINER_TOOLTIP_1);
            this.contextMenu = false;
        }
    };

    Lang.objs_create_with_item = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
            .appendTitle(B.LANG_OBJS_CREATE_WITH_ITEM_TITLE);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(B.LANG_OBJS_CREATE_WITH_ITEM_TOOLTIP_1);
            this.contextMenu = false;
        }
    };

    JS.procs_call_with = function () {
        // Create a list with any number of elements of any type.
        var n,
            name = this.getTitleValue('NAME'),
            code = new Array(this.itemCount_);

        for (n = 0; n < this.itemCount_; n += 1) {
            code[n] = JS.valueToCode(this, 'ADD' + n,
                                     JS.ORDER_COMMA) || 'null';
        }

        code = "libs." + name + '(' + code.join(', ') + ')';

        if (this.returns) {
            return [code, JS.ORDER_ATOMIC];
        } else {
            return code + ";\n";
        }
    };

    JS.procs_call_with_no_return = JS.procs_call_with;

    function makeProcCall(returns) {
        return {
            // Create a list with any number of elements of any type.
            category: B.LANG_CATEGORY_PROCS,
            returns: returns,
            helpUrl: '',
            init: function () {
                this.setColour(Lang.PROCEDURE_TYPE_HUE);
                this.appendDummyInput()
                .appendTitle(B.LANG_PROCS_CALL_WITH_NAME)
                .appendTitle(new B.FieldTextInput(B.LANG_PROCS_CALL_NAME), 'NAME');
                this.appendValueInput('ADD0')
                .appendTitle(B.LANG_PROCS_CALL_WITH_INPUT_WITH);
                this.appendValueInput('ADD1');

                if (returns) {
                    this.setOutput(true, null);
                } else {
                    this.setPreviousStatement(true);
                    this.setNextStatement(true);
                }

                this.setMutator(new B.Mutator(['procs_call_with_item']));
                this.setTooltip(B.LANG_PROCS_CALL_WITH_TOOLTIP_1);
                this.itemCount_ = 2;
            },
            mutationToDom: function (workspace) {
                var container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                return container;
            },
            domToMutation: function (container) {
                var x, input;
                for (x = 0; x < this.itemCount_; x += 1) {
                    this.removeInput('ADD' + x);
                }
                this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
                for (x = 0; x < this.itemCount_; x += 1) {
                    input = this.appendValueInput('ADD' + x);
                    if (x === 0) {
                        input.appendTitle(B.LANG_PROCS_CALL_WITH_INPUT_WITH);
                    }
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                    .appendTitle(B.LANG_PROCS_CALL_EMPTY_TITLE_1);
                }
            },
            decompose: function (workspace) {
                var x, connection, itemBlock,
                    containerBlock = new B.Block(workspace,
                                                 'procs_call_with_container');
                containerBlock.initSvg();
                connection = containerBlock.getInput('STACK').connection;
                for (x = 0; x < this.itemCount_; x += 1) {
                    itemBlock = new B.Block(workspace, 'procs_call_with_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }

                return containerBlock;
            },
            compose: function (containerBlock) {
                var x, itemBlock, input;
                // Disconnect all input blocks and remove all inputs.
                if (this.itemCount_ === 0) {
                    this.removeInput('EMPTY');
                } else {
                    for (x = this.itemCount_ - 1; x >= 0; x -= 1) {
                        this.removeInput('ADD' + x);
                    }
                }
                this.itemCount_ = 0;
                // Rebuild the block's inputs.
                itemBlock = containerBlock.getInputTargetBlock('STACK');
                while (itemBlock) {
                    input = this.appendValueInput('ADD' + this.itemCount_);
                    if (this.itemCount_ === 0) {
                        input.appendTitle(B.LANG_PROCS_CALL_WITH_INPUT_WITH);
                    }
                    // Reconnect any child blocks.
                    if (itemBlock.valueConnection_) {
                        input.connection.connect(itemBlock.valueConnection_);
                    }
                    this.itemCount_ += 1;
                    itemBlock = itemBlock.nextConnection &&
                        itemBlock.nextConnection.targetBlock();
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendTitle(B.LANG_PROCS_CALL_EMPTY_TITLE_1);
                }
            },
            saveConnections: function (containerBlock) {
                // Store a pointer to any connected child blocks.
                var x = 0, input, itemBlock = containerBlock.getInputTargetBlock('STACK');
                while (itemBlock) {
                    input = this.getInput('ADD' + x);
                    itemBlock.valueConnection_ = input && input.connection.targetConnection;
                    x += 1;
                    itemBlock = itemBlock.nextConnection &&
                        itemBlock.nextConnection.targetBlock();
                }
            }
        };
    }

    Lang.procs_call_with = makeProcCall(true);
    Lang.procs_call_with_no_return = makeProcCall(false);

    Lang.procs_call_with_container = {
        // Container.
        init: function () {
            this.setColour(Lang.PROCEDURE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle(B.LANG_PROCS_CALL_WITH_CONTAINER_TITLE_ADD);
            this.appendStatementInput('STACK');
            this.setTooltip(B.LANG_PROCS_CALL_WITH_CONTAINER_TOOLTIP_1);
            this.contextMenu = false;
        }
    };

    Lang.procs_call_with_item = {
        // Add items.
        init: function () {
            this.setColour(Lang.PROCEDURE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle(B.LANG_PROCS_CALL_WITH_ITEM_TITLE);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip(B.LANG_PROCS_CALL_WITH_ITEM_TOOLTIP_1);
            this.contextMenu = false;
        }
    };

    B.LANG_CONTROLS_FOREACH_OBJ_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_ITEM = 'for each ';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_VAR = 'x';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_INLIST = 'in object';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_DO = 'do';
    B.LANG_CONTROLS_FOREACH_OBJ_TOOLTIP = 'For each key, value in an object, set the key to\n' +
        'variable "%1", value to variable "%2" and then do some statements.';
    Lang.controls_forEach_object = {
        helpUrl: B.LANG_CONTROLS_FOREACH_OBJ_HELPURL,
        init: function () {
            this.setColour(Lang.LOOPS_TYPE_HUE);
            this.appendValueInput('OBJ')
                .setCheck("Array")
                .appendTitle(B.LANG_CONTROLS_FOREACH_OBJ_INPUT_ITEM)
                .appendTitle(new B.FieldVariable("key"), 'KEY')
                .appendTitle(", ")
                .appendTitle(new B.FieldVariable("value"), 'VAL')
                .appendTitle(B.LANG_CONTROLS_FOREACH_OBJ_INPUT_INLIST);
            this.appendStatementInput('DO')
                .appendTitle(B.LANG_CONTROLS_FOREACH_OBJ_INPUT_DO);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                return B.LANG_CONTROLS_FOREACH_OBJ_TOOLTIP
                .replace('%1', thisBlock.getTitleValue('KEY'))
                .replace('%2', thisBlock.getTitleValue('VAL'));
            });
        },
        getVars: function () {
            return [this.getTitleValue('KEY'), this.getTitleValue('VAL')];
        },
        renameVar: function (oldName, newName) {
            if (B.Names.equals(oldName, this.getTitleValue('KEY'))) {
                this.setTitleValue(newName, 'KEY');
            } else if (B.Names.equals(oldName, this.getTitleValue('VAL'))) {
                this.setTitleValue(newName, 'VAL');
            }
        }
    };

    JS.controls_forEach_object = function () {
        // For each loop over an object
        var code, listVar,
            key = JS.variableDB_.getName(this.getTitleValue('KEY'), B.Variables.NAME_TYPE),
            value = JS.variableDB_.getName(this.getTitleValue('VAL'), B.Variables.NAME_TYPE),
            argument0 = JS.valueToCode(this, 'OBJ', JS.ORDER_ASSIGNMENT) || '[]',
            branch = JS.statementToCode(this, 'DO');

        if (JS.INFINITE_LOOP_TRAP) {
            branch = JS.INFINITE_LOOP_TRAP.replace(/%1/g,
                                                   '\'' + this.id + '\'') + branch;
        }
        if (argument0.match(/^\w+$/)) {
            branch = '  ' + value + ' = ' + argument0 + '[' + key + '];\n' +
                branch;
            code = 'for (var ' + key + ' in  ' + argument0 + ') {\n' +
                branch + '}\n';
        } else {
            // The list appears to be more complicated than a simple variable.
            // Cache it to a variable to prevent repeated look-ups.
            listVar = JS.variableDB_.getDistinctName(key + '_list', B.Variables.NAME_TYPE);
            branch = '  ' + value + ' = ' + listVar + '[' + key + '];\n' + branch;
            code = 'var ' + listVar + ' = ' + argument0 + ';\n' +
                'for (var ' + key + ' in ' + listVar + ') {\n' +
                branch + '}\n';
        }

        return code;
    };

    B.LANG_LISTS_OPS_INPUT_IN_LIST = 'in list';
    B.LANG_LISTS_OPS_TOOLTIP_APPEND = "Append an item to a list.";
    B.LANG_LISTS_OPS_APPEND = "append";

    Lang.lists_ops = {
        // apply operations to lists
        category: B.LANG_CATEGORY_LISTS,
        init: function () {
            this.setColour(Lang.LIST_TYPE_HUE);
            var thisBlock, modeMenu = new B.FieldDropdown(this.MODE, function (value) {
                var isStatement = (value === 'APPEND');
                this.sourceBlock_.updateStatement(isStatement);
            });
            this.appendDummyInput()
                .appendTitle(modeMenu, 'MODE');
            this.appendValueInput('ITEM')
                .appendTitle("item");
            this.appendValueInput('VALUE')
                .setCheck("Array")
                .appendTitle(B.LANG_LISTS_OPS_INPUT_IN_LIST);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.updateStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            thisBlock = this;
            this.setTooltip(function () {
                var combo = thisBlock.getTitleValue('MODE');
                return B['LANG_LISTS_OPS_TOOLTIP_' + combo];
            });
        },
        mutationToDom: function () {
            // Save whether the block is a statement or a value.
            // Save whether there is an 'AT' input.
            var container = document.createElement('mutation'),
                isStatement = !this.outputConnection;
            container.setAttribute('statement', isStatement);
            return container;
        },
        domToMutation: function (xmlElement) {
            // Restore the block shape.
            // Note: Until January 2013 this block did not have mutations,
            // so 'statement' defaults to false and 'at' defaults to true.
            var isStatement = (xmlElement.getAttribute('statement') === 'true');
            this.updateStatement(isStatement);
        },
        updateStatement: function (newStatement) {
            // Switch between a value block and a statement block.
            var oldStatement = !this.outputConnection;
            if (newStatement !== oldStatement) {
                this.unplug(true, true);
                if (newStatement) {
                    this.setOutput(false);
                    this.setPreviousStatement(true);
                    this.setNextStatement(true);
                } else {
                    this.setPreviousStatement(false);
                    this.setNextStatement(false);
                    this.setOutput(true);
                }
            }
        }
    };

    JS.lists_ops = function () {
        var mode = this.getTitleValue('MODE'),
            item = JS.valueToCode(this, 'ITEM', JS.ORDER_UNARY_NEGATION) || "null",
            list = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || '[]';

        if (mode === "APPEND") {
            return list + ".push(" + item + ");\n";
        }

        throw 'Unhandled combination (lists_ops).';
    };

    Lang.lists_ops.MODE = [[B.LANG_LISTS_OPS_APPEND, 'APPEND']];

    B.LANG_CONTROLS_ENUMERATE_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
    B.LANG_CONTROLS_ENUMERATE_INPUT_ITEM = 'for each';
    B.LANG_CONTROLS_ENUMERATE_INPUT_VAR = 'x';
    B.LANG_CONTROLS_ENUMERATE_INPUT_INDEX = '#';
    B.LANG_CONTROLS_ENUMERATE_INPUT_INLIST = 'in list';
    B.LANG_CONTROLS_ENUMERATE_INPUT_DO = 'do';
    B.LANG_CONTROLS_ENUMERATE_TOOLTIP = 'For each item in a list, set the item to\n' +
        'variable "%1", the index of it to "%2" and then do some statements.';
    Lang.controls_enumerate = {
        helpUrl: B.LANG_CONTROLS_ENUMERATE_HELPURL,
        init: function () {
            this.setColour(Lang.LOOPS_TYPE_HUE);
            this.appendValueInput('LIST')
                .setCheck("Array")
                .appendTitle(B.LANG_CONTROLS_ENUMERATE_INPUT_ITEM)
                .appendTitle(new B.FieldVariable("item"), 'VAR')
                .appendTitle(B.LANG_CONTROLS_ENUMERATE_INPUT_INDEX)
                .appendTitle(new B.FieldVariable("i"), 'INDEX')
                .appendTitle(B.LANG_CONTROLS_ENUMERATE_INPUT_INLIST);
            this.appendStatementInput('DO')
                .appendTitle(B.LANG_CONTROLS_ENUMERATE_INPUT_DO);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
            this.setTooltip(function () {
                return B.LANG_CONTROLS_ENUMERATE_TOOLTIP
                .replace('%1', thisBlock.getTitleValue('VAR'))
                .replace('%2', thisBlock.getTitleValue('INDEX'));
            });
        },
        getVars: function () {
            return [this.getTitleValue('VAR'), this.getTitleValue('INDEX')];
        },
        renameVar: function (oldName, newName) {
            if (B.Names.equals(oldName, this.getTitleValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            } else if (B.Names.equals(oldName, this.getTitleValue('INDEX'))) {
                this.setTitleValue(newName, 'INDEX');
            }
        }
    };

    JS.controls_enumerate = function () {
        // For each loop.
        var code, listVar,
            variable0 = JS.variableDB_.getName(this.getTitleValue('VAR'), B.Variables.NAME_TYPE),
            indexVar = JS.variableDB_.getName(this.getTitleValue('INDEX'), B.Variables.NAME_TYPE),
            argument0 = JS.valueToCode(this, 'LIST', JS.ORDER_ASSIGNMENT) || '[]',
            branch = JS.statementToCode(this, 'DO');

        if (JS.INFINITE_LOOP_TRAP) {
            branch = JS.INFINITE_LOOP_TRAP.replace(/%1/g,
                                                   '\'' + this.id + '\'') + branch;
        }

        if (argument0.match(/^\w+$/)) {
            branch = '  ' + variable0 + ' = ' + argument0 + '[' + indexVar + ' - 1];\n' + branch;
            code = 'for (var ' + indexVar + ' = 1; ' + indexVar + ' <= ' + argument0 +
                '.length; ' + indexVar + ' += 1) {\n' + branch + '}\n';
        } else {
            // The list appears to be more complicated than a simple variable.
            // Cache it to a variable to prevent repeated look-ups.
            listVar = JS.variableDB_.getDistinctName(variable0 + '_list', B.Variables.NAME_TYPE);
            branch = '  ' + variable0 + ' = ' + listVar + '[' + indexVar + ' - 1];\n' + branch;
            code = 'var ' + listVar + ' = ' + argument0 + ';\n' +
                'for (var ' + indexVar + ' = 1; ' + indexVar + ' <= ' + listVar +
                '.length; ' + indexVar + ' += 1) {\n' + branch + '}\n';
        }
        return code;
    };

    B.LANG_MATH_PRECISION_INPUT = 'set precision of';
    B.LANG_MATH_PRECISION_INPUT_1 = 'to';
    B.LANG_MATH_PRECISION_TOOLTIP = 'Truncate the decimal parts to a number of places';

    Lang.math_set_precision = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(230);
            this.setOutput(true, Number);
            this.appendValueInput('VALUE')
                .setCheck("Number")
                .appendTitle(B.LANG_MATH_PRECISION_INPUT);
            this.appendValueInput('PRECISION')
                .setCheck("Number")
                .setAlign(B.ALIGN_RIGHT)
                .appendTitle(B.LANG_MATH_PRECISION_INPUT_1);
            this.setInputsInline(true);
            this.setTooltip(B.LANG_MATH_PRECISION_TOOLTIP);
        }
    };

    JS.math_set_precision = function () {
        var argument0 = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || '0',
            argument1 = JS.valueToCode(this, 'PRECISION', JS.ORDER_MEMBER) || '1',
            code = B.eflang.math_set_precision_fun + '(' + argument0 + ', ' + argument1 + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    Lang.text_to_int = {
        init: function () {
            this.setColour(160);
            this.appendValueInput('VALUE')
                .setCheck("String")
                .appendTitle("to integer");
            this.setOutput(true, 'Number');
            this.setTooltip("Convert a text representation of a number to an integer number");
        }
    };

    Lang.text_to_float = {
        init: function () {
            this.setColour(160);
            this.appendValueInput('VALUE')
                .setCheck("String")
                .appendTitle("to decimal");
            this.setOutput(true, 'Number');
            this.setTooltip("Convert a text representation of a number to a decimal number");
        }
    };

    JS.text_to_int = function (block) {
        var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'0\'';
        return ["parseInt(" + argument0 + ', 10)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
    };

    JS.text_to_float = function (block) {
        var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'0\'';
        return ["parseFloat(" + argument0 + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_STORE_INPUT_1 = "store value";
    B.LANG_DB_STORE_INPUT = "with key";
    B.LANG_DB_STORE_INPUT_2 = "in store";
    B.LANG_DB_STORE_TOOLTIP = "Store value in the given key";

    Lang.db_store = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);
            this.appendValueInput('VALUE')
                .appendTitle(B.LANG_DB_STORE_INPUT_1);

            this.appendValueInput('KEY')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendTitle(B.LANG_DB_STORE_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendTitle(B.LANG_DB_STORE_INPUT_2);

            this.setInputsInline(true);
            this.setTooltip(B.LANG_DB_STORE_TOOLTIP);
            this.setOutput(false);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        }
    };

    JS.db_store = function () {
        var key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || '"key"',
            value = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || '1',
            storeName = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_store_fun + '(' + storeName + ', ' + key + ', ' + value + ');\n';
        return code;
    };

    B.LANG_DB_FETCH_INPUT = "fetch key";
    B.LANG_DB_FETCH_INPUT_1 = "value";
    B.LANG_DB_FETCH_INPUT_2 = "from store";
    B.LANG_DB_FETCH_TOOLTIP = "Fetch value from the given key";

    Lang.db_fetch = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendTitle(B.LANG_DB_FETCH_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendTitle(B.LANG_DB_FETCH_INPUT_2);

            this.setInputsInline(true);
            this.setTooltip(B.LANG_DB_FETCH_TOOLTIP);
            this.setOutput(true, null);
        }
    };

    JS.db_fetch = function () {
        var key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key',
            store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_fetch_fun + '(' + store + ', ' + key + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_INCR_INPUT = "increase key";
    B.LANG_DB_INCR_INPUT_1 = "from store";
    B.LANG_DB_INCR_TOOLTIP = "Increase key in store and return it";

    Lang.db_incr = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendTitle(B.LANG_DB_INCR_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendTitle(B.LANG_DB_INCR_INPUT_1);

            this.setInputsInline(true);
            this.setTooltip(B.LANG_DB_INCR_TOOLTIP);
            this.setOutput(true, null);
        }
    };

    JS.db_incr = function () {
        var key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key',
            store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_incr_fun + '(' + store + ', ' + key + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_DECR_INPUT = "decrease key";
    B.LANG_DB_DECR_INPUT_1 = "from store";
    B.LANG_DB_DECR_TOOLTIP = "decrease key in store and return it";

    Lang.db_decr = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendTitle(B.LANG_DB_DECR_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendTitle(B.LANG_DB_DECR_INPUT_1);

            this.setInputsInline(true);
            this.setTooltip(B.LANG_DB_DECR_TOOLTIP);
            this.setOutput(true, null);
        }
    };

    JS.db_decr = function () {
        var key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key',
            store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_decr_fun + '(' + store + ', ' + key + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_LOGIC_IS_NULL_INPUT = "is null?";
    B.LANG_LOGIC_IS_NULL_TOOLTIP = "Return true if value is null";

    Lang.logic_is_null = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(Lang.LOGIC_TYPE_HUE);
            this.setOutput(true, Boolean);

            this.appendValueInput('VALUE')
                .appendTitle(B.LANG_LOGIC_IS_NULL_INPUT);

            this.setInputsInline(true);
            this.setTooltip(B.LANG_LOGIC_IS_NULL_TOOLTIP);
        }
    };

    JS.logic_is_null = function () {
        var value = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || 'null',
            code = '(' + value + ' == null)';
        return [code, JS.ORDER_ATOMIC];
    };

    Lang.logic_or_else = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(Lang.LOGIC_TYPE_HUE);
            this.appendValueInput('VALUE')
                .appendTitle("if");

            this.appendValueInput('DEFAULT')
                .appendTitle("otherwise")
                .setAlign(B.ALIGN_RIGHT);

            this.setInputsInline(true);
            this.setOutput(true, null);
        }
    };

    JS.logic_or_else = function () {
        // TODO: put value on a temp variable to avoid side effect being evaluated
        // twice if value is non null
        var value = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || 'null',
            defaultVal = JS.valueToCode(this, 'DEFAULT', JS.ORDER_MEMBER) || 'null',
            code = '(' + value + ' == null? ' + defaultVal + ' : ' + value + ')';
        return [code, JS.ORDER_ATOMIC];
    };

    Lang.lists_contains = {
        //helpUrl: B.LANG_MATH_MODULO_HELPURL,
        init: function () {
            this.setColour(Lang.LIST_TYPE_HUE);
            this.appendValueInput('VALUE');

            this.appendValueInput('TOFIND')
                .appendTitle("contains?")
                .setAlign(B.ALIGN_RIGHT);

            this.setInputsInline(true);
            this.setOutput(true, Boolean);
        }
    };

    Lang.time_now = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.setOutput(true);
            this.appendDummyInput()
            .appendTitle("current time");
            this.setTooltip("Return current timestamp");
        }
    };

    JS.time_now = function () {
        return ['((new Date()).getTime())', JS.ORDER_ATOMIC];
    };

    JS.lists_contains = function () {
        var value = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || 'null',
            toFind = JS.valueToCode(this, 'TOFIND', JS.ORDER_MEMBER) || 'null',
            code = '(' + value + '.indexOf(' + toFind + ') !== -1)';
        return [code, JS.ORDER_ATOMIC];
    };

    Lang.variables_delpath = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendTitle("delete outvar")
                .appendTitle(new B.FieldTextInput(
                    B.LANG_VARIABLES_GETPATH_ITEM), 'VAR');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setTooltip("Remove an output variable");
        },
    };

    JS.variables_delpath = function () {
        var code = this.getTitleValue('VAR');
        return "delete env." + code + ";";
    };

    function parseQuery() {
        var i, parts, valparts, query = location.search.slice(1), result = {},
        key, value;

        parts = query.split("&");

        for (i = 0; i < parts.length; i += 1) {
            valparts = parts[i].split("=");

            if (valparts.length !== 2) {
                continue;
            }

            key = valparts[0].trim();
            value = valparts[1].trim();
            result[key] = value;
        }

        return result;
    }

    function init() {
        var query = parseQuery();

        window.parent["init" + query.id](B, query.id, document);
    }

    return {
        init: init,
        B: B
    };
}());
