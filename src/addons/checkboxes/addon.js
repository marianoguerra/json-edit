/*global define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'json.edit', 'json.schema'],
               function ($, JsonEdit, JsonSchema) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, JsonEdit, JsonSchema));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.$, root.JsonEdit, root.JsonSchema);
    }
}(this, function ($, JsonEdit, JsonSchema) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;
    formatHints.array = formatHints.array || {};

    formatHints.array.checkboxes = function (name, type, id, opts, required, priv, util) {
        var i, empty = "", checkboxDiv, checkboxes = [], value, label,
            defaultValues = opts["default"] || [],
            enumlabels = opts["je:enumlabels"] || {},
            enumitems = opts.items['enum'];

        for (i = 0; i < enumitems.length; i += 1) {
            value = enumitems[i];
            label = enumlabels[value] || value;
            checkboxDiv = {
                "div": {
                    "class": "json-edit-checkbox",
                    "$childs": [{
                        "label": {
                            "for": value,
                            "$childs": [label]
                        }
                    }, {
                        "input": {
                            "type": "checkbox",
                            "name": value,
                            "value": value
                        }
                    }]
                }
            };

            if ($.inArray(value, defaultValues) >= 0) {
                checkboxDiv.div.$childs[1].input.checked = "checked";
            }
            checkboxes.push(checkboxDiv);
        }

        if (priv.hasOption(opts, "hideIfNoSelection") &&
            enumitems.length === 0) {
            empty = " je-empty";
        }

        return {"div": {
                "id": id + "-checklist",
                "class": "json-edit-checklist" + empty,
                "$childs": checkboxes
            }
        };
    };

    collectHints.array = collectHints.array || {};
    collectHints.array.checkboxes = function (key, field, schema, priv) {
        var
            data = field.find("input[type='checkbox']:checked").map(function (i, item) {
                    return $(item).attr("name");
                }).toArray(),
            arrayResult = JsonSchema.validate(key, data, schema, false);

        return {result: arrayResult, data: data};
    };

    return JsonEdit;
}));
