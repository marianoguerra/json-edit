/*global window define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen'],
               function ($, $ui, JsonEdit, JsonSchema, NsGen) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, $ui, JsonEdit, JsonSchema, NsGen));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.$, root.$, root.JsonEdit, root.JsonSchema, root.NsGen);
    }
}(this, function ($, $ui, JsonEdit, JsonSchema, NsGen) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.autocomplete = function (name, type, id, opts, required, priv, util) {
        var defaultValue = opts["default"] || "",
            availableValues;

        if (opts["je:availableValues"]) {
            availableValues = opts["je:availableValues"];
        } else if (opts['enum']) {
            availableValues = opts['enum'];
        } else {
            availableValues = [];
        }

        util.events.rendered.handleOnce(function () {
            $("#" + id).autocomplete({
                source: availableValues
            });
        });

        return JsonEdit.defaults.formatters.default_(name, type, id, opts, required, util);
    };

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
