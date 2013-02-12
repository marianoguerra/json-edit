/*global define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['json.edit', 'jquery'],
               function (JsonEdit, jQuery) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory(JsonEdit, jQuery));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.JsonEdit, root.jQuery);
    }
}(this, function (JsonEdit, $) {
    "use strict";
    var formatter, collector;

    function onCheckClick(id) {
        return function () {
            var check = $(this),
                checked = check.prop("checked"),
                cont = check.parent().children(".je-optional-value");

            if (checked) {
                cont.show();
            } else {
                cont.hide();
            }
        };
    }

    formatter = function (name, type, id, opts, required, priv, util) {
        var result,
            checkId  = "check" + id,
            options = opts["je:optional"] || {},
            label = options.label || "Set",
            enabled = options.enabled,
            obj = priv.formatForType(name, type, id, opts, required, util);

        result = {
            "div": {
                "class": "je-optional-cont",
                "$childs": [
                    {
                        "input": {
                            "checked": (enabled) ? "checked" : null,
                            "id": checkId,
                            "type": "checkbox",
                            "class": "je-optional-checkbox",
                            "$click": onCheckClick(id)
                        }
                    },
                    {
                        "div": {
                            "class": "je-optional-value",
                            "style": "display:" + ((enabled) ? "block" : "none"),
                            "$childs": obj
                        }
                    }
                ]
            }
        };

        return result;
    };

    collector = function (key, field, schema, priv) {
        var result,
            checked = field.find(".je-optional-checkbox:first").prop("checked"),
            options = schema["je:optional"] || {},
            realField = field.find(".je-optional-value").children(":first");

        if (checked) {
            return priv.collectField(key, realField, schema, true);
        } else {
            result = (options["default"] === undefined) ? null : options["default"];
            return {result: JsonEdit.makeResult(true, "ok", result), data: result};
        }
    };

    JsonEdit.setHintForAllTypes("optional", formatter, collector);

    return JsonEdit;
}));
