/*global window jQuery*/
(function ($) {
    "use strict";
    var cons, jopts, priv = {}, nsgen, ns, prefix,
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
            cantAddMaxItems: "Can't add item, maximum number reached",
            err: {
                NOT_STRING: "should be of type string",
                EMPTY: "required but empty",
                INVALID_FORMAT: "doesn't match the required format",
                TOO_SMALL: "is too short",
                TOO_BIG: "is too long",
                NOT_IN_ENUM: "is not one of valid values",

                NOT_BOOLEAN: "should be true of false",

                NUM_TOO_SMALL: "is too small",
                NUM_TOO_BIG: "is too big",
                NOT_NUMBER: "should be a number",
                NOT_DIVISIBLE_BY: "should be divisible by" // TODO
            }
        },
        // functions to call to validate a given type of field, you can add your
        // own or modify the existing ones, if none matches
        // defaults.validators.default_ is called.
        validators: {
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
            classesList: dualVarArgs(function (suffixes) {
                return $.map(
                    suffixes,
                    function (suffix) {
                        return id(suffix, true);
                    }
                );
            }),
            // return a string with classes separated by spaces
            classes: function () {
                return this.classesList.apply(this, arguments).join(" ");
            },
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

    priv.getKeys = function (obj, order) {
        if (order) {
            return order;
        } else {
            return $.map(obj, function (value, key) {
                return key;
            });
        }
    };


    priv.genFields = function (order, schema) {
        order = priv.getKeys(schema, order);

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

        return {
            "collect": function () {
                return cons.collect(id, opts);
            },
            "id": id,
            "opts": opts
        };
    };

    cons.collectResult = function (ok, msg, data) {
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
            result = {ok: true, msg: "ok", data: {}};

        $.each(order, function (i, key) {
            var
                value,
                schema = opts.properties[key],
                selector = "." + priv.genFieldClasses(key, schema, "."),
                field = cont.children(selector);

            if (field.size() !== 1) {
                defaults.displayWarning("expected one item collecting",
                    field.size(), key, selector, cont, field);

                value = cons.collectResult(false,
                    "expected one item collecting", {
                        key: key,
                        size: field.size()
                    });

            } else {
                value = priv.collectField(key, field, schema);
            }

            if (!value.ok) {
                result.ok = false;
                result.msg = "one or more errors in object fields";
            }

            result.data[key] = value;
        });

        return result;
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

    function onAddItemClick(opts, id, i) {
        var
            items = $("#" + id + " " + ns.$cls("array-items")),
            item = makeArrayItem(
                opts,
                name,
                opts.items.type || "string",
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

    defaults.formatters.object = function (name, type, id, opts) {
        return {
            "div": {
                "id": id,
                "class": ns.classes("field", "object-fields"),
                "$childs": priv.genFields(opts.order, opts.properties)
            }
        };
    };

    defaults.formatters.array = function (name, type, id, opts) {
        var i, minItems, arrayChild, arrayChilds = [];

        minItems = opts.minItems || 1;

        for (i = 0; i < minItems; i += 1) {
            arrayChild = makeArrayItem(
                opts,
                name,
                opts.items.type || "string",
                id + "-" + i,
                opts.items);

            arrayChilds.push(arrayChild);
        }

        return {
            "div": {
                "id": id,
                "class": priv.genFieldClasses(name, opts),
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

    defaults.formatters.enum_ = function (name, type, id, opts) {
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

        if (!opts.required) {
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


    defaults.formatters.default_ = function (name, type, id, opts) {

        if (opts["enum"]) {
            return defaults.formatters.enum_(name, type, id, opts);
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

        if (opts.pattern) {
            obj.input.pattern = opts.pattern;
        }

        return obj;
    };

    priv.validate = function (name, value, schema) {
        if (defaults.validators[schema.type]) {
            return defaults.validators[schema.type](name, value, schema);
        } else {
            return defaults.validator.default_(name, value, schema);
        }
    };

    defaults.collectors.object = function (name, field, schema) {
        // get the inner child of the object container since collectors look
        // only in the first level childrens
        return cons.collect(field.children(ns.$cls("object-fields")), schema);
    };

    defaults.collectors.array = function (name, field, schema) {
        var itemSchema = schema.items || {};

        return field.find(ns.$cls("array-item")).map(function (i, node) {
            return priv.collectField(name, $(node), itemSchema);
        });
    };

    defaults.collectors.enum_ = function (name, field, schema) {
        var
            select = field.children("select"),
            option,
            value = select.val();

        // if the selected option is the "no-value" option then set value to null
        if (value === "") {
            option = select.find("option:selected");
            if (option.hasClass(ns.cls("no-value"))) {
                value = null;
            }
        }

        return priv.validate(name, value, schema);
    };

    defaults.collectors.default_ = function (name, field, schema) {
        if (schema["enum"]) {
            return defaults.collectors.enum_(name, field, schema);
        }

        var value = field.children("input").val();

        return priv.validate(name, value, schema);
    };

    defaults.validators.object = function (name, value, schema) {
        return cons.collectResult(true, "ok", value);
    };

    defaults.validators.array = function (name, value, schema) {
        return cons.collectResult(true, "ok", value);
    };

    defaults.validators.number = function (name, value, schema) {
        var
            size,
            errs = defaults.msgs.err,
            mResult = cons.collectResult;

        function failed(msg, data) {
            return mResult(false, "field '" + name + "' " + msg, data);
        }

        if (typeof value !== "number") {
            return failed(errs.NOT_NUMBER);
        }

        if (schema.minimum !== undefined) {
            if (schema.exclusiveMinimum) {
                size = schema.minimum + 1;
            } else {
                size = schema.minimum;
            }

            if (value < size) {
                return failed(errs.NUM_TOO_SMALL, {
                    minimum: schema.minimum
                });
            }
        }

        if (schema.maximum !== undefined) {
            if (schema.exclusiveMaximum) {
                size = schema.maximum - 1;
            } else {
                size = schema.maximum;
            }

            if (value > size) {
                return failed(errs.NUM_TOO_BIG, {
                    maximum: schema.maximum
                });
            }
        }

        if (!priv.checkEnum(value, schema)) {
            return failed(errs.NOT_IN_ENUM, {
                "enum": schema["enum"]
            });
        }

        if (schema.mod) {
            if ((value % schema.mod) !== 0) {
                return failed(errs.NOT_DIVISIBLE_BY, {
                    mod: schema.mod
                });
            }
        }

        return mResult(true);
    };

    defaults.validators.boolean = function (name, value, schema) {
        var
            errs = defaults.msgs.err,
            mResult = cons.collectResult;

        function failed(msg, data) {
            return mResult(false, "field '" + name + "' " + msg, data);
        }

        if (typeof value !== "boolean") {
            return failed(errs.NOT_BOOLEAN);
        }

        if (!priv.checkEnum(value, schema)) {
            return failed(errs.NOT_IN_ENUM, {
                "enum": schema["enum"]
            });
        }

        return mResult(true);
    };

    priv.checkEnum = function (value, schema) {
        var enum_, i;

        enum_ = schema["enum"];
        if (enum_) {
            for (i = 0; i < enum_.length; i += 1) {
                if (enum_[i] === value) {
                    return true;
                }
            }
        } else {
            return true;
        }

        return false;
    };

    defaults.validators.string = function (name, value, schema) {
        var
            size,
            regex,
            errs = defaults.msgs.err,
            mResult = cons.collectResult;

        function failed(msg, data) {
            return mResult(false, "field '" + name + "' " + msg, data);
        }

        if (typeof value !== "string") {
            return failed(errs.NOT_STRING);
        }

        if (schema.pattern) {
            regex = new RegExp(schema.pattern);

            if (!regex.test(value)) {
                return failed(errs.INVALID_FORMAT, {
                    pattern: schema.pattern
                });
            }
        }

        if (schema.minLength !== undefined) {
            if (schema.exclusiveMinimum) {
                size = schema.minLength + 1;
            } else {
                size = schema.minLength;
            }

            if (value.length < size) {
                return failed(errs.TOO_SMALL, {
                    minLength: schema.minLength
                });
            }
        } else if (schema.required && value === "") {
            return failed(errs.EMPTY);
        }

        if (schema.maxLength !== undefined) {
            if (schema.exclusiveMaximum) {
                size = schema.maxLength - 1;
            } else {
                size = schema.maxLength;
            }

            if (value.length > size) {
                return failed(errs.TOO_BIG, {
                    maxLength: schema.maxLength
                });
            }
        }

        if (!priv.checkEnum(value, schema)) {
            return failed(defaults.msgs.err.NOT_IN_ENUM, {
                "enum": schema["enum"]
            });
        }

        return mResult(true);
    };

    defaults.validators.default_ = function (name, value, schema) {
        return cons.collectResult(true, "ok", value);
    };

    priv.input = function (name, type, id, opts) {
        opts = opts || {};

        if (defaults.formatters[type]) {
            return defaults.formatters[type](name, type, id, opts);
        } else {
            return defaults.formatters.default_(name, type, id, opts);
        }
    };

    // return a list of classes for this field separated by sep (" " if not
    // provided)
    priv.genFieldClasses = function (fid, opts, sep) {
        var
            type = opts.type || "string",
            classes = ["field", fid, type];

        if (opts.required) {
            classes.push("required");
        }

        return ns.classesList(classes).join(sep || " ");
    };

    priv.genField = function (fid, opts) {
        var
            id = ns.id(fid),
            inputId = ns.id(fid + "-input"),
            type = opts.type || "string";

        return {
            "div": {
                "id": id,
                "class": priv.genFieldClasses(fid, opts),
                "$childs": [
                    priv.label(opts.title, inputId),
                    priv.input(fid, type, inputId, opts)
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

