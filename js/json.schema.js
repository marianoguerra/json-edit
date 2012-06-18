/*global window*/
(function () {
    "use strict";
    var cons = {},
        // functions to call to validate a given type of field, you can add your
        // own or modify the existing ones, if none matches
        // validators.default_ is called.
        validators = {},
        priv = {};

    cons.msgs = {
        err: {
            NOT_STRING: "should be of type string",
            EMPTY: "required but empty",
            INVALID_FORMAT: "doesn't match the required format",
            TOO_SMALL: "is too short",
            TOO_BIG: "is too long",
            NOT_IN_ENUM: "is not one of valid values",

            NOT_NULL: "should be null",
            NOT_BOOLEAN: "should be true of false",
            NOT_INTEGER: "should be an integer",

            NUM_TOO_SMALL: "is too small",
            NUM_TOO_BIG: "is too big",
            NOT_NUMBER: "should be a number",
            NOT_DIVISIBLE_BY: "should be divisible by" // TODO
        }
    };

    cons.validate = function (name, value, schema) {
        if (validators[schema.type]) {
            return validators[schema.type](name, value, schema);
        } else {
            return validators.default_(name, value, schema);
        }
    };

    validators.object = function (name, value, schema) {
        return priv.makeResult(true, "ok", value);
    };

    validators.array = function (name, value, schema) {
        return priv.makeResult(true, "ok", value);
    };

    validators["null"] = function (name, value, schema) {
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


    validators.integer = function (name, value, schema) {
        var
            notInteger = cons.msgs.err.NOT_INTEGER,
            mResult = priv.makeResult;

        function failed(msg, data) {
            return mResult(false, "field '" + name + "' " + msg, data);
        }

        if (typeof value === "number" && (value % 1) !== 0) {
            return failed(notInteger);
        } else {
            return validators.number(name, value, schema, notInteger);
        }
    };

    validators.number = function (name, value, schema, notType) {
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

    validators.boolean = function (name, value, schema) {
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

    validators.string = function (name, value, schema) {
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
            return failed(cons.msgs.err.NOT_IN_ENUM, {
                "enum": schema["enum"]
            });
        }

        return mResult(true);
    };

    validators.default_ = function (name, value, schema) {
        return priv.makeResult(true, "ok", value);
    };

    window.JsonSchema = cons;
    return cons;
}());
