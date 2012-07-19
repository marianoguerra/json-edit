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

    formatHints.array = formatHints.array || {};

    formatHints.array.tabarray = function (name, type, id, opts, required, priv, util) {
        var
            i,
            minItems,
            defaultValues = opts["default"] || [],
            addButton,
            $tabs;

        minItems = opts.minItems || 1;

        // if there are more default values than minItems then use that size to
        // initialize the items
        if (defaultValues.length > minItems) {
            minItems = defaultValues.length;
        }

        function addTab(index, isInit) {
            var itemId = id + "-" + index, content, itemOpts, wrapper;

            // default will be undefined if not set
            if (isInit && defaultValues[i]) {
                itemOpts = $.extend(true, {}, opts.items, {"default": defaultValues[i]});
            } else {
                itemOpts = opts.items;
            }

            content = $.lego(priv.input(name, opts.items.type, itemId + "-item", itemOpts, false, util));
            wrapper = $("<div>")
                .addClass(priv.ns.cls("array-item"))
                .attr("id", itemId)
                .css({"padding": "1em 0 0 0"});

            wrapper.append(content);
            $tabs.append(wrapper);
            $tabs.tabs("add", "#" + itemId, " ");
        }

        addButton = {
            "button": {
                "$click": function () {
                    i += 1;
                    addTab(i, false);
                },
                "$childs": "Add",
                "style": "float: right; margin: 0.5em;"
            }
        };

        util.events.rendered.add(function () {
            $tabs = $("#" + id);

            $tabs.tabs({
                tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' style='float: left; cursor: pointer'>Remove Tab</span></li>"
            });

            for (i = 0; i < minItems; i += 1) {
                addTab(i, true);
            }

            $("#" + id + " span.ui-icon-close").live("click", function () {
                var index = $("li", $tabs).index($(this).parent());
                $tabs.tabs("remove", index);
            });
        });

        return {
            "div": {
                "id": id,
                "class": priv.genFieldClasses(name, opts, " ", required),
                "$childs": [{"ul": {"$childs": []}}, addButton]
            }
        };
    };

    return JsonEdit;
}));
