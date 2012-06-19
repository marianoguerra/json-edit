/*global window define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['json.schema', 'nsgen', 'json'], function (JsonSchema, NsGen, JSON) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory(root.jQuery, JsonSchema, NsGen, JSON));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.jQuery, root.JsonSchema, root.NsGen, root.JSON);
    }
}(this, function ($, JsonSchema, NsGen, JSON) {
    "use strict";
    var cons, jopts, priv = {}, ns, prefix,
        defaults;

    defaults = {
        displayError: function (msg) {
            alert(msg);
        },
        displayWarning: function () {
            if (window.console && window.console.warn) {
                window.console.warn.apply(window.console, arguments);
            }
        },
        msgs: {
            cantRemoveMinItems: "Can't remove item, minimum number reached",
            cantAddMaxItems: "Can't add item, maximum number reached"
        },
        // functions to call to format a given type of field, you can add your
        // own or modify the existing ones, if none matches
        // defaults.formatters.default_ is called.
        formatters: {
        },
        // function to call to collect the value for a given type of field, you can
        // add your own or modify the existing ones, if none matches
        // defaults.collectors.default_ is called
        collectors: {
        }
    };

    if (window._jsonEditOpts) {
        jopts = window._jsonEditOpts;
    } else {
        jopts = {};
    }

    prefix = jopts.prefix || "je";
    ns = NsGen(prefix);
    priv.ns = ns;

    priv.getKeys = function (obj, order) {
        if (order) {
            return order;
        } else {
            return $.map(obj, function (value, key) {
                return key;
            });
        }
    };


    priv.genFields = function (order, schema, requiredFields) {
        order = priv.getKeys(schema, order);

        requiredFields = requiredFields || [];

        return $.map(order, function (item) {
            var itemSchema = schema[item],
                required = $.inArray(item, requiredFields) !== -1;

            if (schema[item] === undefined) {
                throw new cons.Error("attribute not found on schema", {
                    "value": item,
                    "schema": schema
                });
            }

            return priv.genField(item, itemSchema, required);
        });
    };

    cons = function (id, opts) {
        var container = $("#" + id);

        $.each(priv.genFields(opts.order, opts.properties, opts.required), function (index, lego) {
            container.append($.lego(lego));
        });

        return {
            "collect": function () {
                return cons.collect(id, opts);
            },
            "id": id,
            "opts": opts
        };
    };

    priv.collectResult = function (ok, msg, data) {
        if (msg === undefined && ok) {
            msg = "ok";
        }

        if (data === undefined) {
            data = {};
        }

        return {
            ok: ok,
            msg: msg,
            data: (data === undefined) ? {} : data
        };
    };

    cons.defaults = defaults;
    cons.collect = function (id, opts) {
        var
            // if can be already a jquery object if called from collectObject
            cont = (typeof id === "string") ? $("#" + id) : id,
            order = priv.getKeys(opts.properties, opts.order),
            result = {ok: true, msg: "ok", data: {}}, data = {};

        $.each(order, function (i, key) {
            var
                value,
                schema = opts.properties[key],
                selector = "." + priv.genFieldClasses(key, schema, ".", schema.required),
                field = cont.children(selector);

            if (field.size() !== 1) {
                defaults.displayWarning("expected one item collecting",
                    field.size(), key, selector, cont, field);

                value = priv.collectResult(false,
                    "expected one item collecting", {
                        key: key,
                        size: field.size()
                    });

            } else {
                value = priv.collectField(key, field, schema);
            }

            if (!value.result.ok) {
                result.ok = false;
                result.msg = "one or more errors in object fields";
                result.data[key] = value.result;
            }

            data[key] = value.data;
        });

        return {result: result, data: data};
    };

    priv.collectField = function (key, field, schema) {
        if (defaults.collectors[schema.type]) {
            return defaults.collectors[schema.type](key, field, schema);
        } else {
            return defaults.collectors.default_(key, field, schema);
        }
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


    function makeLinkAction(label, onClick, data) {
        data = $.extend(true, {href: "#"}, data);

        return makeClickable("a", label, onClick, data);
    }

    function makeArrayItem(opts, name, type, id, schema) {
        var
            cont,
            input = priv.input(name, type, id, schema);

        // if it's just an input field
        if (input.input) {
            input.input["class"] = (input.input["class"] || "") + " " + ns.cls("array-item-input");
        }

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
                            "class": ns.cls("array-item-actions"),
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

    function getType(schema) {
        if (
                schema.properties ||
                schema.additionalProperties !== undefined ||
                schema.patternProperties ||
                schema.minProperties ||
                schema.maxProperties) {

            return "object";
        } else if (
                schema.items ||
                schema.additionalItems ||
                schema.minItems ||
                schema.maxItems ||
                schema.uniqueItems) {
            return "array";
        } else if (
                schema.minimum ||
                schema.maximum) {
            return "number";
        } else {
            return "string";
        }
    }

    function onAddItemClick(opts, id, i) {
        var
            items = $("#" + id + " " + ns.$cls("array-items")),
            item = makeArrayItem(
                opts,
                name,
                opts.items.type || getType(opts.items),
                id + "-" + i,
                opts.items);

        if (opts.maxItems && items.children().size() >= opts.maxItems) {
            defaults.displayError(defaults.msgs.cantAddMaxItems);
        } else {
            items.append($.lego(item));
        }
    }

    function onClearItemsClick(opts, id) {
        var realMinItems = opts.minItems || 0,
            selectorItems = "#" + id + " " + ns.$cls("array-items"),
            selectorChildsToRemove = ":not(:lt(" + realMinItems + "))";

        $(selectorItems).children(selectorChildsToRemove).remove();
    }

    defaults.formatters.object = function (name, type, id, opts, required) {
        var classes = ["field", "object-fields"];

        if (required) {
            classes.push("required");
        }

        return {
            "div": {
                "id": id,
                "class": ns.classes(classes),
                "$childs": priv.genFields(opts.order, opts.properties, opts.required)
            }
        };
    };

    defaults.formatters.array = function (name, type, id, opts, required) {
        var i, minItems, arrayChild, arrayChilds = [];

        minItems = opts.minItems || 1;

        for (i = 0; i < minItems; i += 1) {
            arrayChild = makeArrayItem(
                opts,
                name,
                opts.items.type || getType(opts.items),
                id + "-" + i,
                opts.items);

            arrayChilds.push(arrayChild);
        }

        return {
            "div": {
                "id": id,
                "class": priv.genFieldClasses(name, opts, " ", required),
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
                                makeButton("add", function () {
                                    i += 1;
                                    onAddItemClick(opts, id, i);
                                }),
                                makeButton("clear", function () {
                                    onClearItemsClick(opts, id);
                                })
                            ]
                        }
                    }
                ]
            }
        };
    };

    defaults.formatters.enum_ = function (name, type, id, opts, required) {
        var hasDefault = false, noValueOption,
            obj = {
                "select": {
                    "id": id,
                    "name": name,
                    "$childs": $.map(opts["enum"], function (item, index) {
                        var opt = {
                            "option": {
                                "id": id + "-" + index,
                                "$childs": item
                            }
                        };

                        if (item === opts["default"]) {
                            opt.option.selected = true;
                            hasDefault = true;
                        }

                        return opt;
                    })
                }
            };

        if (!required) {
            noValueOption = {"option": {"class": ns.cls("no-value"), "$childs": ""}};

            if (!hasDefault) {
                noValueOption.option.selected = true;
            }

            obj.select.$childs.unshift(noValueOption);
        }

        if (opts.description) {
            obj.select.title = opts.description;
        }

        return obj;
    };


    defaults.formatters.default_ = function (name, type, id, opts, required) {

        if (opts["enum"]) {
            return defaults.formatters.enum_(name, type, id, opts, required);
        }

        var inputType = priv.inputTypes[type] || "text", min, max,
            obj = {
                "input": {
                    "id": id,
                    "name": name,
                    "type": inputType
                }
            };

        if (opts["default"]) {
            obj.input.value = opts["default"];
        }

        if (required) {
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

        if (opts.pattern) {
            obj.input.pattern = opts.pattern;
        }

        return obj;
    };

    defaults.collectors.object = function (name, field, schema) {
        // get the inner child of the object container since collectors look
        // only in the first level childrens
        return cons.collect(field.children(ns.$cls("object-fields")), schema);
    };

    defaults.collectors.array = function (name, field, schema) {
        var itemSchema = schema.items || {}, errors = [],
            ok = true, msg = "ok", data = [];

        field.find(ns.$cls("array-item")).each(function (i, node) {
            var itemResult = priv.collectField(name, $(node), itemSchema);

            if (!itemResult.result.ok) {
                msg = "one or more errors in array items";
                ok = false;
                errors.push(itemResult);
            }

            data.push(itemResult.data);
        });

        return {result: priv.collectResult(ok, msg, errors), data: data};
    };

    defaults.collectors.enum_ = function (name, field, schema) {
        var
            select = field.children("select"),
            option,
            value = select.val(),
            result = {};

        // if the selected option is the "no-value" option then set value to null
        if (value === "") {
            option = select.find("option:selected");
            if (option.hasClass(ns.cls("no-value"))) {
                value = null;
            }
        }

        result.result = JsonSchema.validate(name, value, schema);
        result.data = value;

        return result;
    };

    defaults.collectors.number = function (name, field, schema) {
        var value, strValue = field.children("input").val();

        try {
            value = JSON.parse(strValue);
            return {result: JsonSchema.validate(name, value, schema), data: value};
        } catch (error) {
            return {
                result: priv.collectResult(false, "invalid format", {
                    error: error.toString()
                }),
                data: strValue
            };
        }
    };

    defaults.collectors.integer = defaults.collectors.number;

    defaults.collectors.boolean = function (name, field, schema) {
        var value = (field.children("input").attr("checked") === "checked");

        return {result: JsonSchema.validate(name, value, schema), data: value};
    };

    defaults.collectors.default_ = function (name, field, schema) {
        if (schema["enum"]) {
            return defaults.collectors.enum_(name, field, schema);
        }

        var value = field.children("input").val();

        return {result: JsonSchema.validate(name, value, schema), data: value};
    };


    priv.input = function (name, type, id, opts, required) {
        opts = opts || {};

        if (defaults.formatters[type]) {
            return defaults.formatters[type](name, type, id, opts, required);
        } else {
            return defaults.formatters.default_(name, type, id, opts, required);
        }
    };

    // return a list of classes for this field separated by sep (" " if not
    // provided)
    priv.genFieldClasses = function (fid, opts, sep, required) {
        var
            type = opts.type || getType(opts),
            classes = ["field", fid, type];

        if (required) {
            classes.push("required");
        }

        return ns.classesList(classes).join(sep || " ");
    };

    priv.genField = function (fid, opts, required) {
        var
            id = ns.id(fid),
            inputId = ns.id(fid + "-input"),
            type = opts.type || getType(opts);

        return {
            "div": {
                "id": id,
                "class": priv.genFieldClasses(fid, opts, " ", required),
                "$childs": [
                    priv.label(opts.title, inputId),
                    priv.input(fid, type, inputId, opts, required)
                ]
            }
        };
    };

    if (jopts.exportPrivates) {
        cons.priv = priv;
    }

    return cons;
}));
