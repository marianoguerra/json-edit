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
        i, type, types = ["string", "number", "integer", "boolean"];

    function readonly(name, type, id, opts, required, priv, util) {
        var obj = priv.formatForType(name, type, id, opts, required, util);

        obj.input.disabled = "disabled";

        return obj;
    }

    for (i = 0; i < types.length; i += 1) {
        type = types[i];
        formatHints[type] = formatHints[type] || {};
        formatHints[type].readonly = readonly;
    }

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
