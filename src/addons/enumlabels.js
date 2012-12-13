/*global define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['json.edit'],
               function (JsonEdit) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory(JsonEdit));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.JsonEdit);
    }
}(this, function (JsonEdit) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectorHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};
    formatHints.array = formatHints.array || {};
    formatHints.integer = formatHints.integer || {};
    collectorHints.integer = collectorHints.integer || {};

    formatHints.string.enumlabels = function (name, type, id, opts, required, priv, util) {
        var i, obj = priv.formatForType(name, type, id, opts, required, util),
            option, options, childsCount, currentValue, labels = opts["je:enumlabels"] || {};

        options = obj.select.$childs;
        childsCount = options.length;

        for (i = 0; i < childsCount; i += 1) {
            option = options[i];

            currentValue = option.option.$childs;

            if (labels[currentValue]) {
                option.option.$childs = labels[currentValue];
                option.option.value = currentValue;
            }
        }

        return obj;
    };

    // add an entry for integers. Same function as for string
    formatHints.integer.enumlabels = formatHints.string.enumlabels;

    // add a collector hint for integers
    collectorHints.integer.enumlabels = function(key, field, schema, priv) {

        // The only real diff here is the 'select' instead of 'input'
        var value, strValue = priv.getChildrenOrSelf(field, "select").val();
        try {
            value = JSON.parse(strValue);
            return {result: priv.validateJson(name, value, schema), data: value};
        } catch (error) {
            return {
                result: priv.collectResult(false, "invalid format", {
                    error: error.toString()
                }),
                data: strValue
            };
        }
    };


    // will work when array schema has items.enum set
    formatHints.array.enumlabels = formatHints.string.enumlabels;

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
