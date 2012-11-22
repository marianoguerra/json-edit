/*global window define document*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'json.edit', 'nsgen', 'jslint'],
               function ($, JsonEdit, NsGen, JsLint) {
            return (root.JsonEdit = factory($, JsonEdit, NsGen, JsLint));
        });
    } else {
        root.JsonEdit = factory(root.$, root.JsonEdit, root.JsonSchema, root.NsGen, root.JSLINT);
    }
}(this, function ($, JsonEdit, NsGen, jsLint) {
    "use strict";
    var
        formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.adsafe = function (name, type, id, opts, required, priv, util) {
        var
            options = opts["je:adsafe"] || {},
            rows = options.rows || 4,
            width = options.width || "99%",
            dataType  = options.type || "text",
            content = opts["default"] || "";

        if (dataType === "json" && typeof content !== "string") {
            content = JSON.stringify(content);
        }

        return {
            "textarea": {
                "rows": rows,
                "style": "width: " + width,
                "$childs": JsonEdit.escape(content)
            }
        };
    };

    function wrapBoilerPlate(code, args) {
        return 'ADSAFE.lib("name", function (' + args.join(", ") + ') {\n' +
        '    "use strict";\n' +
        '    return {\n' +
        '        handle: function () {\n' +
        '            ' + code.trim().replace(/\n/g, "\n            ") +
        '\n        }\n' +
        '    };\n' +
        '});\n';
    }

    // NOTE: modifies in place, returns just for convenience
    function adjustPositionToBoilerplateOption(data, wrapBoilerplate) {
        if (!wrapBoilerplate) {
            return data;
        }

        data.errors.forEach(function (error) {
            error.line -= 4;
            error.character -= 12;
        });
        return data;
    }

    collectHints.string = collectHints.string || {};

    collectHints.string.adsafe = function (key, field, schema, priv) {
        var
            code, jslintOk,

            adsafeOptions = schema["je:adsafe"] || {},
            jslintOptions = adsafeOptions.jslintOptions || {},

            result = priv.collectChildTag("textarea", key, field, schema);

        if (result.result.ok) {
            code = result.data;

            if (adsafeOptions.wrapBoilerplate) {
                code = wrapBoilerPlate(code, adsafeOptions.args || []);
            }

            jslintOk = jsLint(code, $.extend(true, {}, jslintOptions,
                {adsafe: true, safe: true}));

            result.finalCode = code;

            if (!jslintOk) {
                result.result.ok = false;
                result.result.msg = "error checking safe code compliance:\n" +
                    jsLint.error_report(
                        adjustPositionToBoilerplateOption(
                            jsLint.data(),
                            adsafeOptions.wrapBoilerplate));

            }
        }

        return result;
    };
}));
