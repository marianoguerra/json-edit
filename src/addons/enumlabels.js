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
    var formatHints = JsonEdit.defaults.hintedFormatters;

    formatHints.string = formatHints.string || {};

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

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
