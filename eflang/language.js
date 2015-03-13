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

    B.eflang = {};
    B.eflang.constants = [["NAME", "NAME"]];
    B.eflang.constantsPath = "libs.consts.";
    B.eflang.math_set_precision_fun = "libs.format.floatPrecision";

    B.eflang.notify_info = "libs.notify.info";
    B.eflang.notify_success = "libs.notify.success";
    B.eflang.notify_warning = "libs.notify.warning";
    B.eflang.notify_error = "libs.notify.error";

    B.eflang.db_store_fun = "libs.store.set";
    B.eflang.db_fetch_fun = "libs.store.get";
    B.eflang.db_incr_fun = "libs.store.incr";
    B.eflang.db_decr_fun = "libs.store.decr";
    B.eflang.db_del_fun = "libs.store.del";
    B.eflang.db_keys_fun = "libs.store.keys";
    B.eflang.db_flushdb_fun = "libs.store.flushdb";
    B.eflang.db_flushall_fun = "libs.store.flushall";

    Lang.const_get = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendField("get constant")
                .appendField(new B.FieldDropdown(B.eflang.constants), 'CONST');

            this.setOutput(true, null);
        }
    };

    Lang.variables_outget = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendField("get field")
                .appendField(new B.FieldTextInput("fieldname"), 'VAR');
            this.setOutput(true, null);
        }
    };

    Lang.variables_valueget = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendField("get value field")
                .appendField(new B.FieldTextInput("fieldname"), 'VAR');
            this.setOutput(true, null);
        }
    };

    Lang.variables_outget_str = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendValueInput('KEY')
                .setCheck("String")
                .appendField("get key");
            this.appendDummyInput()
                .appendField("from")
                .appendField(new B.FieldTextInput("fieldname"), 'VAR');
            this.setOutput(true, null);
            this.setInputsInline(true);
        }
    };

    Lang.variables_outset = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendValueInput('VALUE')
                .appendField("set field")
                .appendField(new B.FieldTextInput("fieldname"), 'VAR')
                .appendField("to");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        }
    };

    JS.const_get = function () {
        var code = this.getFieldValue('CONST');
        return [B.eflang.constantsPath + code, JS.ORDER_ATOMIC];
    };

    JS.variables_outget = function () {
        var code = this.getFieldValue('VAR') || "__not_set__";
        return ["env." + code, JS.ORDER_ATOMIC];
    };

    JS.variables_valueget = function () {
        var code = this.getFieldValue('VAR') || "__not_set__";
        return ["env.value." + code, JS.ORDER_ATOMIC];
    };

    JS.variables_outget_str = function () {
        var code = this.getFieldValue('VAR') || '__not_set__',
            key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key';
        return ["env." + code + "[" + key + "]", JS.ORDER_ATOMIC];
    };

    JS.variables_outset = function () {
        // Variable setter.
        var argument0 = JS.valueToCode(this, 'VALUE',
                                       JS.ORDER_ASSIGNMENT) || '0',
            varName = this.getFieldValue('VAR');

        return "env." + varName + ' = ' + argument0 + ';\n';
    };

    B.LANG_VARIABLES_GETPATH_TITLE = "get var path";

    Lang.variables_getpath = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendField(B.LANG_VARIABLES_GETPATH_TITLE)
                .appendField(new B.FieldTextInput("item.child"), 'VAR');
            this.setOutput(true, null);
        }
    };

    JS.variables_getpath = function () {
        var code = this.getFieldValue('VAR');
        return [code, JS.ORDER_ATOMIC];
    };

    JS.objs_create_with = function () {
        // Create a list with any number of elements of any type.
        var n, code = new Array(this.itemCount_);

        for (n = 0; n < this.itemCount_; n += 1) {
            code[n] = (this.getFieldValue('FIELD' + n)) + ": " +
                (JS.valueToCode(this, 'FIELD' + n,
                                JS.ORDER_COMMA) || 'null');
        }
        code = '{' + code.join(', ') + '}';
        return [code, JS.ORDER_ATOMIC];
    };

    Lang.obj_empty = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput().appendField("empty object");
            this.setOutput(true, "Object");
        }
    };

    JS.obj_empty = function () {
        return ["{}", JS.ORDER_ATOMIC];
    };

    Lang.objs_create_with = {
        addField: function (num, title) {
            var input = this.appendValueInput('FIELD' + num)
                .setAlign(B.ALIGN_RIGHT);

            input.appendField(new B.FieldTextInput(title || ("key" + num)),
                             'FIELD' + num);

            return input;
        },
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.addField(0);
            this.addField(1);
            this.addField(2);
            this.setOutput(true, "Object");
            this.setMutator(new B.Mutator(['objs_create_with_item']));
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
                this.addField(0);
                this.itemCount_ = 1;
            }
        },
        decompose: function (workspace) {
            var connection, x, itemBlock,
                containerBlock = B.Block.obtain(workspace,
                                             'objs_create_with_container');
            containerBlock.initSvg();
            connection = containerBlock.getInput('STACK').connection;
            for (x = 0; x < this.itemCount_; x += 1) {
                itemBlock = B.Block.obtain(workspace, 'objs_create_with_item');
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
                this.addField(0);
                this.itemCount_ = 1;
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
                oldTitle = (oldInput) ? oldInput.fieldRow[0].getText() : null;
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
                this.addField(0);
                this.itemCount_ = 1;
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
                .appendField("object");
            this.appendStatementInput('STACK');
            this.contextMenu = false;
        }
    };

    Lang.objs_create_with_item = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendField("field");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.contextMenu = false;
        }
    };

    JS.procs_call_with = function () {
        // Create a list with any number of elements of any type.
        var n,
            name = this.getFieldValue('NAME'),
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
            returns: returns,
            init: function () {
                this.setColour(Lang.PROCEDURE_TYPE_HUE);
                this.appendDummyInput()
                    .appendField("call")
                    .appendField(new B.FieldTextInput("procedureName"), 'NAME');
                this.appendValueInput('ADD0')
                    .appendField("with");
                this.appendValueInput('ADD1');

                if (returns) {
                    this.setOutput(true, null);
                } else {
                    this.setPreviousStatement(true);
                    this.setNextStatement(true);
                }

                this.setMutator(new B.Mutator(['procs_call_with_item']));
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
                        input.appendField("with");
                    }
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField("");
                }
            },
            decompose: function (workspace) {
                var x, connection, itemBlock,
                    containerBlock = B.Block.obtain(workspace,
                                                 'procs_call_with_container');
                containerBlock.initSvg();
                connection = containerBlock.getInput('STACK').connection;
                for (x = 0; x < this.itemCount_; x += 1) {
                    itemBlock = B.Block.obtain(workspace, 'procs_call_with_item');
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
                        input.appendField("with");
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
                        .appendField("");
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
                .appendField("procedure");
            this.appendStatementInput('STACK');
            this.contextMenu = false;
        }
    };

    Lang.procs_call_with_item = {
        // Add items.
        init: function () {
            this.setColour(Lang.PROCEDURE_TYPE_HUE);
            this.appendDummyInput()
                .appendField("argument");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.contextMenu = false;
        }
    };

    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_ITEM = 'for each ';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_VAR = 'x';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_INLIST = 'in object';
    B.LANG_CONTROLS_FOREACH_OBJ_INPUT_DO = 'do';
    Lang.controls_forEach_object = {
        init: function () {
            this.setColour(Lang.LOOPS_TYPE_HUE);
            this.appendValueInput('OBJ')
                .setCheck("Array")
                .appendField(B.LANG_CONTROLS_FOREACH_OBJ_INPUT_ITEM)
                .appendField(new B.FieldVariable("key"), 'KEY')
                .appendField(", ")
                .appendField(new B.FieldVariable("value"), 'VAL')
                .appendField(B.LANG_CONTROLS_FOREACH_OBJ_INPUT_INLIST);
            this.appendStatementInput('DO')
                .appendField(B.LANG_CONTROLS_FOREACH_OBJ_INPUT_DO);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
        },
        getVars: function () {
            return [this.getFieldValue('KEY'), this.getFieldValue('VAL')];
        },
        renameVar: function (oldName, newName) {
            if (B.Names.equals(oldName, this.getFieldValue('KEY'))) {
                this.setTitleValue(newName, 'KEY');
            } else if (B.Names.equals(oldName, this.getFieldValue('VAL'))) {
                this.setTitleValue(newName, 'VAL');
            }
        }
    };

    JS.controls_forEach_object = function () {
        // For each loop over an object
        var code, listVar,
            key = JS.variableDB_.getName(this.getFieldValue('KEY'), B.Variables.NAME_TYPE),
            value = JS.variableDB_.getName(this.getFieldValue('VAL'), B.Variables.NAME_TYPE),
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

    Lang.lists_ops = {
        // apply operations to lists
        init: function () {
            this.setColour(Lang.LIST_TYPE_HUE);
            var thisBlock, modeMenu = new B.FieldDropdown(this.MODE, function (value) {
                var isStatement = (value === 'APPEND');
                this.sourceBlock_.updateStatement(isStatement);
            });
            this.appendDummyInput()
                .appendField(modeMenu, 'MODE');
            this.appendValueInput('ITEM')
                .appendField("item");
            this.appendValueInput('VALUE')
                .setCheck("Array")
                .appendField("in list");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.updateStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            thisBlock = this;
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
        var mode = this.getFieldValue('MODE'),
            item = JS.valueToCode(this, 'ITEM', JS.ORDER_UNARY_NEGATION) || "null",
            list = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || '[]';

        if (mode === "APPEND") {
            return list + ".push(" + item + ");\n";
        }

        throw 'Unhandled combination (lists_ops).';
    };

    Lang.lists_ops.MODE = [["append", 'APPEND']];

    B.LANG_CONTROLS_ENUMERATE_HELPURL = 'http://en.wikipedia.org/wiki/For_loop';
    B.LANG_CONTROLS_ENUMERATE_INPUT_ITEM = 'for each';
    B.LANG_CONTROLS_ENUMERATE_INPUT_VAR = 'x';
    B.LANG_CONTROLS_ENUMERATE_INPUT_INDEX = '#';
    B.LANG_CONTROLS_ENUMERATE_INPUT_INLIST = 'in list';
    B.LANG_CONTROLS_ENUMERATE_INPUT_DO = 'do';
    Lang.controls_enumerate = {
        init: function () {
            this.setColour(Lang.LOOPS_TYPE_HUE);
            this.appendValueInput('LIST')
                .setCheck("Array")
                .appendField(B.LANG_CONTROLS_ENUMERATE_INPUT_ITEM)
                .appendField(new B.FieldVariable("item"), 'VAR')
                .appendField(B.LANG_CONTROLS_ENUMERATE_INPUT_INDEX)
                .appendField(new B.FieldVariable("i"), 'INDEX')
                .appendField(B.LANG_CONTROLS_ENUMERATE_INPUT_INLIST);
            this.appendStatementInput('DO')
                .appendField(B.LANG_CONTROLS_ENUMERATE_INPUT_DO);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            // Assign 'this' to a variable for use in the tooltip closure below.
            var thisBlock = this;
        },
        getVars: function () {
            return [this.getFieldValue('VAR'), this.getFieldValue('INDEX')];
        },
        renameVar: function (oldName, newName) {
            if (B.Names.equals(oldName, this.getFieldValue('VAR'))) {
                this.setTitleValue(newName, 'VAR');
            } else if (B.Names.equals(oldName, this.getFieldValue('INDEX'))) {
                this.setTitleValue(newName, 'INDEX');
            }
        }
    };

    JS.controls_enumerate = function () {
        // For each loop.
        var code, listVar,
            variable0 = JS.variableDB_.getName(this.getFieldValue('VAR'), B.Variables.NAME_TYPE),
            indexVar = JS.variableDB_.getName(this.getFieldValue('INDEX'), B.Variables.NAME_TYPE),
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

    Lang.math_set_precision = {
        init: function () {
            this.setColour(230);
            this.setOutput(true, Number);
            this.appendValueInput('VALUE')
                .setCheck("Number")
                .appendField("set precision of");
            this.appendValueInput('PRECISION')
                .setCheck("Number")
                .setAlign(B.ALIGN_RIGHT)
                .appendField("to");
            this.setInputsInline(true);
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
                .appendField("to integer");
            this.setOutput(true, 'Number');
        }
    };

    Lang.text_to_float = {
        init: function () {
            this.setColour(160);
            this.appendValueInput('VALUE')
                .setCheck("String")
                .appendField("to decimal");
            this.setOutput(true, 'Number');
        }
    };

    JS.text_to_int = function (block) {
        var argument0 = JS.valueToCode(block, 'VALUE', JS.ORDER_FUNCTION_CALL) || '\'0\'';
        return ["parseInt(" + argument0 + ', 10)', JS.ORDER_FUNCTION_CALL];
    };

    JS.text_to_float = function (block) {
        var argument0 = JS.valueToCode(block, 'VALUE', JS.ORDER_FUNCTION_CALL) || '\'0\'';
        return ["parseFloat(" + argument0 + ')', JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_STORE_INPUT_1 = "store value";
    B.LANG_DB_STORE_INPUT = "with key";
    B.LANG_DB_STORE_INPUT_2 = "in store";

    Lang.db_store = {
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);
            this.appendValueInput('VALUE')
                .appendField(B.LANG_DB_STORE_INPUT_1);

            this.appendValueInput('KEY')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_STORE_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_STORE_INPUT_2);

            this.setInputsInline(true);
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

    Lang.db_fetch = {
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendField(B.LANG_DB_FETCH_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_FETCH_INPUT_2);

            this.setInputsInline(true);
            this.setOutput(true, null);
        }
    };

    JS.db_fetch = function () {
        var key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key',
            store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_fetch_fun + '(' + store + ', ' + key + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_DEL_INPUT = "delete key";
    B.LANG_DB_DEL_INPUT_1 = "from store";

    Lang.db_del = {
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendField(B.LANG_DB_DEL_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_DEL_INPUT_1);

            this.setInputsInline(true);
            this.setOutput(true, null);
        }
    };

    JS.db_del = function () {
        var key = JS.valueToCode(this, 'KEY', JS.ORDER_MEMBER) || 'key',
            store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_del_fun + '(' + store + ', ' + key + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_KEYS_INPUT = "list keys from store";

    Lang.db_keys = {
        init: function () {
            this.setColour(230);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_KEYS_INPUT);

            this.setInputsInline(true);
            this.setOutput(true, "Array");
        }
    };

    JS.db_keys = function () {
        var store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_keys_fun + '(' + store + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_FLUSHDB_INPUT = "remove all from store";

    Lang.db_flushdb = {
        init: function () {
            this.setColour(230);
            this.setPreviousStatement(true);
            this.setNextStatement(true);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_FLUSHDB_INPUT);

            this.setInputsInline(true);
        }
    };

    JS.db_flushdb = function () {
        var store = JS.valueToCode(this, 'STORE', JS.ORDER_MEMBER) || '"store"',
            code = B.eflang.db_flushdb_fun + '(' + store + ')';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_FLUSHALL_INPUT = "remove all from all stores";

    Lang.db_flushall = {
        init: function () {
            this.setColour(230);

            this.appendDummyInput()
                .appendField(B.LANG_DB_FLUSHALL_INPUT);

            this.setPreviousStatement(true);
            this.setNextStatement(true);
        }
    };

    JS.db_flushall = function () {
        var code = B.eflang.db_flushall_fun + '()';
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    B.LANG_DB_INCR_INPUT = "increase key";
    B.LANG_DB_INCR_INPUT_1 = "from store";

    Lang.db_incr = {
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendField(B.LANG_DB_INCR_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_INCR_INPUT_1);

            this.setInputsInline(true);
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

    Lang.db_decr = {
        init: function () {
            this.setColour(230);
            this.setOutput(true, String);

            this.appendValueInput('KEY')
                .setCheck("String")
                .appendField(B.LANG_DB_DECR_INPUT);

            this.appendValueInput('STORE')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField(B.LANG_DB_DECR_INPUT_1);

            this.setInputsInline(true);
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

    Lang.logic_is_null = {
        init: function () {
            this.setColour(Lang.LOGIC_TYPE_HUE);
            this.setOutput(true, Boolean);

            this.appendValueInput('VALUE')
                .appendField(B.LANG_LOGIC_IS_NULL_INPUT);

            this.setInputsInline(true);
        }
    };

    JS.logic_is_null = function () {
        var value = JS.valueToCode(this, 'VALUE', JS.ORDER_MEMBER) || 'null',
            code = '(' + value + ' == null)';
        return [code, JS.ORDER_ATOMIC];
    };

    Lang.logic_or_else = {
        init: function () {
            this.setColour(Lang.LOGIC_TYPE_HUE);
            this.appendValueInput('VALUE')
                .appendField("if");

            this.appendValueInput('DEFAULT')
                .appendField("otherwise")
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
        init: function () {
            this.setColour(Lang.LIST_TYPE_HUE);
            this.appendValueInput('VALUE');

            this.appendValueInput('TOFIND')
                .appendField("contains?")
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
            .appendField("current time");
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

    Lang.variables_outdel = {
        init: function () {
            this.setColour(Lang.VARIABLE_TYPE_HUE);
            this.appendDummyInput()
                .appendField("delete field")
                .appendField(new B.FieldTextInput("fieldname"), 'VAR');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
        },
    };

    JS.variables_outdel = function () {
        var code = this.getFieldValue('VAR');
        return "delete env." + code + ";";
    };

    Lang.text_bold = {
        init: function () {
            this.setColour(160);
            this.appendValueInput('VALUE')
                .setCheck("String")
                .appendField("bold");
            this.setOutput(true, 'String');
        }
    };

    JS.text_bold = function (block) {
        var argument0 = JS.valueToCode(block, 'VALUE',
                               JS.ORDER_FUNCTION_CALL) || '""';
        return ["'**' + " + argument0 + " + '**'",
            JS.ORDER_FUNCTION_CALL];
    };

    Lang.text_italic = {
        init: function () {
            this.setColour(160);
            this.appendValueInput('VALUE')
                .setCheck("String")
                .appendField("italic");
            this.setOutput(true, 'String');
        }
    };

    JS.text_italic = function (block) {
        var argument0 = JS.valueToCode(block, 'VALUE',
                               JS.ORDER_FUNCTION_CALL) || '""';
        return ["'*' + " + argument0 + " + '*'",
            JS.ORDER_FUNCTION_CALL];
    };

    Lang.text_link = {
        init: function () {
            this.setColour(160);
            this.setOutput(true, "String");
            this.appendValueInput('URL')
                .appendField("link to");

            this.appendValueInput('LABEL')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField("with label");

            this.setInputsInline(true);
            this.setOutput(true);
        }
    };

    JS.text_link = function () {
        var url = JS.valueToCode(this, 'URL', JS.ORDER_MEMBER) || '#',
            label = JS.valueToCode(this, 'LABEL', JS.ORDER_MEMBER) || '?',
            code = "'[' + " + label + " + '](' + " + url + " + ')'";
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    Lang.text_image = {
        init: function () {
            this.setColour(160);
            this.setOutput(true, "String");
            this.appendValueInput('URL')
                .appendField("image from");

            this.appendValueInput('LABEL')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField("otherwise text");

            this.setInputsInline(true);
            this.setOutput(true);
        }
    };

    JS.text_image = function () {
        var url = JS.valueToCode(this, 'URL', JS.ORDER_MEMBER) || '#',
            label = JS.valueToCode(this, 'LABEL', JS.ORDER_MEMBER) || '?',
            code = "'![' + " + label + " + '](' + " + url + " + ')'";
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    Lang.text_image_resizable = {
        init: function () {
            this.setColour(160);
            this.setOutput(true, "String");
            this.appendValueInput('URL')
                .appendField("image from");

            this.appendValueInput('LABEL')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("String")
                .appendField("otherwise text");

            this.appendValueInput('WIDTH')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("width");

            this.appendValueInput('HEIGHT')
                .setAlign(B.ALIGN_RIGHT)
                .setCheck("Number")
                .appendField("height");

            this.setInputsInline(true);
            this.setOutput(true);
        }
    };

    JS.text_image_resizable = function () {
        var url = JS.valueToCode(this, 'URL', JS.ORDER_MEMBER) || '#',
            label = JS.valueToCode(this, 'LABEL', JS.ORDER_MEMBER) || '?',
            width = JS.valueToCode(this, 'WIDTH', JS.ORDER_MEMBER) || '100',
            height = JS.valueToCode(this, 'HEIGHT', JS.ORDER_MEMBER) || '100',
            code = "'[img ' + " + width + " + ' ' + " + height + " + ' \"' + " + url + " + '\" \"' + " + label + " + '\"]'";
        return [code, JS.ORDER_FUNCTION_CALL];
    };

    Lang.parse_json = {
        init: function () {
            this.setColour(180);
            this.appendValueInput('VALUE')
                .setCheck("String")
                .appendField("Parse JSON");
            this.setOutput(true, null);
        }
    };

    JS.parse_json = function (block) {
        var argument0 = JS.valueToCode(block, 'VALUE',
                               JS.ORDER_FUNCTION_CALL) || '""';
        return ["JSON.parse(" + argument0 + ")", JS.ORDER_FUNCTION_CALL];
    };

    JS.parse_json = function (block) {
        var argument0 = JS.valueToCode(block, 'VALUE',
                               JS.ORDER_FUNCTION_CALL) || '""';
        return ["JSON.parse(" + argument0 + ")", JS.ORDER_FUNCTION_CALL];
    };

    function makeNotify(level) {
        return {
            init: function () {
                this.setColour(170);
                this.appendValueInput('VALUE')
                .setCheck("String")
                .appendField("Notify " + level);

                this.setPreviousStatement(true);
                this.setNextStatement(true);
            }
        };
    }

    Lang.notify_info = makeNotify('Info');
    Lang.notify_success = makeNotify('Success');
    Lang.notify_warning = makeNotify('Warning');
    Lang.notify_error = makeNotify('Error');

    function makeNotifyJs(funName) {
        return function (block) {
            var argument0 = JS.valueToCode(block, 'VALUE',
                                           JS.ORDER_FUNCTION_CALL) || '""';
            return funName + "(" + argument0 + ");";
        };
    }

    JS.notify_info = makeNotifyJs(B.eflang.notify_info);
    JS.notify_success = makeNotifyJs(B.eflang.notify_success);
    JS.notify_warning = makeNotifyJs(B.eflang.notify_warning);
    JS.notify_error = makeNotifyJs(B.eflang.notify_error);

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
