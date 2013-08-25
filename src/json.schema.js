/*global window, define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonSchema = factory());
        });
    } else {
        // Browser globals
        root.JsonSchema = factory();
    }
}(this, function () {
    "use strict";
    var cons = {},
        // functions to call to validate a given type of field, you can add your
        // own or modify the existing ones, if none matches
        // validators.default_ is called.
        validators = {},
        priv = {}, deepEqual,
        objectKeys = typeof Object.keys === 'function' ? Object.keys
            : function (obj) {
                var key, keys = [];

                for (key in obj) {
                    keys.push(key);
                }

                return keys;
            };

    /* deepEqual adapted from https://github.com/substack/node-deep-equal/ */
    deepEqual = (function () {
        var pSlice = Array.prototype.slice,
            deepEqual,
            objEquiv;

        deepEqual = function (actual, expected) {
            // 7.1. All identical values are equivalent, as determined by ===.
            if (actual === expected) {
                return true;

            } else if (actual instanceof Date && expected instanceof Date) {
                return actual.getTime() === expected.getTime();

            // 7.3. Other pairs that do not both pass typeof value == 'object',
            // equivalence is determined by ==.
            } else if (typeof actual !== 'object' && typeof expected !== 'object') {
                return actual == expected;

            // 7.4. For all other Object pairs, including Array objects, equivalence is
            // determined by having the same number of owned properties (as verified
            // with Object.prototype.hasOwnProperty.call), the same set of keys
            // (although not necessarily the same order), equivalent values for every
            // corresponding key, and an identical 'prototype' property. Note: this
            // accounts for both named and indexed properties on Arrays.
            } else {
                return objEquiv(actual, expected);
            }
        };

        function isUndefinedOrNull(value) {
            return value === null || value === undefined;
        }

        function isArguments(object) {
            return Object.prototype.toString.call(object) === '[object Arguments]';
        }

        objEquiv = function (a, b) {
            var ka, kb, key, i;

            if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
                return false;
            }
            // an identical 'prototype' property.
            if (a.prototype !== b.prototype) {
                return false;
            }
            //~~~I've managed to break Object.keys through screwy arguments passing.
            //   Converting to array solves the problem.
            if (isArguments(a)) {
                if (!isArguments(b)) {
                    return false;
                }
                a = pSlice.call(a);
                b = pSlice.call(b);
                return deepEqual(a, b);
            }

            try {
                ka = objectKeys(a);
                kb = objectKeys(b);
            } catch (e) {//happens when one is a string literal and the other isn't
                return false;
            }
            // having the same number of owned properties (keys incorporates
            // hasOwnProperty)
            if (ka.length !== kb.length) {
                return false;
            }
            //the same set of keys (although not necessarily the same order),
            ka.sort();
            kb.sort();
            //~~~cheap key test
            for (i = ka.length - 1; i >= 0; i -= 1) {
                if (ka[i] !== kb[i]) {
                    return false;
                }
            }

            //equivalent values for every corresponding key, and
            //~~~possibly expensive deep test
            for (i = ka.length - 1; i >= 0; i -= 1) {
                key = ka[i];

                if (!deepEqual(a[key], b[key])) {
                    return false;
                }
            }

            return true;
        };

        return deepEqual;
    }());

    cons.msgs = {
        err: {
            NOT_STRING: "should be of type string",
            EMPTY: "required but empty",
            INVALID_FORMAT: "doesn't match the required format",
            TOO_SMALL: "is too short",
            TOO_BIG: "is too long",
            NOT_IN_ENUM: "is not one of valid values",

            UNKNOWN_TYPE: "unknown type",
            NOT_NULL: "should be null",
            NOT_ARRAY: "should be an array",
            NOT_BOOLEAN: "should be true of false",
            NOT_INTEGER: "should be an integer",
            NOT_OBJECT: "should be an object",

            ARRAY_TOO_SMALL: "is too small",
            ARRAY_TOO_BIG: "is too big",
            DUPLICATED_ITEMS: "has duplicated items",
            ADDITIONAL_ITEMS: "additional items present and not allowed",

            TOO_FEW_PROPERTIES: "has too few properties",
            TOO_MANY_PROPERTIES: "has too many properties",

            NUM_TOO_SMALL: "is too small",
            NUM_TOO_BIG: "is too big",
            NOT_NUMBER: "should be a number",
            NOT_DIVISIBLE_BY: "should be divisible by", // TODO

            ERRORS_IN_OBJ: "one or more errors in object field"
        }
    };

    // remove duplicated items in array using deepEqual to test for equality
    priv.unique = function (array) {
        var i, j, result = [], len = array.length;

        for (i = 0; i < len; i += 1) {
            for (j = i + 1; j < len; j += 1) {
                if (deepEqual(array[i], array[j])) {
                    i += 1;
                    j = i;
                }
            }

            result.push(array[i]);
        }

        return result;
    };

    cons.deepEqual = deepEqual;

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    cons.isType = function (value, type) {
        switch (type) {
        case "integer":
            return typeof value === "number" && (value % 1) === 0;
        case "number":
            return typeof value === "number";
        case "boolean":
            return typeof value === "boolean";
        case "string":
            return typeof value === "string";
        case "array":
            return isArray(value);
        default:
            throw "don't know how to check for type " + type;
        }
    };

    cons.validate = function (name, value, schema, required) {
        required = (required === true);

        if (validators[schema.type]) {
            return validators[schema.type](name, value, schema, required);
        } else {
            return validators.default_(name, value, schema, required);
        }
    };

    validators.object = function (name, value, schema, required) {
        var
            i, key, requiredKeys, keyRequired, result,
            ok = true,
            msg = "ok",
            data = {},
            isRoot = true,
            errs = cons.msgs.err,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "Field '" + name + "' " + msg, data);
        }

        if (typeof value !== "object" || value === null || isArray(value)) {
            return failed(errs.NOT_OBJECT);
        }

        if (typeof schema.minProperties === "number" && objectKeys(value).length < schema.minProperties) {
            return failed(errs.TOO_FEW_PROPERTIES);
        }

        if (typeof schema.maxProperties === "number" && objectKeys(value).length > schema.maxProperties) {
            return failed(errs.TOO_MANY_PROPERTIES);
        }

        function inArray(needle, items) {
            var i = 0;

            for (i = 0; i < items.length; i += 1) {
                if (needle === items[i]) {
                    return i;
                }
            }

            return -1;
        }

        if (schema.properties) {
            requiredKeys = schema.required || [];

            for (key in schema.properties) {
                if (schema.properties.hasOwnProperty(key)) {
                    keyRequired = (inArray(key, requiredKeys) !== -1);

                    if (value[key] === undefined && !keyRequired) {
                        continue;
                    }

                    result = cons.validate(key, value[key], schema.properties[key], keyRequired);

                    if (!result.ok) {
                        ok = false;
                        msg = errs.ERRORS_IN_OBJ;
                        data[key] = result;
                        isRoot = false;
                    }
                }
            }
        }

        return mResult(ok, msg, data, isRoot);
    };

    validators.array = function (name, value, schema, required) {
        var
            result,
            offset,
            size,
            errs = cons.msgs.err,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "Field '" + name + "' " + msg, data);
        }

        if (!isArray(value)) {
            return failed(cons.msgs.err.NOT_ARRAY);
        }

        if (schema.minItems !== undefined) {
            size = schema.minItems;

            if (value.length < size) {
                return failed(errs.ARRAY_TOO_SMALL, {
                    minItems: schema.minItems
                });
            }
        } else if (required && value === "") {
            return failed(errs.EMPTY);
        }

        if (schema.maxItems !== undefined) {
            size = schema.maxItems;

            if (value.length > size) {
                return failed(errs.ARRAY_TOO_BIG, {
                    maxItems: schema.maxItems
                });
            }
        }

        if (schema.uniqueItems) {
            // if the number of items of the original array is different
            // from the number of items of the array with duplicated values
            // removed then it has non unique items
            if (value.length !== priv.unique(value).length) {
                return failed(errs.DUPLICATED_ITEMS);
            }
        }

        function checkTupleTyping(schemas, items) {
            var i, itemSchema, item, result;
            for (i = 0; i < schemas.length; i += 1) {
                itemSchema = schemas[i];
                item = items[i];

                result = cons.validate(name + " " + (i + 1), item, itemSchema, false);

                if (!result.ok) {
                    return result;
                }
            }

            return result;
        }

        function checkItemSchema(schema, items, indexOffset) {
            var i, result = priv.makeResult(true), item;

            // can pass a value to add to the index other than 1, in case we
            // are checking additional items
            indexOffset = indexOffset || 1;

            for (i = 0; i < items.length; i += 1) {
                item = items[i];

                result = cons.validate(name + " " + (i + indexOffset), item,
                                       schema, false);

                if (!result.ok) {
                    return result;
                }
            }

            return result;
        }

        if (schema.items) {
            if (isArray(schema.items)) {
                result = checkTupleTyping(schema.items, value);

                // return now if it failed
                if (!result.ok) {
                    return result;
                }

                if (typeof schema.additionalItems === "boolean") {
                    // if additionalItems is false and the array has more items
                    // than the schema (tuple typing) then the check fails
                    if (!schema.additionalItems && schema.items.length < value.length) {
                        return failed(errs.ADDITIONAL_ITEMS);
                    }
                } else if (schema.additionalItems) {
                    // if not a boolean then it's a schema, check the
                    // additional items against the schema
                    offset = schema.items.length;
                    result = checkItemSchema(schema.additionalItems, value.slice(offset), offset + 1);
                }

            } else {
                result = checkItemSchema(schema.items, value);
            }

            if (!result.ok) {
                return result;
            }
        } else if (schema.additionalItems && typeof schema.additionalItems !== "boolean") {
            result = checkItemSchema(schema.additionalItems, value);

            if (!result.ok) {
                return result;
            }
        }

        return priv.makeResult(true, "ok", value);
    };

    validators["null"] = function (name, value, schema, required) {
        if (value === null) {
            return priv.makeResult(true, "ok", value);
        } else {
            return priv.makeResult(false, "Field '" + name + "' " +
                cons.msgs.err.NOT_NULL, {});
        }
    };

    priv.makeResult = function (ok, msg, data, isRoot) {
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

    validators.integer = function (name, value, schema, required) {
        var
            notInteger = cons.msgs.err.NOT_INTEGER,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "Field '" + name + "' " + msg, data);
        }

        if (typeof value === "number" && (value % 1) !== 0) {
            return failed(notInteger);
        } else {
            return validators.number(name, value, schema, required, notInteger);
        }
    };

    validators.number = function (name, value, schema, required, notType) {
        var
            size,
            errs = cons.msgs.err,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "Field '" + name + "' " + msg, data);
        }

        if (typeof value !== "number") {
            return failed(notType || errs.NOT_NUMBER);
        }

        if (schema.minimum !== undefined) {
            size = schema.minimum;

            if (schema.exclusiveMinimum) {
                if (value <= size) {
                    return failed(errs.NUM_TOO_SMALL, {
                        minimum: size
                    });
                }
                size = schema.minimum + 1;
            } else {
                if (value < size) {
                    return failed(errs.NUM_TOO_SMALL, {
                        minimum: size
                    });
                }
            }

        }

        if (schema.maximum !== undefined) {
            size = schema.maximum;

            if (schema.exclusiveMaximum) {
                if (value >= size) {
                    return failed(errs.NUM_TOO_BIG, {
                        maximum: size
                    });
                }
            } else {
                if (value > size) {
                    return failed(errs.NUM_TOO_BIG, {
                        maximum: size
                    });
                }
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

    validators.boolean = function (name, value, schema, required) {
        var
            errs = cons.msgs.err,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "Field '" + name + "' " + msg, data);
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

    validators.string = function (name, value, schema, required) {
        var
            size,
            regex,
            errs = cons.msgs.err,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "Field '" + name + "' " + msg, data);
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
            size = schema.minLength;

            if (value.length < size) {
                return failed(errs.TOO_SMALL, {
                    minLength: schema.minLength
                });
            }
        } else if (required && value === "") {
            return failed(errs.EMPTY);
        }

        if (schema.maxLength !== undefined) {
            size = schema.maxLength;

            if (value.length > size) {
                return failed(errs.TOO_BIG, {
                    maxLength: schema.maxLength
                });
            }
        }

        if (!priv.checkEnum(value, schema)) {
            return failed(cons.msgs.err.NOT_IN_ENUM, {
                "enum": schema["enum"]
            });
        }

        return mResult(true);
    };

    validators.default_ = function (name, value, schema, required) {
        return priv.makeResult(false, cons.msgs.err.UNKNOWN_TYPE, value);
    };

    cons._makeResult = priv.makeResult;

    return cons;
}));
