/*global window, define*/
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

    formatHints.object = formatHints.object || {};

    formatHints.object.tabsobject = function (name, type, id, opts, required, priv, util) {
        var
            tabs, childs, order,
            classes = ["field", "object-fields"],
            panels = [],
            idStr = (typeof id === "string") ? id : id.attr("id"),
            // if you change innerId format here change it in collector below
            innerId = idStr + "-inner",
            firstVisible = null;

        order = priv.getKeys(opts, opts.order);
        tabs = $.map(opts["je:options"], function (tab, index) {
            var
                style, id = innerId + index, panel,
                label = tab.title, fields;

            fields = priv.genFields(tab.fields, opts.properties, opts.required, opts["default"], util);
            panel = {
                "div": {
                    "id": id,
                    "style": style,
                    "$childs": fields
                }
            };
            panels.push(panel);

            // if the item is an object and has no properties and the option
            // hideIfNoSelection is set then hide this tab
            if (firstVisible === null) {
                firstVisible = index;
            }

            return {
                "li": {
                    "style": style,
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

        util.events.rendered.handleOnce(function () {
            var container = (typeof id === "string") ? $("#" + id + "-inner") : id;

            container.tabs();

            if (firstVisible !== null) {
                container.tabs("option", "active", firstVisible);
            }
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

    collectHints.object.tabsobject = function (key, field, schema, priv) {
        // if you change innerId format here change it in formatter above
        var
            innerId = field.attr("id") + "-inner",
            options = schema["je:options"],
            response = {}, result = {}, ok = false;

        options.forEach(function (item, index) {
            result = priv.collectObject(innerId + index, schema, item.fields);
            ok = result.ok;
            response = $.extend(true, response, result);
            response.result.ok = response.result.ok && ok;
        });

        return response;
    };

    return JsonEdit;
}));
