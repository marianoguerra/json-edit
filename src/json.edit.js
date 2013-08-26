/*global window, define, alert, JSON, document*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery.lego', 'json.schema', 'nsgen'], function ($, legojs, JsonSchema, NsGen) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, legojs, JsonSchema, NsGen));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.jQuery, root.legojs, root.JsonSchema, root.NsGen);
    }
}(this, function ($, legojs, JsonSchema, NsGen) {
    "use strict";
    var cons, jopts, ns, prefix, defaults,
        priv = {}, escaper = document.createElement("textarea");

    defaults = {
        displayError: function (msg) {
            alert(msg);
        },
        displayWarning: function () {
            if (window.console && window.console.warn) {
                window.console.warn.apply(window.console, arguments);
            }
        },
        log: function () {
            if (window.console && window.console.log) {
                window.console.log.apply(window.console, arguments);
            }
        },
        msgs: {
            cantRemoveMinItems: "Can't remove item, minimum number reached",
            cantAddMaxItems: "Can't add item, maximum number reached"
        },
        // this is a map that has as keys the base types and then an object
        // that has as keys the hints of how the element should be formatted
        // this allows to "hint" json-edit on how to format and display a field
        // for example:
        // hintedFormatters.array.tags can have a function to enter an array
        // of tags in a different way as the standard one, the field used to
        // check for hints is je:hint
        hintedFormatters: {
        },
        // functions to call to format a given type of field, you can add your
        // own or modify the existing ones, if none matches
        // defaults.formatters.default_ is called.
        formatters: {
        },
        // this is a map that has as keys the base types and then an object
        // that has as keys the hints of how the element should be formatted
        // this allows to "hint" json-edit on how to format, display and
        // collect a field
        // for example:
        // hintedCollectors.array.tags can have a function to collect an array
        // of tags in a different way as the standard one, the field used to
        // check for hints is je:hint
        hintedCollectors: {
        },
        // function to call to collect the value for a given type of field, you can
        // add your own or modify the existing ones, if none matches
        // defaults.collectors.default_ is called
        collectors: {
        }
    };

    function ifNotSet(value, defaultValue) {
        if (value === null || value === undefined) {
            return defaultValue;
        } else {
            return value;
        }
    }

    if (window._jsonEditOpts) {
        jopts = window._jsonEditOpts;
    } else {
        jopts = {};
    }

    prefix = ifNotSet(jopts.prefix, "je");
    ns = NsGen.namespace(prefix);
    priv.ns = ns;

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

    priv.getKeys = function (obj, order) {
        if (order) {
            return order;
        } else {
            return $.map(obj, function (value, key) {
                return key;
            });
        }
    };

    // return true if there is nothing to config on val (that means
    // it's an empty object, or an array of empty objects etc.)
    priv.isEmptyConfig = function (val) {
        if (val.type === "object" &&
            (val.properties === undefined ||
             priv.getKeys(val.properties).length === 0)) {

            return true;
        } else if (val.type === "array" &&
                   val.items &&
                   priv.isEmptyConfig(val.items)) {
            return true;
        } else {
            return false;
        }
    };

    priv.genFields = function (order, schema, requiredFields, defaults, util) {
        order = priv.getKeys(schema, order);

        defaults = defaults || {};
        requiredFields = requiredFields || [];

        return $.map(order, function (item) {
            var
                newItemSchema,
                itemSchema = schema[item],
                required = $.inArray(item, requiredFields) !== -1;

            if (schema[item] === undefined) {
                throw new cons.Error("attribute not found on schema", {
                    "value": item,
                    "schema": schema
                });
            }

            if (defaults[item] !== undefined) {
                newItemSchema = $.extend({}, itemSchema, {"default": defaults[item]});
            } else {
                newItemSchema = itemSchema;
            }

            return priv.genField(item, newItemSchema, required, util);
        });
    };

    // return the value of the first prop (used to get the body of a legojs
    // tag)
    function firstProp(obj) {
        for (var key in obj) {
            return obj[key];
        }
    }

    cons = function (id, opts, fireRendered) {
        // if id is not a string assume it's a jquery object
        var container = (typeof id === "string") ? $("#" + id) : id,
            util = {}, lego, name = "root", renderedFired = false;

        // pass false to avoid firing the rendered event on this function,
        // in this case you have to explicitly call fireRendered on the
        // returned object when container is in the dom
        // pass true or any other non boolean value (such as undefined)
        // to fire it here
        if (typeof fireRendered !== "boolean") {
            fireRendered = true;
        }

        util.events = {};
        util.events.rendered = $.Callbacks();
        util.events.rendered.handleOnce = function (callback) {
            function handler() {
                callback.apply(null, arguments);
                util.events.rendered.remove(handler);
            }

            util.events.rendered.add(handler);
        };
        util.events.activated = $.Callbacks();
        util.events.array = {};
        util.events.array.item = {};
        // array_name, new_item_data, item_schema, other_data
        util.events.array.item.created = $.Callbacks();
        // array_name, removed_item_data, item_schema, other_data
        util.events.array.item.edited = $.Callbacks();
        // array_name, new_item_data, old_item_data, item_schema, other_data
        util.events.array.item.removed = $.Callbacks();

        lego = priv.input(name, ifNotSet(opts.type, "object"), id, opts, true, util);
        firstProp(lego)["class"] = priv.genFieldClasses("root", opts, " ", true);
        container.append($.lego(lego));

        function doFireRendered() {
            // if it's not already fired fire it
            if (!renderedFired) {
                util.events.rendered.fire(container, id, opts);
                renderedFired = true;
            }
        }

        if (fireRendered) {
            doFireRendered();
        }

        return {
            "collect": function () {
                return priv.collectField(name, container, opts);
            },
            "id": id,
            "opts": opts,
            "events": util.events,
            "fireRendered": doFireRendered,
            "getErrors": priv.getErrors
        };
    };

    priv.getErrors = function (result, errors) {
        var i, key;
        errors = errors || [];

        if (!result.ok) {
            if (result.isRoot) {
                errors.push(result.msg);
            }

            if ($.isArray(result.data)) {
                for (i = 0; i < result.data.length; i += 1) {
                    errors = errors.concat(priv.getErrors(result.data[i]));
                }
            } else {
                for (key in result.data) {
                    errors = errors.concat(priv.getErrors(result.data[key]));
                }
            }
        }

        return errors;
    };

    priv.collectResult = function (ok, msg, data, isRoot) {
        if (msg === undefined && ok) {
            msg = "ok";
        }

        if (data === undefined) {
            data = {};
        }

        if (isRoot === undefined) {
            isRoot = true;
        }

        return {
            ok: ok,
            msg: msg,
            data: (data === undefined) ? {} : data,
            isRoot: isRoot
        };
    };

    cons.escape = function (text) {
        if (escaper.innerText !== undefined) {
            escaper.innerText = text;
        } else {
            escaper.innerHTML = text;
        }

        return escaper.innerHTML;
    };

    cons.defaults = defaults;
    priv.collectObject = function (id, opts) {
        var
            // if can be already a jquery object if called from collectObject
            cont = (typeof id === "string") ? $("#" + id) : id,
            order = priv.getKeys(opts.properties, opts.order),
            defaultVals = ifNotSet(opts["default"], {}),
            result = priv.collectResult(true), data = {},

            apropsSel, aprops;

        $.each(order, function (i, key) {
            var
                value, newSchema,

                schema = opts.properties[key],
                required = $.inArray(key, schema.required) !== -1,
                selector = "." + priv.genFieldClasses(key, schema, ".", required),
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
                // if the object above has a default then override the item
                // default with it
                if (defaultVals[key] !== undefined) {
                    newSchema = $.extend({}, schema, {"default": defaultVals[key]});
                } else {
                    newSchema = schema;
                }

                value = priv.collectField(key, field, newSchema);
            }


            if (!value.result.ok) {
                result.ok = false;
                result.msg = "one or more errors in object fields";
                result.data[key] = value.result;
                result.isRoot = false;
            }

            data[key] = value.data;
        });

        if (opts.additionalProperties) {
            apropsSel = ns.$cls("object-additional-fields") + ">" +
                ns.$cls("additional-properties") + ">" +
                ns.$cls("additional-property");

            aprops = cont.find(apropsSel);

            aprops.each(function (i, prop) {
                var
                    $prop = $(prop),
                    name = $.trim($prop.children(ns.$cls("additional-propname")).val()),
                    $value = $prop.children(ns.$cls("additional-propvalue")),
                    value = priv.collectField(name, $value, opts.additionalProperties);

                // TODO: check for duplicated names and for invalid inputs
                data[name] = value.data;
            });
        }

        return {result: result, data: data};
    };

    priv.collectField = function (key, field, schema, ignoreHint) {
        var hint = schema['je:hint'], hints = defaults.hintedCollectors,
            type = ifNotSet(schema.type, getType(schema));

        if (!ignoreHint && hint && hints[type] && hints[type][hint]) {
            return hints[type][hint](key, field, schema, priv);
        } else if (defaults.collectors[type]) {
            return defaults.collectors[type](key, field, schema);
        } else {
            return defaults.collectors.default_(key, field, schema);
        }
    };

    cons.Error = function (reason, args) {
        this.reason = reason;
        this.args = args;
    };

    cons.makeResult = JsonSchema._makeResult;

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
        data = data || {type: 'button'};
        return makeClickable("button", label, onClick, data);
    }


    function makeLinkAction(label, onClick, data) {
        data = $.extend(true, {href: "#"}, data);

        return makeClickable("a", label, onClick, data);
    }

    function makeArrayItem(opts, name, type, id, schema, util) {
        var
            cont,
            input = priv.input(name, type, id, schema, true, util);

        // if it's just an input field
        if (input.input) {
            input.input["class"] = ifNotSet(input.input["class"], "") + " " + ns.cls("array-item-input");
        }

        function onRemoveClick(event) {
            var realMinItems = ifNotSet(opts.minItems, 0),
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

    function onAddItemClick(opts, id, i, name, util) {
        var
            items = $("#" + id + " " + ns.$cls("array-items")),
            item = makeArrayItem(
                opts,
                name,
                opts.items.type || getType(opts.items),
                id + "-" + i,
                opts.items,
                util);

        if (opts.maxItems && items.children().size() >= opts.maxItems) {
            defaults.displayError(defaults.msgs.cantAddMaxItems);
        } else {
            items.append($.lego(item));
        }
    }

    function onClearItemsClick(opts, id) {
        var realMinItems = ifNotSet(opts.minItems, 0),
            selectorItems = "#" + id + " " + ns.$cls("array-items"),
            selectorChildsToRemove = ":not(:lt(" + realMinItems + "))";

        $(selectorItems).children(selectorChildsToRemove).remove();
    }

    priv.genAdditionalProperties = function (objId, schema, util) {
        var
            id = objId + "-additional",
            contCls = ns.cls("additional-properties"),
            type = schema.type || getType(schema),
            propCls = ns.classes(["field", type, "additional-property"]),
            childs = [];


        function onAddClick() {
            var
                selector = "#" + id + ">." + contCls,
                props = $(selector),
                input = priv.input("additionalproperty", type, ns.id(id, true), schema, true, util),
                inputBody = firstProp(input);

            inputBody["class"] = ifNotSet(inputBody["class"], "") + " " + ns.cls("additional-propvalue");

            props.append($.lego({
                "div": {
                    "class": propCls,
                    "$childs": [
                        {
                            "input": {
                                "type": "text",
                                "class": ns.cls("additional-propname")
                            }
                        },
                        input
                    ]
                }
            }));

            util.events.rendered.fire();
        }

        childs.push({
            "div": {
                "class": ns.cls("add-additional-property"),
                "$childs": {
                    "button": {
                        "$click": onAddClick,
                        "$childs": "Add Property"
                    }
                }
            }
        });

        childs.push({
            "div": {
                "class": contCls,
                "$childs": ""
            }
        });

        return {
            "div": {
                "id": id,
                "class": ns.classes(["field", "object-additional-fields"]),
                "$childs": childs
            }
        };
    };

    defaults.formatters.object = function (name, type, id, opts, required, util) {
        var
            defaults = opts["default"] || {},
            classes = ["field", "object-fields"],
            childs;

        if (required) {
            classes.push("required");
        }

        childs = priv.genFields(opts.order, opts.properties, opts.required,
                                defaults, util);

        if (opts.description) {
            childs.unshift({
                "legend" : {
                    "$childs":  [opts.description]
                }
            });
        }
        if (opts.additionalProperties) {
            childs.push(priv.genAdditionalProperties(id, opts.additionalProperties,
                                                     util));
        }

        return {
            "div": {
                "id": id,
                "class": ns.classes(classes),
                "$childs": childs
            }
        };
    };

    defaults.formatters.array = function (name, type, id, opts, required, util) {
        var i, minItems, arrayChild, arrayChilds = [], select,
            defaultValues = opts["default"] || [], itemOpts;

        // if it has an items field and an enum field then the selection is
        // restricted to the values in the enum, display a select tag with
        // multiple option enabled
        if (opts.items && opts.items["enum"]) {
            select = defaults.formatters.enum_(name, opts.items.type, id, opts.items, true, util);

            select.select.multiple = "multiple";

            if (opts["default"]) {
                util.events.rendered.handleOnce(function () {
                    var defs = opts["default"];

                    $("#" + id + " option").filter(function (i, option) {
                        var jqOption = $(option);

                        if ($.inArray(jqOption.attr("value"), defs) !== -1) {
                            jqOption.attr("selected", "selected");
                        } else {
                            jqOption.removeAttr("selected");
                        }
                    });
                });
            }

            return select;
        } else {
            if (typeof opts.minItems !== "number") {
                minItems = 1;
            } else {
                minItems = opts.minItems;
            }

            // if there are more default values than minItems then use that size to
            // initialize the items
            if (defaultValues.length > minItems) {
                minItems = defaultValues.length;
            }

            for (i = 0; i < minItems; i += 1) {
                // default will be undefined if not set
                if (defaultValues[i]) {
                    itemOpts = $.extend({}, opts.items, {"default": defaultValues[i]});
                } else {
                    itemOpts = opts.items;
                }

                arrayChild = makeArrayItem(
                    opts,
                    name,
                    opts.items.type || getType(opts.items),
                    id + "-" + i,
                    itemOpts, util);

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
                                        onAddItemClick(opts, id, i, name, util);
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
        }
    };

    defaults.formatters.enum_ = function (name, type, id, opts, required, util) {
        var hasDefault = false, noValueOption,
            obj = {
                "select": {
                    "id": id,
                    "name": name,
                    "$childs": $.map(opts["enum"], function (item, index) {
                        var opt = {
                            "option": {
                                "id": id + "-" + index,
                                "value": item,
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


    defaults.formatters.default_ = function (name, type, id, opts, required, util) {

        if (opts["enum"]) {
            return defaults.formatters.enum_(name, type, id, opts, required, util);
        }

        var inputType = priv.inputTypes[type] || "text", min, max,
            obj = {
                "input": {
                    "id": id,
                    "$keyup": function (event) {
                        if (event.keyCode === 13) {
                            util.events.activated.fire(name, this);
                        }
                    },
                    "name": name,
                    "type": inputType
                }
            };

        if (opts["default"] !== undefined) {
            if (inputType === "checkbox") {
                if (opts["default"] === true) {
                    obj.input.checked = "checked";
                }
            } else {
                obj.input.value = opts["default"];
            }
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
        var children = field.children(ns.$cls("object-fields"));
        if (children.size() > 0) {
            return priv.collectObject(children, schema);
        } else {
            return priv.collectObject(field.children(".je-root"), schema);
        }
    };

    defaults.collectors.array = function (name, field, schema) {
        var
            result, arrayResult, castResult,

            defaults = schema["default"] || [],
            itemSchema = schema.items || {},
            errors = [],
            isRoot = true,
            ok = true,
            msg = "ok",
            data = [];

        if (schema.items && schema.items["enum"]) {
            data = field
                .find("option:selected")
                .map(function (index, item) {
                    return $(item).attr("value");
                })
                .toArray();

            castResult = priv.castToType(data, schema.items.type || "string");
            data = castResult.data;

            if (castResult.ok) {
                arrayResult = priv.validateJson(name, data, schema, false);
            } else {
                ok = false;
                msg = castResult.msg;

                // just to pass the if below in this function
                arrayResult = {ok: true};
            }

        } else {
            // relies on .array-item being the *great-grandchild* of the current field
            field.find("> * > * > " + ns.$cls("array-item")).each(function (i, node) {
                var newSchema, itemResult;

                // if the array above has a default then override the item
                // default with it
                if (defaults[i] !== undefined) {
                    newSchema = $.extend({}, itemSchema, {"default": defaults[i]});
                } else {
                    newSchema = itemSchema;
                }

                itemResult = priv.collectField(name, $(node), newSchema);

                if (!itemResult.result.ok) {
                    msg = "one or more errors in array items";
                    ok = false;
                    isRoot = false;
                    errors.push(itemResult);
                }

                data.push(itemResult.data);
            });

            arrayResult = priv.validateJson(name, data, schema, false);
        }

        if (!arrayResult.ok) {
            ok = false;
            msg = "one or more errors in array";
            errors.unshift(arrayResult);
        }

        return {result: priv.collectResult(ok, msg, errors, isRoot), data: data};
    };

    priv.getChildrenOrSelf = function (field, tag) {
        if (field.is(tag)) {
            return field;
        } else {
            return field.children(tag);
        }
    };

    defaults.collectors.enum_ = function (name, field, schema) {
        var
            select = priv.getChildrenOrSelf(field, "select"),
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

        // if there is no selection don't validate
        if (value !== null) {
            result.result = priv.validateJson(name, value, schema);
        } else {
            result.result = JsonSchema._makeResult(true);
        }

        result.data = value;

        return result;
    };

    defaults.collectors.number = function (name, field, schema) {
        var value, strValue = priv.getChildrenOrSelf(field, "input").val();

        try {
            value = JSON.parse(strValue);
            return {result: priv.validateJson(name, value, schema), data: value};
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
        var value = priv.getChildrenOrSelf(field, "input").prop("checked");

        return {result: priv.validateJson(name, value, schema), data: value};
    };

    priv.collectChildTag = function (selector, name, field, schema) {
        if (schema["enum"]) {
            return defaults.collectors.enum_(name, field, schema);
        }

        var value = priv.getChildrenOrSelf(field, selector).val();

        return {result: priv.validateJson(name, value, schema), data: value};
    };

    defaults.collectors.default_ = function (name, field, schema) {
        return priv.collectChildTag("input", name, field, schema);
    };

    priv.castSingleToType = function (data, type) {
        var value, ok = true, msg = "ok";

        switch (type) {
        case "integer":
        case "number":
        case "boolean":
            try {
                value = JSON.parse(data);
            } catch (error) {
                ok = false;
                msg = "error converting " + data + " to " + type;
            }
            break;
        case "string":
            value = data;
            break;
        default:
            ok = false;
            msg = "don't know how to convert '" + data + "' to " + type;
        }

        if (ok) {
            if (JsonSchema.isType(value, type)) {
                return priv.collectResult(ok, msg, value);
            } else {
                return priv.collectResult(false, "expected " + type + " got " + data, value);
            }
        } else {
            return priv.collectResult(ok, msg, value);
        }
    };

    // try converting data to type return a collect result object to signal
    // if all casts worked or not
    priv.castToType = function (data, type) {
        var i, result, newData = [];


        if ($.isArray(data)) {
            for (i = 0; i < data.length; i += 1) {
                result = priv.castSingleToType(data[i], type);

                if (result.ok) {
                    newData.push(result.data);
                } else {
                    return result;
                }
            }

            return priv.collectResult(true, "ok", newData);
        } else {
            return priv.castSingleToType(data, type);
        }
    };

    // format the given field according to its type without resolving hints
    priv.formatForType = function (name, type, id, opts, required, util) {
        if (defaults.formatters[type]) {
            return defaults.formatters[type](name, type, id, opts, required, util);
        } else {
            return defaults.formatters.default_(name, type, id, opts, required, util);
        }
    };

    priv.input = function (name, type, id, opts, required, util) {
        opts = opts || {};
        var hint = opts['je:hint'], hints = defaults.hintedFormatters;

        if (hint && hints[type] && hints[type][hint]) {
            return hints[type][hint](name, type, id, opts, required, priv, util);
        } else {
            return priv.formatForType(name, type, id, opts, required, util);
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

        if (opts["je:hint"]) {
            classes.push("hint-" + opts["je:hint"]);
        }

        return ns.classesList(classes).join(ifNotSet(sep, " "));
    };

    priv.hasOption = function (opts, optionName) {
        var options = opts["je:options"];

        if ($.isArray(options)) {
            return $.inArray(optionName, options) !== -1;
        } else if (typeof options === "string") {
            return options === optionName;
        } else {
            return false;
        }
    };

    priv.genField = function (fid, opts, required, util) {
        var
            id = ns.id(fid, true),
            inputId = ns.id(fid + "-input", true),
            type = opts.type || getType(opts),
            input = priv.input(fid, type, inputId, opts, required, util),
            result,
            $childs,
            firstChildClasses,
            labelText = ifNotSet(opts.title, fid),
            label = priv.label(labelText, inputId);

        if (false && opts.type === 'boolean') {
            label.label.$childs = [input, label.label.$childs];
            label.label["class"] = "checkbox";
            $childs = [label];
        } else {
            $childs = [
                label,
                input
            ];
        }

        result = {
            "div": {
                "id": id,
                "class": priv.genFieldClasses(fid, opts, " ", required),
                "$childs": $childs
            }
        };
        firstChildClasses = firstProp(input)["class"];
        if (firstChildClasses) {
            firstChildClasses = firstChildClasses.split(" ");
        }
        if (priv.hasOption(opts, "hide") ||
            (priv.hasOption(opts, "hideIfNoSelection") &&
             ((input.select && input.select.$childs.length === 1) ||
              (firstChildClasses &&
               firstChildClasses.indexOf("je-empty") !== -1)))) {

            result.div.style = "display: none";
        }

        return result;
    };

    priv.validateJson = function (name, value, schema, required) {
        var result = JsonSchema.validate(name, value, schema, required);

        return result;
    };

    cons.setHintForAllTypes = function (name, formatter, collector) {
        ["string", "number", "integer", "boolean", "array", "object"]
            .forEach(function (type) {
                if (!cons.defaults.hintedFormatters[type]) {
                    cons.defaults.hintedFormatters[type] = {};
                }

                if (!cons.defaults.hintedCollectors[type]) {
                    cons.defaults.hintedCollectors[type] = {};
                }

                cons.defaults.hintedCollectors[type][name] = collector;
                cons.defaults.hintedFormatters[type][name] = formatter;
            });
    };

    priv.loadCss = function (path, id) {
        var
            head = document.getElementsByTagName('head')[0],
            attrs = {
                type: 'text/css',
                href: path,
                rel: 'stylesheet',
                media: 'screen'
            };

        if (id) {
            attrs.id = id;
        }

        $(document.createElement('link'))
            .attr(attrs)
            .appendTo(head);
    };

    priv.loadJs = function (path, id) {
        var script = document.createElement("script");

        script.type = "text/javascript";
        script.src = path;

        if (id) {
            script.id = id;
        }

        $("head").append(script);
    };

    if (jopts.exportPrivates) {
        cons.priv = priv;
    }

    priv.escaper = document.createElement("textarea");
    priv.escapeHTML = function (text) {
        var escaper = priv.escaper;

        if (escaper.innerText !== undefined) {
            escaper.innerText = text;
        } else {
            escaper.innerHTML = text;
        }

        return escaper.innerHTML;
    };


    return cons;
}));
