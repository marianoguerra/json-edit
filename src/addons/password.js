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
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.password = function (name, type, id, opts, required, priv, util) {
        var obj = priv.formatForType(name, type, id, opts, required, util);

        obj.input.type = "password";

        return obj;
    };

    collectHints.string = collectHints.string || {};

    collectHints.string.password = function (key, field, schema, priv) {
        var
            inputField = priv.getChildrenOrSelf(field, "input"),
            result = priv.collectChildTag("input", key, field, schema);

        inputField.val("");

        return result;
    };
    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
