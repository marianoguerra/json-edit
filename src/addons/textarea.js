/*global define document*/
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
    var
        escaper = document.createElement("textarea"),
        formatHints = JsonEdit.defaults.hintedFormatters;

    function escape(text) {
        escaper.innerHTML = text;
        return escaper.innerHTML;
    }

    formatHints.string = formatHints.string || {};

    formatHints.string.textarea = function (name, type, id, opts, required, priv, util) {
        var
            options = opts["je:textarea"] || {},
            rows = options.rows || 4,
            width = options.width || "99%",
            content = opts["default"] || "";

        return {
            "textarea": {
                "rows": rows,
                "style": "width: " + width,
                "$childs": escape(content)
            }
        };
    };

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
