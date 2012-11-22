var eflang = (function () {
    'use strict';

    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FIELD = "get field";
    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_IN = 'in object';
    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FROM_TOOLTIP_1 = 'Returns the value of field in an object.';

    Blockly.LANG_CATEGORY_OBJS = "Objects";

    Blockly.Language.variables_getField = {
      // Get field from object
      category: Blockly.LANG_CATEGORY_OBJS,
      helpUrl: "",
      init: function() {
        this.setColour(330);
        this.setOutput(true, null);
        this.appendValueInput('AT')
            .setCheck(String)
            .appendTitle(Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FIELD);
        this.appendValueInput('VALUE')
            .setCheck(Array)
            .appendTitle(Blockly.LANG_VARIABLES_GET_FIELD_INPUT_IN);
        this.setInputsInline(true);
        this.setTooltip(Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FROM_TOOLTIP_1);
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
              'variables_getField',

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
              'text_print'
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


      window.parent["init" + query.id](Blockly);
    }

    return {
        init: init,
        Blockly: Blockly
    }
}());
