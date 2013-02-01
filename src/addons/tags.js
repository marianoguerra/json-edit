/*global window define*/
// need to add this style ioncache.github.com/Tag-Handler/css/taghandler.css
// need to add jqeuryui css style
// jquery dependency is only required for autocompletion
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen',
               'jquery.taghandler'],
               function ($, $ui, JsonEdit, JsonSchema, NsGen, TagHandler) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, $ui, JsonEdit, JsonSchema, NsGen, TagHandler));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.$, root.$, root.JsonEdit, root.JsonSchema, root.NsGen, root.TagHandler);
    }
}(this, function ($, $ui, JsonEdit, JsonSchema, NsGen, TagHandler) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.array = formatHints.array || {};

    formatHints.array.tags = function (name, type, id, opts, required, priv, util) {
        var defaultValues = opts["default"] || [],
            availableValues,
            tagsId =  id + "-tags", allowAdd, maxTags;

        if (opts["je:availableValues"]) {
            availableValues = opts["je:availableValues"];
        } else if (opts.items && opts.items['enum']) {
            availableValues = opts.items['enum'];
        } else {
            availableValues = [];
        }

        if (opts["je:allowAdd"] !== undefined) {
            allowAdd = (opts["je:allowAdd"] === true);
        } else {
            if (availableValues.length === 0) {
                allowAdd = true;
            } else {
                allowAdd = false;
            }
        }

        if (typeof opts.maxItems === "number") {
            maxTags = opts.maxItems;
        } else {
            maxTags = 0;
        }

        util.events.rendered.handleOnce(function () {
            $("#" + tagsId).tagHandler({
                className: "je-tagHandler tagHandler",
                assignedTags: defaultValues,
                availableTags: availableValues,
                allowAdd: allowAdd,
                //autocomplete: true,
                maxTags: maxTags
            });
        });

        return {
            "div": {
                "id": id,
                "$childs": [{
                    "ul": {
                        "id": tagsId
                    }
                }]
            }
        };
    };

    collectHints.array = collectHints.array || {};

    collectHints.array.tags = function (key, field, schema, priv) {
        var ok = true, msg = "ok", errors = [], data, arrayResult;

        data = field.find(".tagHandler").tagHandler('getTags');

        arrayResult = JsonSchema.validate(key, data, schema, false);

        if (!arrayResult.ok) {
            ok = false;
            msg = "one or more errors in array";
            errors.unshift(arrayResult);
        }

        return {result: priv.collectResult(ok, msg, errors), data: data};
    };

    return JsonEdit;
}));
