/*global window define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen',
               'json', 'colorPicker'],
               function ($, $ui, JsonEdit, JsonSchema, NsGen, JSON, ColorPicker) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, $ui, JsonEdit, JsonSchema, NsGen, JSON, ColorPicker));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.$, root.$, root.JsonEdit, root.JsonSchema, root.NsGen, root.JSON, root.ColorPicker);
    }
}(this, function ($, $ui, JsonEdit, JsonSchema, NsGen, JSON, mColorPicker) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.color = function (name, type, id, opts, required, priv, util) {
        util.events.rendered.add(function () {

            $("#" + id).click(function (event) {
                mColorPicker.size = 3;
                mColorPicker(event);
            });
        });

        return JsonEdit.defaults.formatters.default_(name, type, id, opts, required, util);
    };

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
