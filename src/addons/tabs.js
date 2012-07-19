/*global window define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen',
               'json'],
               function ($, $ui, JsonEdit, JsonSchema, NsGen, JSON) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, $ui, JsonEdit, JsonSchema, NsGen, JSON));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.$, root.$, root.JsonEdit, root.JsonSchema, root.NsGen, root.JSON);
    }
}(this, function ($, $ui, JsonEdit, JsonSchema, NsGen, JSON) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.object = formatHints.object || {};

    formatHints.object.tabs = function (name, type, id, opts, required, priv, util) {
        var classes = ["field", "object-fields"], tabs, childs, order,
            panels = priv.genFields(opts.order, opts.properties, opts.required, util),
            idStr = (typeof id === "string") ? id : id.attr("id"),
            // if you change innerId format here change it in collector below
            innerId = idStr + "-inner";

        order = priv.getKeys(opts, opts.order);
        tabs = $.map(order, function (key, index) {
            var val = opts.properties[key], label = val.title || key,
                id = panels[index].div.id;

            return {
                "li": {
                    "$childs": [{
                        "a": {
                            "href": "#" + id,
                            "$childs": label
                        }
                    }]
                }
            };
        });

        childs = [{"ul": {"$childs": tabs}}].concat(panels);

        if (required) {
            classes.push("required");
        }

        util.events.rendered.add(function () {
            var container = (typeof id === "string") ? $("#" + id) : id;

            container.tabs();
        });

        return {
            "div": {
                "id": innerId,
                "class": priv.ns.classes(classes),
                "$childs": childs
            }
        };
    };

    collectHints.object = collectHints.object || {};

    collectHints.object.tabs = function (key, field, schema, priv) {
        // if you change innerId format here change it in formatter above
        var
            innerId = field.attr("id") + "-inner";

        return priv.collectObject(innerId, schema);
    };

    return JsonEdit;
}));
