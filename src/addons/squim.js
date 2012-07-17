/*global define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['json.edit', 'squide', 'squim'],
               function (JsonEdit, Squide, Squim) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory(JsonEdit, Squide, Squim));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.JsonEdit, root.Squide, root.Squim);
    }
}(this, function (JsonEdit, Squide, Squim) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.squim = function (name, type, id, opts, required, priv, util) {
        var code = opts["default"] || "()", value;

        try {
            value = Squide.types.fromValue(Squim.parse(code));
        } catch (error) {
            // TODO: inform about this error in some way
            value = Squide.types.fromValue(Squim.parse("()"));
        }

        (value.span || value.div).style = "display: table; width: 95%; clear: both;";
        return value;
    };

    collectHints.string = collectHints.string || {};

    collectHints.string.squim = function (key, field, schema, priv) {
        return {
            result: priv.collectResult(true),
            data: Squide.types.collect(field.children(".squide-value")).toString()
        };
    };

    return JsonEdit;
}));
