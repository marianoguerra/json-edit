/*global window*/
(function () {
    "use strict";
    var cons = {},
        // functions to call to validate a given type of field, you can add your
        // own or modify the existing ones, if none matches
        // validators.default_ is called.
        validators = {},
        priv = {}, deepEqual;


    /* deepEqual adapted from https://github.com/substack/node-deep-equal/ */
    deepEqual = (function () {
        var pSlice = Array.prototype.slice,
            object_keys = typeof Object.keys === 'function'
                ? Object.keys
                : function (obj) {
                    var key, keys = [];

                    for (key in obj) {
                        keys.push(key);
                    }

                    return keys;
                },
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
                ka = object_keys(a);
                kb = object_keys(b);
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

            ARRAY_TOO_SMALL: "is too small",
            ARRAY_TOO_BIG: "is too big",
            DUPLICATED_ITEMS: "has duplicated items",

            NUM_TOO_SMALL: "is too small",
            NUM_TOO_BIG: "is too big",
            NOT_NUMBER: "should be a number",
            NOT_DIVISIBLE_BY: "should be divisible by" // TODO
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

    cons.validate = function (name, value, schema, required) {
        required = (required === true);

        if (validators[schema.type]) {
            return validators[schema.type](name, value, schema, required);
        } else {
            return validators.default_(name, value, schema, required);
        }
    };

    validators.object = function (name, value, schema, required) {
        return priv.makeResult(true, "ok", value);
    };

    validators.array = function (name, value, schema, required) {
        var
            size,
            errs = cons.msgs.err,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "field '" + name + "' " + msg, data);
        }

        if (Object.prototype.toString.call(value) !== '[object Array]') {
            return failed(cons.msgs.err.NOT_ARRAY);
        }

        if (schema.minItems !== undefined) {
            if (schema.exclusiveMinimum) {
                size = schema.minItems + 1;
            } else {
                size = schema.minItems;
            }

            if (value.length < size) {
                return failed(errs.ARRAY_TOO_SMALL, {
                    minItems: schema.minItems
                });
            }
        } else if (required && value === "") {
            return failed(errs.EMPTY);
        }

        if (schema.maxItems !== undefined) {
            if (schema.exclusiveMaximum) {
                size = schema.maxItems - 1;
            } else {
                size = schema.maxItems;
            }

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

        return priv.makeResult(true, "ok", value);
    };

    validators["null"] = function (name, value, schema, required) {
        if (value === null) {
            return priv.makeResult(true, "ok", value);
        } else {
            return priv.makeResult(false, "field '" + name + "' " +
                cons.msgs.err.NOT_NULL, {});
        }
    };

    priv.makeResult = function (ok, msg, data) {
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

    validators.integer = function (name, value, schema, required) {
        var
            notInteger = cons.msgs.err.NOT_INTEGER,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "field '" + name + "' " + msg, data);
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
            return mResult(false, "field '" + name + "' " + msg, data);
        }

        if (typeof value !== "number") {
            return failed(notType || errs.NOT_NUMBER);
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

    validators.boolean = function (name, value, schema, required) {
        var
            errs = cons.msgs.err,
            mResult = priv.makeResult;

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

    validators.string = function (name, value, schema, required) {
        var
            size,
            regex,
            errs = cons.msgs.err,
            mResult = priv.makeResult;

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
        } else if (required && value === "") {
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
            return failed(cons.msgs.err.NOT_IN_ENUM, {
                "enum": schema["enum"]
            });
        }

        return mResult(true);
    };

    validators.default_ = function (name, value, schema, required) {
        return priv.makeResult(false, cons.msgs.err.UNKNOWN_TYPE, value);
    };

    window.JsonSchema = cons;
    return cons;
}());
