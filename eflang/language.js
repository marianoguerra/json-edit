var eflang = (function () {
    'use strict';

    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FIELD = "get";
    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_IN = 'from object';
    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FROM_TOOLTIP_1 = 'Returns the value of field in an object.';
    // Out Variables Blocks.
    Blockly.LANG_VARIABLES_OUTGET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
    Blockly.LANG_VARIABLES_OUTGET_TITLE_1 = 'get out var';
    Blockly.LANG_VARIABLES_OUTGET_ITEM = 'item';
    Blockly.LANG_VARIABLES_OUTGET_TOOLTIP_1 = 'Returns the value of this output variable.';

    Blockly.LANG_VARIABLES_OUTSET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
    Blockly.LANG_VARIABLES_OUTSET_TITLE_1 = 'set out var';
    Blockly.LANG_VARIABLES_OUTSET_ITEM = 'item';
    Blockly.LANG_VARIABLES_OUTSET_TOOLTIP_1 = 'Sets this output variable to be equal to the input.';

    Blockly.LANG_CONST_OUTGET_TITLE_1 = "get constant";
    Blockly.LANG_CONST_OUTGET_TOOLTIP_1 = "Returns the value of a constant";

    Blockly.LANG_CATEGORY_OBJS = "Objects";
    Blockly.LANG_CATEGORY_PROCS = "Procedures";

    Blockly.LANG_PROCS_CALL_NAME = 'procedureName';
    Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH = 'with';
    Blockly.LANG_PROCS_CALL_WITH_TOOLTIP_1 = 'Call a procedure with any number of arguments.';

    Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TITLE_ADD = 'procedure';
    Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this procedure call.';

    Blockly.LANG_PROCS_CALL_WITH_NAME = 'Call';
    Blockly.LANG_PROCS_CALL_WITH_ITEM_TITLE = 'argument';
    Blockly.LANG_PROCS_CALL_WITH_ITEM_TOOLTIP_1 = 'Add an argument to the argument list.';

    Blockly.LANG_OBJS_CREATE_WITH_INPUT_WITH = 'create object with';
    Blockly.LANG_OBJS_CREATE_WITH_TOOLTIP_1 = 'Create an object with any number of fields.';

    Blockly.LANG_OBJS_CREATE_WITH_CONTAINER_TITLE_ADD = 'object';
    Blockly.LANG_OBJS_CREATE_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this object block.';

    Blockly.LANG_OBJS_CREATE_WITH_ITEM_TITLE = 'field';
    Blockly.LANG_OBJS_CREATE_WITH_ITEM_TOOLTIP_1 = 'Add a field to the object.';

    Blockly.LANG_TEXT_COLOR_TOOLTIP = 'Text representing a color in RGB format';

    Blockly.Language.text_color = {
      // Variable getter.
      category: "Output",
      init: function() {
        var
            color = "#cc0000",
            that = this;

        this.setColour(330);
        this.appendDummyInput()
            .appendTitle("Color")
            .appendTitle(new Blockly.FieldColor(color,
                        function onColorChanged(color) {
                            that.updateColor(color);
                        }), 'VAR')

        this.setOutput(true, null);
        this.setTooltip(Blockly.LANG_TEXT_COLOR_TOOLTIP);
      },
      updateColor: function (color) {
          var
              fontColor,

              rgb = goog.color.hexToRgb(color),
              rgbLight = goog.color.lighten(rgb, 0.3),
              rgbDark = goog.color.darken(rgb, 0.4),
              colorBrightness = goog.color.yiqBrightness_(rgb);
              
          if (colorBrightness > 128) {
              fontColor = "#000";
          } else {
              fontColor = "#fff";
          }

          this.svg_.svgPathLight_.setAttribute('stroke',
                                  goog.color.rgbArrayToHex(rgbLight));
          this.svg_.svgPathDark_.setAttribute('fill',
                                  goog.color.rgbArrayToHex(rgbDark));
          this.svg_.svgPath_.setAttribute('fill', color);

          this.inputList[0].titleRow.forEach(function (item, i) {
              var style = "fill: " + fontColor + ";";

              if (i === 1) {
                  style += " cursor: pointer;";
              }

              item.textElement_.setAttribute("style", style);
          });
      },
      getVars: function() {
        return [];
      }
    };

    Blockly.eflang = {};
    Blockly.eflang.constants = [["NAME", "NAME"]];
    Blockly.eflang.constantsPath = "libs.consts.";

    Blockly.Language.const_get = {
      // Variable getter.
      category: "Output",
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_CONST_OUTGET_TITLE_1)
            .appendTitle(new Blockly.FieldDropdown(Blockly.eflang.constants),
                         'CONST');

        this.setOutput(true, null);
        this.setTooltip(Blockly.LANG_CONST_OUTGET_TOOLTIP_1);
      },
      getVars: function() {
        return [];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.Language.variables_outget = {
      // Variable getter.
      category: "Output",
      helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_VARIABLES_OUTGET_TITLE_1)
            .appendTitle(new Blockly.FieldTextInput(
            Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
        this.setTooltip(Blockly.LANG_VARIABLES_OUTGET_TOOLTIP_1);
      },
      getVars: function() {
        return [];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.Language.variables_outset = {
      // Variable setter.
      category: "Output",
      helpUrl: Blockly.LANG_VARIABLES_OUTSET_HELPURL,
      init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE')
            .appendTitle(Blockly.LANG_VARIABLES_OUTSET_TITLE_1)
            .appendTitle(new Blockly.FieldTextInput(
            Blockly.LANG_VARIABLES_OUTSET_ITEM), 'VAR');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_VARIABLES_OUTSET_TOOLTIP_1);
      },
      getVars: function() {
        return [];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.JavaScript.text_color = function() {
      var code = this.getTitleValue('VAR');
      return ['"' + code + '"', Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.JavaScript.const_get = function() {
      var code = this.getTitleValue('CONST');
      return [Blockly.eflang.constantsPath + code, Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.JavaScript.variables_outget = function() {
      // Variable getter.
      var code = this.getTitleValue('VAR');
      return ["env." + code, Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.JavaScript.variables_outset = function() {
      // Variable setter.
      var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
                          Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
      var varName = this.getTitleValue('VAR');

      return "env." + varName + ' = ' + argument0 + ';\n';
    };

    Blockly.JavaScript.objs_create_with = function() {
      // Create a list with any number of elements of any type.
      var
        code = new Array(this.itemCount_);

      for (var n = 0; n < this.itemCount_; n++) {
        code[n] = (this.getTitleValue('FIELD' + n)) + ": " +
                (Blockly.JavaScript.valueToCode(this, 'FIELD' + n,
                    Blockly.JavaScript.ORDER_COMMA) || 'null');
      }
      code = name + '{' + code.join(', ') + '}';
      return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };


    Blockly.Language.objs_create_with = {
      // Create a list with any number of elements of any type.
      category: Blockly.LANG_CATEGORY_OBJS,
      helpUrl: '',
      addField: function (num) {
        var input = this.appendValueInput('FIELD' + num)

        //if (num === 0) {
        //    input.appendTitle(Blockly.LANG_OBJS_CREATE_WITH_INPUT_WITH);
        //}

        input
            .appendTitle("key")
            .appendTitle(new Blockly.FieldTextInput(
            Blockly.LANG_VARIABLES_OUTSET_ITEM), 'FIELD' + num)
            .appendTitle(":");

        return input;
      },
      init: function() {
        this.setColour(330);
        this.addField(0);
        this.addField(1);
        this.addField(2);
        this.setOutput(true, Array);
        this.setMutator(new Blockly.Mutator(['objs_create_with_item']));
        this.setTooltip(Blockly.LANG_OBJS_CREATE_WITH_TOOLTIP_1);
        this.itemCount_ = 3;
      },
      mutationToDom: function(workspace) {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
      },
      domToMutation: function(container) {
        for (var x = 0; x < this.itemCount_; x++) {
          this.removeInput('FIELD' + x);
        }
        this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
        for (var x = 0; x < this.itemCount_; x++) {
          var input = this.addField(x);
        }
        if (this.itemCount_ == 0) {
          this.appendDummyInput('EMPTY')
              .appendTitle(Blockly.LANG_OBJS_CREATE_EMPTY_TITLE_1);
        }
      },
      decompose: function(workspace) {
        var containerBlock = new Blockly.Block(workspace,
                                               'objs_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
          var itemBlock = new Blockly.Block(workspace, 'objs_create_with_item');
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
            this.removeInput('FIELD' + x);
          }
        }
        this.itemCount_ = 0;
        // Rebuild the block's inputs.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        while (itemBlock) {
          var input = this.addField(this.itemCount_);

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
              .appendTitle(Blockly.LANG_OBJS_CREATE_EMPTY_TITLE_1);
        }
      },
      saveConnections: function(containerBlock) {
        // Store a pointer to any connected child blocks.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (itemBlock) {
          var input = this.getInput('FIELD' + x);
          itemBlock.valueConnection_ = input && input.connection.targetConnection;
          x++;
          itemBlock = itemBlock.nextConnection &&
              itemBlock.nextConnection.targetBlock();
        }
      }
    };

    Blockly.Language.objs_create_with_container = {
      // Container.
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_OBJS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.LANG_OBJS_CREATE_WITH_CONTAINER_TOOLTIP_1);
        this.contextMenu = false;
      }
    };

    Blockly.Language.objs_create_with_item = {
      // Add items.
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_OBJS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_OBJS_CREATE_WITH_ITEM_TOOLTIP_1);
        this.contextMenu = false;
      }
    };

    Blockly.JavaScript.procs_call_with = function() {
      // Create a list with any number of elements of any type.
      var
          n,

          name = this.getTitleValue('NAME'),
          code = new Array(this.itemCount_);

      for (n = 0; n < this.itemCount_; n++) {
        code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
      }

      code = "libs." + name + '(' + code.join(', ') + ')';

      if (this.returns) {
          return [code, Blockly.JavaScript.ORDER_ATOMIC];
      } else {
          return code + ";\n";
      }
    };

    Blockly.JavaScript.procs_call_with_no_return = Blockly.JavaScript.procs_call_with;

    function makeProcCall(returns) {
        return {
          // Create a list with any number of elements of any type.
          category: Blockly.LANG_CATEGORY_PROCS,
          returns: returns,
          helpUrl: '',
          init: function() {
            this.setColour(290);
            this.appendDummyInput()
                .appendTitle(Blockly.LANG_PROCS_CALL_WITH_NAME)
                .appendTitle(new Blockly.FieldTextInput(
                Blockly.LANG_PROCS_CALL_NAME), 'NAME');
            this.appendValueInput('ADD0')
                .appendTitle(Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH);
            this.appendValueInput('ADD1');

            if (returns) {
                this.setOutput(true, null);
            } else {
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            }

            this.setMutator(new Blockly.Mutator(['procs_call_with_item']));
            this.setTooltip(Blockly.LANG_PROCS_CALL_WITH_TOOLTIP_1);
            this.itemCount_ = 2;
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
                input.appendTitle(Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH);
              }
            }
            if (this.itemCount_ == 0) {
              this.appendDummyInput('EMPTY')
                  .appendTitle(Blockly.LANG_PROCS_CALL_EMPTY_TITLE_1);
            }
          },
          decompose: function(workspace) {
            var containerBlock = new Blockly.Block(workspace,
                                                   'procs_call_with_container');
            containerBlock.initSvg();
            var connection = containerBlock.getInput('STACK').connection;
            for (var x = 0; x < this.itemCount_; x++) {
              var itemBlock = new Blockly.Block(workspace, 'procs_call_with_item');
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
                input.appendTitle(Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH);
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
                  .appendTitle(Blockly.LANG_PROCS_CALL_EMPTY_TITLE_1);
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
    }

    Blockly.Language.procs_call_with = makeProcCall(true);
    Blockly.Language.procs_call_with_no_return = makeProcCall(false);

    Blockly.Language.procs_call_with_container = {
      // Container.
      init: function() {
        this.setColour(290);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TOOLTIP_1);
        this.contextMenu = false;
      }
    };

    Blockly.Language.procs_call_with_item = {
      // Add items.
      init: function() {
        this.setColour(290);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_PROCS_CALL_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_PROCS_CALL_WITH_ITEM_TOOLTIP_1);
        this.contextMenu = false;
      }
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
      // Whitelist of blocks to keep.
      var
          query = parseQuery(),
          newLanguage = {},
          keepers = [
              'controls_if',
              'controls_if_if',
              'controls_if_elseif',
              'controls_if_else',

              'math_number',
              'math_arithmetic',
              'math_constrain',

              'lists_create_empty',
              'lists_create_with',
              'lists_create_with_item',
              'lists_create_with_container',
              'lists_length',
              'lists_isEmpty',
              'lists_indexOf',
              'lists_getIndex',
              'lists_setIndex',
              
              'logic_operation',
              'logic_compare',
              'logic_negate',
              'logic_boolean',

              'variables_get',
              'variables_set',

              'variables_outget',
              'variables_outset',

              'objs_create_with',
              'objs_create_with_item',
              'objs_create_with_container',

              'text',
              'text_join',
              'text_create_join_container',
              'text_create_join_item',
              'text_append',
              'text_length',
              'text_isEmpty',
              'text_endString',
              'text_indexOf',
              'text_charAt',
              'text_changeCase',
              'text_trim',
              'text_print',
              'text_color',

              'const_get',

              'procs_call_with',
              'procs_call_with_no_return',
              'procs_call_with_item',
              'procs_call_with_container'
          ];

      for (var x = 0; x < keepers.length; x++) {
        newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
      }
      // Fold control category into logic category.
      for (var name in newLanguage) {
        if (newLanguage[name].category == 'Control') {
          newLanguage[name].category = 'Logic';
        }
      }

      Blockly.Language = newLanguage;
      Blockly.inject(document.body, {path: './'});


      window.parent["init" + query.id](Blockly, query.id);
    }

    /**
     * Class for a non-editable field.
     * @param {string} text The initial content of the field.
     * @extends Blockly.Field
     * @constructor
     */
    Blockly.FieldColor = function(text, onColorChange) {
      var that = this;

      this.sourceBlock_ = null;
      // Build the DOM.
      this.textElement_ = Blockly.createSvgElement('text', {
              'class': 'blocklyText',
              'style': 'cursor: pointer;'
          }, null);

      this.textElement_.addEventListener('click', function (event) {
          var
              svgDialog_ = Blockly.createSvgElement('svg', {
                  'x': event.clientX,
                  'y': event.clientY
              }, Blockly.mainWorkspace.svgGroup_),

              svgBackground_ = Blockly.createSvgElement('rect', {
                'class': 'blocklyMutatorBackground',
                'height': '120',
                'width': '380'
              }, svgDialog_),

              foreignObject = Blockly.createSvgElement('foreignObject', {
                  y: 80,
                  height: 40,
                  width: 380
              }, svgBackground_),

              // Can't use 'Blockly.createSvgElement' since this is not in the SVG NS.
              body = goog.dom.createDom('body', 'blocklyMinimalBody'),
              input = goog.dom.createDom('input');

          input.type = "button";
          input.value = "OK";
          body.setAttribute("style", "text-align: right; width: 98%; margin: 0; padding: 1%;");

          body.appendChild(input);
          foreignObject.appendChild(body);

          that.colorPicker = new ColorPicker(svgDialog_, 10, 10, 50, 100, 50);
          svgDialog_.appendChild(foreignObject);

          input.addEventListener('click', function () {
              var color = that.colorPicker.getColorRGB();
              that.setText(color);
              Blockly.mainWorkspace.svgGroup_.removeChild(svgDialog_);
              onColorChange(color);
          });
      });

      this.size_ = {height: 25, width: 0};
      this.setText(text);
    };

    // FieldColor is a subclass of Field.
    goog.inherits(Blockly.FieldColor, Blockly.Field);

    /**
     * Editable fields are saved by the XML renderer, non-editable fields are not.
     */
    Blockly.FieldColor.prototype.EDITABLE = true;

    /**
     * Install this text on a block.
     * @param {!Blockly.Block} block The block containing this text.
     */
    Blockly.FieldColor.prototype.init = function(block) {
      if (this.sourceBlock_) {
        throw 'Text has already been initialized once.';
      }
      this.sourceBlock_ = block;
      block.getSvgRoot().appendChild(this.textElement_);

      // Configure the field to be transparent with respect to tooltips.
      this.textElement_.tooltip = this.sourceBlock_;
      Blockly.Tooltip && Blockly.Tooltip.bindMouseEvents(this.textElement_);
    };

    /**
     * Dispose of all DOM objects belonging to this text.
     */
    Blockly.FieldColor.prototype.dispose = function() {
      goog.dom.removeNode(this.textElement_);
      this.textElement_ = null;
    };

    /**
     * Gets the group element for this field.
     * Used for measuring the size and for positioning.
     * @return {!Element} The group element.
     */
    Blockly.FieldColor.prototype.getRootElement = function() {
      return /** @type {!Element} */ (this.textElement_);
    };

    /**
     * Change the tooltip text for this field.
     * @param {string|!Element} newTip Text for tooltip or a parent element to
     *     link to for its tooltip.
     */
    Blockly.FieldColor.prototype.setTooltip = function(newTip) {
      this.textElement_.tooltip = newTip;
    };

    return {
        init: init,
        Blockly: Blockly
    }
}());
