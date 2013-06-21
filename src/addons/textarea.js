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
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.textarea = function (name, type, id, opts, required, priv, util) {
        var
            options = opts["je:textarea"] || {},
            rows = options.rows || 4,
            width = options.width || "100%",
            dataType  = options.type || "text",
            content = opts["default"] || "";

        if (dataType === "json" && typeof content !== "string") {
            content = JSON.stringify(content);
        }

        return {
            "textarea": {
                "rows": rows,
                "style": "width: " + width,
                "$childs": priv.escapeHTML(content)
            }
        };
    };

    collectHints.string = collectHints.string || {};

    collectHints.string.textarea = function (key, field, schema, priv) {
        var result = priv.collectChildTag("textarea", key, field, schema);

        if ((schema["je:textarea"] || {}).type === "json" && result.result.ok) {
            try {
                result.data = JSON.parse(result.data);
            } catch (error) {
                result.result.ok = false;
                result.result.msg = error.toString();
                result.result.data = error;
            }
        }

        return result;
    };

    return JsonEdit;
}));
