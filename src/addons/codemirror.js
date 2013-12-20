/*global define, document, CodeMirror, setTimeout*/
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
    var
        cache = {},
        formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    function load(loadFun, path, id) {
        if (!cache[path]) {
            cache[path] = true;
            loadFun(path, id);
            return false;
        }
        return true;
    }

    formatHints.string = formatHints.string || {};

    formatHints.string.codemirror = function (name, type, id, opts, required, priv, util) {
        var
            codeId = id + "-codemirror",
            options = opts["je:codemirror"] || {},
            init = options.init || {},
            path = (options.path || "/"),
            addons = options.addons || [],
            styles = options.styles || [],
            scripts = options.scripts || [],
            loadCssFromCache,
            content = opts["default"] || "";

        if (path[path.length - 1] !== "/") {
            path += "/";
        }

        loadCssFromCache = load(priv.loadCss, path + "lib/codemirror.css", "codemirror-style");
        load(priv.loadJs, path + "lib/codemirror.js");

        if (options.mode) {
            load(priv.loadJs, path + "mode/" + options.mode);
        }

        scripts.forEach(function (script) {
            load(priv.loadJs, path + "/" + script);
        });

        addons.forEach(function (addon) {
            load(priv.loadJs, path + "addon/" + addon);
        });

        styles.forEach(function (stylePath) {
            load(priv.loadCss, path + "/" + stylePath);
        });

        util.events.rendered.handleOnce(function () {
            if (options.lintWith) {
                init.lintWith = CodeMirror[options.lintWith];
            }

            function render() {
                var textarea = document.getElementById(codeId),
                editor = CodeMirror.fromTextArea(textarea, init);

                $("#" + codeId).data("codemirror", editor);
            }

            if (loadCssFromCache) {
                render();
            } else {
                // In Chrome the codemirror is rendered before the css was loaded
                setTimeout(render, 2000);
            }
        });

        return {
            "textarea": {
                "id": codeId,
                "style": "display:none",
                "class": "codemirror-textarea",
                "$childs": (content)
            }
        };
    };

    collectHints.string = collectHints.string || {};

    collectHints.string.codemirror = function (key, field, schema, priv) {
        var
            textarea = field.find(".codemirror-textarea:first"),
            editor = textarea.data("codemirror"),
            result = editor.getValue();

        return {result: JsonEdit.makeResult(true, "ok", result), data: result};
    };

    return JsonEdit;
}));
