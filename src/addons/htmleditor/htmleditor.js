/*global define, nicEditor*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['json.edit', 'jquery'],
               function (JsonEdit, jQuery) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory(JsonEdit, jQuery));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.JsonEdit, root.jQuery);
    }
}(this, function (JsonEdit, $) {
    "use strict";
    var cache = {},
        formatHints = JsonEdit.defaults.hintedFormatters,
        collectorHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};
    collectorHints.string = collectorHints.string || {};

    function load(loadFun, path) {
        if (!cache[path]) {
            cache[path] = true;
            loadFun(path);
        }
    }

    formatHints.string.htmleditor = function (name, type, id, opts, required,
                                              priv, util) {
        var textareaId = id + "-textarea",
            options = opts["je:htmleditor"] || {},
            rows = options.rows || 4,
            width = options.width || "100%",
            content = opts["default"] || "",
            path = (options.path || "/"),
            editorConfig = options.editorConfig || {fullPanel: true};

        if (path[path.length - 1] !== "/") {
            path += "/";
        }

        editorConfig.iconsPath = path + "nicEditorIcons.gif";
        load(priv.loadJs, path + "nicEdit.js");

        util.events.rendered.handleOnce(function () {
            var editor = new nicEditor(editorConfig);
            editor.panelInstance(textareaId);
            $("#" + textareaId).parent()
                .data("editor", editor.instanceById(textareaId));
        });

        return {
            "textarea": {
                "id": textareaId,
                "class": "htmleditor-textarea",
                "rows": rows,
                "style": "width: " + width,
                "$childs": priv.escapeHTML(content)
            }
        };
    };

    collectorHints.string.htmleditor = function (key, field, schema, priv) {
        var
            editor = field.data("editor"),
            result = editor.getContent();

        return {result: JsonEdit.makeResult(true, "ok", result), data: result};
    };

    return JsonEdit;
}));
