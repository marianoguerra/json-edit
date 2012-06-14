/*global window jQuery*/
(function ($) {
    "use strict";
    var cons, jopts, priv = {}, nsgen, ns, prefix,
        defaults;

    defaults = {
        displayError: function (msg) {
            alert(msg);
        },
        msgs: {
            cantRemoveMinItems: "Can't remove item, minimum number reached",
            cantAddMaxItems: "Can't add item, maximum number reached"
        }
    };

    nsgen = function (prefix, sep, count, inc) {
        sep = sep || "-";
        count = count || 0;
        inc = inc || 1;

        function nextCount() {
            var next = count;
            count += inc;

            return next;
        }

        function id(suffix, omitCount, count) {
            if (count === undefined) {
                count = nextCount();
            }

            var countSuffix = (omitCount) ? "" : sep + count;
            return prefix + sep + suffix + countSuffix;
        }

        // return a function that can take a list of args as first parameter
        // or spliced, if it takes just one argument and is an array use that
        // as the list, otherwise collect the arguments and use that as the list
        // examples:
        //  foo([1,2,3]) === foo(1,2,3)
        function dualVarArgs(fun) {
            return function () {
                var args = $.makeArray(arguments);

                // if it's just one argument and is an array then take the
                // array as the list of arguments
                // otherwise use all the arguments as the list of arguments
                if (args.length === 1 && $.isArray(args[0])) {
                    args = args[0];
                }

                return fun(args);
            };
        }

        return {
            nextCount: nextCount,
            id: id,
            $id: function (suffix, omitCount, count) {
                return "#" + id(suffix, omitCount, count);
            },
            cls: function (suffix) {
                return id(suffix, true);
            },
            $cls: function (suffix) {
                return "." + id(suffix, true);
            },
            // return a string with classes separated by spaces
            classes: dualVarArgs(function (suffixes) {
                return $.map(
                    suffixes,
                    function (suffix) {
                        return id(suffix, true);
                    }
                )
                    .join(" ");
            }),
            _reset: function (value) {
                count = value || 0;
            }
        };
    };

    if (window._jsonEditOpts) {
        jopts = window._jsonEditOpts;
    } else {
        jopts = {};
    }

    prefix = jopts.prefix || "je";
    ns = nsgen(prefix);
    priv.ns = ns;

    priv.getKeys = function (obj) {
        return $.map(obj, function (value, key) {
            return key;
        });
    };


    priv.genFields = function (order, schema) {
        if (!order) {
            order = priv.getKeys(schema);
        }

        return $.map(order, function (item) {
            var itemSchema = schema[item];

            if (schema[item] === undefined) {
                throw new cons.Error("attribute not found on schema", {
                    "value": item,
                    "schema": schema
                });
            }

            return priv.genField(item, itemSchema);
        });
    };

    cons = function (id, opts) {
        var container = $("#" + id);

        $.each(priv.genFields(opts.order, opts.properties), function (index, lego) {
            container.append($.lego(lego));
        });
    };

    cons.Error = function (reason, args) {
        this.reason = reason;
        this.args = args;
    };

    priv.label = function (label, idFor) {
        return {
            "label": {
                "for": idFor,
                "$childs": label
            }
        };
    };

    priv.inputTypes = {
        "string": "text",
        "number": "number",
        "integer": "number",
        "boolean": "checkbox"
    };

    priv.inputFormats = {
        "date-time": "datetime",
        "date": "date",
        "time": "time",
        "utc-millisec": "text",
        "regex": "text",
        "color": "color",
        "style": "text",
        "phone": "tel",
        "uri": "url",
        "email": "email",
        "ip-address": "text",
        "ipv6": "text",
        "host-name": "text"
    };

    // TODO: add patterns for inputFormats not supported
    priv.inputPatterns = {
    };

    priv.input = function (type, id, opts) {
        var inputType = priv.inputTypes[type] || "text", obj, pattern,
            min, max,
            // vars used in case type is array
            minItems, i, arrayChilds = [], arrayChild;

        function makeClickable(type, label, onClick, data) {
            var result = {};

            data = data || {};
            data.$childs = label;

            if (onClick) {
                data.$click = onClick;
            }

            result[type] = data;

            return result;
        }

        function makeButton(label, onClick, data) {
            return makeClickable("button", label, onClick, data);
        }

        opts = opts || {};

        function makeLinkAction(label, onClick, data) {
            data = $.extend(true, {href: "#"}, data);

            return makeClickable("a", label, onClick, data);
        }

        function makeArrayItem(type, id, schema) {
            var
                cont,
                input = priv.input(type, id, schema);

            function onRemoveClick(event) {
                var realMinItems = opts.minItems || 0,
                    cont = $("#" + id);

                if (cont.parent().children().size() <= realMinItems) {
                    defaults.displayError(defaults.msgs.cantRemoveMinItems);
                } else {
                    cont.remove();
                }

                event.preventDefault();
            }

            cont = {
                "div": {
                    "id": id,
                    "class": ns.cls("array-item"),
                    "$childs": [
                        input,
                        {
                            "div": {
                                "class": ns.cls("item-actions"),
                                "$childs": [
                                    makeLinkAction(
                                        "remove",
                                        onRemoveClick,
                                        {"class": ns.cls("action")})
                                ]
                            }
                        }
                    ]
                }
            };

            return cont;
        }

        function onAddItemClick() {
            i += 1;

            var
                items = $("#" + id + " " + ns.$cls("array-items")),
                item = makeArrayItem(
                opts.items.type || "string",
                id + "-" + i,
                opts.items);

            if (opts.maxItems && items.children().size() >= opts.maxItems) {
                defaults.displayError(defaults.msgs.cantAddMaxItems);
            } else {
                items.append($.lego(item));
            }
        }

        function onClearItemsClick() {
            var realMinItems = opts.minItems || 0,
                selectorItems = "#" + id + " " + ns.$cls("array-items"),
                selectorChildsToRemove = ":not(:lt(" + realMinItems + "))";

            $(selectorItems).children(selectorChildsToRemove).remove();
        }

        if (type === "object") {
            return {
                "div": {
                    "id": id,
                    "class": ns.classes("field", "object-fields"),
                    "$childs": priv.genFields(opts.order, opts.properties)
                }
            };
        } else if (type === "array") {
            minItems = opts.minItems || 1;
            for (i = 0; i < minItems; i += 1) {
                arrayChild = makeArrayItem(
                    opts.items.type || "string",
                    id + "-" + i,
                    opts.items);

                arrayChilds.push(arrayChild);
            }

            return {
                "div": {
                    "id": id,
                    "class": ns.cls("array"),
                    "$childs": [
                        {
                            "div": {
                                "class": ns.cls("array-items"),
                                "$childs": arrayChilds
                            }
                        },
                        {
                            "div": {
                                "class": ns.cls("array-actions"),
                                "$childs": [
                                    makeButton("add", onAddItemClick),
                                    makeButton("clear", onClearItemsClick)
                                ]
                            }
                        }
                    ]
                }
            };
        } else if (opts["enum"]) {
            obj = {
                "select": {
                    "id": id,
                    "$childs": $.map(opts["enum"], function (item, index) {
                        var opt = {
                            "option": {
                                "id": id + "-" + index,
                                "$childs": item
                            }
                        };

                        if (item === opts["default"]) {
                            opt.option.selected = true;
                        }

                        return opt;
                    })
                }
            };

            if (!opts.required) {
                obj.select.$childs.unshift({"option": {"$childs": ""}});
            }

            if (opts.description) {
                obj.select.title = opts.description;
            }
        } else {
            obj = {
                "input": {
                    "id": id,
                    "type": inputType
                }
            };

            if (type === "string" && opts.format) {
                obj.input.type = priv.inputFormats[opts.format] || "text";

                pattern = priv.inputPatterns[opts.format];

                if (pattern) {
                    obj.input.pattern = pattern;
                }
            }

            if (opts["default"]) {
                obj.input.value = opts["default"];
            }

            if (opts.required) {
                obj.input.required = true;
            }

            if (opts.maxLength) {
                // note the difference in capitalization
                obj.input.maxlength = opts.maxLength;
            }

            if (opts.description) {
                obj.input.title = opts.description;
            }

            if (opts.maximum) {
                if (opts.exclusiveMaximum) {
                    max = opts.maximum - 1;
                } else {
                    max = opts.maximum;
                }

                obj.input.max = max;
            }

            if (opts.minimum) {
                if (opts.exclusiveMinimum) {
                    min = opts.minimum + 1;
                } else {
                    min = opts.minimum;
                }

                obj.input.min = min;
            }
        }

        return obj;
    };

    priv.genField = function (fid, opts) {
        var
            id = ns.id(fid),
            inputId = ns.id(fid + "-input"),
            type = opts.type || "string",
            classes = ["field", fid, type];

        if (opts.required) {
            classes.push("required");
        }

        return {
            "div": {
                "id": id,
                "class": ns.classes(classes),
                "$childs": [
                    priv.label(opts.title, inputId),
                    priv.input(type, inputId, opts)
                ]
            }
        };
    };

    if (jopts.exportPrivates) {
        window.jsonEdit = cons;
        window.jsonEdit.priv = priv;
    } else if (jopts.global) {
        window.jsonEdit = cons;
    }

    return cons;
}(jQuery));
