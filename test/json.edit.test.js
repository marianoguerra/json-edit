/*global jsonEdit test ok equal deepEqual module*/
(function () {
    "use strict";
    var je = jsonEdit, priv = je.priv, ns = priv.ns, defaults = je.defaults;
    window.priv = priv;
    module("json edit");

    function hasClass(obj, cls) {
        return $.inArray(cls, obj["class"].split()) !== -1;
    }

    test("constructor exists", function () {
        ok($.isFunction(je), "json edit constructor exists and is a function");
    });

    test("privates are exported for test", function () {
        ok(priv, "private functions are exported for testing");
    });

    test("generate simple label", function () {
        deepEqual(priv.label("Name", "asd"), {
            "label": {
                "for": "asd",
                "$childs": "Name"
            }
        });
    });

    test("generate simple input", function () {
        deepEqual(priv.input("fieldname", "string", "asd"), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname"
            }
        });

        deepEqual(priv.input("fieldname", "string", "asd", {"default": "foo"}), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo"
            }
        });

        deepEqual(priv.input("fieldname", "string", "asd", {"default": "foo", "required": true}), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo",
                "required": true
            }
        });

        deepEqual(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "required": true,
                "maxLength": 10
            }),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "required": true,
                "maxLength": 10,
                "description": "the asd field"
            }),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10,
                    "title": "the asd field"
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "required": true,
                "maxLength": 10,
                "description": "the asd field",
                "pattern": "[1-9]+"
            }),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10,
                    "title": "the asd field",
                    "pattern": "[1-9]+"
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "number", "asd", {
                "type": "number",
                "maximum": 20,
                "minimum": 10
            }),
            {
                "input": {
                    "id": "asd",
                    "name": "fieldname",
                    "type": "number",
                    "max": 20,
                    "min": 10
                }
            }
        );

        deepEqual(
            priv.input("fieldname", "number", "asd", {
                "type": "number",
                "maximum": 20,
                "minimum": 10,
                "exclusiveMaximum": true,
                "exclusiveMinimum": true
            }),
            {
                "input": {
                    "id": "asd",
                    "name": "fieldname",
                    "type": "number",
                    "max": 19,
                    "min": 11
                }
            }
        );
    });

    function checkInputType(type, expectedType) {
        deepEqual(
            priv.input("foo", type, "asd", {}),
            {
                "input": {
                    "id": "asd",
                    "name": "foo",
                    "type": expectedType
                }
            }
        );
    }

    test("input field type respect type", function () {
        var check = checkInputType;

        check("string", "text");
        check("number", "number");
        check("integer", "number");
        check("boolean", "checkbox");

        check("any", "text");
    });

    function checkGeneratedField(field, id, title, startIndex, classes, opts) {
        var
            divId = "je-" + id + "-" + startIndex,
            inputId = "je-" + id + "-input-" + (startIndex + 1);

        deepEqual(field, {
            "div": {
                "id": divId,
                "class": classes,
                "$childs": [
                    // this should be tested separetely so we trust they work
                    priv.label(title, inputId),
                    priv.input(id, opts.type, inputId, opts)
                ]
            }
        });
    }

    function checkField(opts, classes) {
        priv.ns._reset();

        var field = priv.genField("name", opts);
        checkGeneratedField(field, "name", "Name", 0, classes, opts);
    }

    test("generate simple string field", function () {
        checkField({
            "type": "string",
            "name": "asd",
            "title": "Name"
        }, "je-field je-name je-string");

        checkField({
            "type": "number",
            "name": "asd",
            "title": "Name",
            "required": true
        }, "je-field je-name je-number je-required");
    });

    test("fields are generated in order", function () {
        var
            nameOpts = {
                "type": "string",
                "name": "name",
                "title": "Name"
            },
            ageOpts = {
                "type": "number",
                "title": "Age",
                "name": "age"
            },
            fields;

        priv.ns._reset();

        fields = priv.genFields(["name", "age"], {
            "name": nameOpts,
            "age": ageOpts
        });

        checkGeneratedField(fields[0], "name", "Name", 0, "je-field je-name je-string", nameOpts);
        checkGeneratedField(fields[1], "age", "Age", 5, "je-field je-age je-number", ageOpts);
    });

    test("error is thrown if order item is not in schema", function () {
        try {
            priv.genFields(["foo"], {"bar": {}});
            ok(false, "should throw an exception");
        } catch (error) {
            equal(error.args.value, "foo", "ofending attribute should be foo");
            equal(error.reason, "attribute not found on schema", "correct message should be set");
        }
    });

    test("schemas for array", function () {
        var arrCont, arrItems, field;
        priv.ns._reset();

        field = priv.genField("numbers", {
            "type": "array",
            "title": "Nums",
            "items": {
                "type": "number"
            }
        });

        equal(field.div.id, priv.ns.id("numbers", false, 0));
        equal(field.div["class"], priv.ns.classes("field", "numbers", "array"));
        ok(field.div.$childs[0].label);
        ok(field.div.$childs[1].div);
        arrCont = field.div.$childs[1].div;

        equal(arrCont["class"], ns.classes("field", "numbers", "array"));
        equal(arrCont.$childs.length, 2);
        equal(arrCont.$childs[0].div["class"], ns.cls("array-items"));
        equal(arrCont.$childs[1].div["class"], ns.cls("array-actions"));

        equal(arrCont.$childs[0].div["class"], ns.cls("array-items"));

        arrItems = arrCont.$childs[0].div;

        equal(arrItems.$childs.length, 1);
        equal(arrItems.$childs[0].div["class"], ns.cls("array-item"));
        ok(arrItems.$childs[0].div.$childs[0].input);
    });

    test("enum turns item into selection", function () {
        var field = priv.genField("color", {
            "type": "string",
            "enum": ["red", "green", "blue"]
        });

        ok(field.div);
        equal(field.div.$childs.length, 2);
        ok(field.div.$childs[1].select);
        equal(field.div.$childs[1].select.$childs.length, 4);
        equal(field.div.$childs[1].select.$childs[0].option.$childs, "");
        equal(field.div.$childs[1].select.$childs[1].option.$childs, "red");

        field = priv.genField("color", {
            "type": "string",
            "required": true,
            "enum": ["red", "green", "blue"]
        });

        equal(field.div.$childs[1].select.$childs[0].option.$childs, "red");

    });

    test("nested objects", function () {

        var childs, field = priv.genField("object", {
            "type": "object",
            "title": "Location",
            "order": ["city", "state", "country"],
            "properties": {
                "city": {
                    "type": "string",
                    "title": "City"
                },
                "state": {
                    "type": "string",
                    "title": "State"
                },
                "country": {
                    "type": "string",
                    "title": "Country"
                }
            }
        });

        equal(field.div.$childs[1].div.$childs.length, 3);
        childs = field.div.$childs[1].div.$childs;

        ok(childs[0].div.$childs[0].label);
        ok(childs[0].div.$childs[1].input);
        equal(childs[0].div.$childs[0].label.$childs, "City");

        ok(childs[1].div.$childs[0].label);
        ok(childs[1].div.$childs[1].input);
        equal(childs[1].div.$childs[0].label.$childs, "State");

        ok(childs[2].div.$childs[0].label);
        ok(childs[2].div.$childs[1].input);
        equal(childs[2].div.$childs[0].label.$childs, "Country");
    });

    module("json edit validate");

    test("validate string", function () {
        var validate = priv.validate, result,
            errs = defaults.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "field '" + name + "' " + msgCheck);
            }

            return result;
        }

        checkValidation("foo", {type: "string"}, true);
        checkValidation("foo", {type: "string", required: true}, true);
        checkValidation("foo", {type: "string", required: false}, true);

        checkValidation("", {type: "string", required: true}, false, "foo", errs.EMPTY);
        checkValidation(null, {type: "string", required: true}, false, "foo", errs.NOT_STRING);

        checkValidation("1", {type: "string", pattern: "[0-9]+"}, true);
        checkValidation("12", {type: "string", pattern: "[0-9]+"}, true);
        checkValidation("0002353645612", {type: "string", pattern: "[0-9]+"}, true);

        checkValidation("", {type: "string", pattern: "[0-9]+"}, false, "num", errs.INVALID_FORMAT);
        checkValidation("a", {type: "string", pattern: "[0-9]+"}, false, "num", errs.INVALID_FORMAT);
        // because it's not from start to end
        checkValidation("a1", {type: "string", pattern: "[0-9]+"}, true);
        checkValidation("a1", {type: "string", pattern: "^[0-9]+$"}, false, "num", errs.INVALID_FORMAT);
        checkValidation("1a", {type: "string", pattern: "^[0-9]+$"}, false, "num", errs.INVALID_FORMAT);

        checkValidation("", {type: "string", minLength: 0}, true);
        checkValidation("", {type: "string", minLength: 0, required: true}, true);

        checkValidation("a", {type: "string", minLength: 1}, true);
        checkValidation("aasda", {type: "string", minLength: 1}, true);
        checkValidation("a", {type: "string", minLength: 1, required: true}, true);

        checkValidation("", {type: "string", minLength: 1}, false, "name", errs.TO_SMALL);
        checkValidation("", {type: "string", minLength: 0, exclusiveMinimum: true}, false, "name", errs.TO_SMALL);
        checkValidation("a", {type: "string", minLength: 2}, false, "name", errs.TO_SMALL);
        checkValidation("a", {type: "string", minLength: 1, exclusiveMinimum: true}, false, "name", errs.TO_SMALL);

        checkValidation("", {type: "string", maxLength: 0}, true);
        checkValidation("", {type: "string", maxLength: 0, required: true}, false, errs.EMPTY);

        checkValidation("a", {type: "string", maxLength: 1}, true);
        checkValidation("", {type: "string", maxLength: 1}, true);
        checkValidation("a", {type: "string", maxLength: 1, required: true}, true);

        checkValidation("aa", {type: "string", maxLength: 1}, false, "name", errs.TO_BIG);
        checkValidation("aa", {type: "string", maxLength: 2, exclusiveMaximum: true}, false, "name", errs.TO_BIG);
        checkValidation("a", {type: "string", maxLength: 0}, false, "name", errs.TO_BIG);
        checkValidation("a", {type: "string", maxLength: 1, exclusiveMaximum: true}, false, "name", errs.TO_BIG);

        checkValidation("a", {type: "string", "enum": ['a']}, true);
        checkValidation("b", {type: "string", "enum": ['a', 'b']}, true);
        checkValidation("c", {type: "string", "enum": ['a', 'b']}, false, errs.NOT_IN_ENUM);
    });

    test("validate number", function () {
        var validate = priv.validate, result,
            errs = defaults.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "field '" + name + "' " + msgCheck);
            }

            return result;
        }

        checkValidation(12, {type: "number"}, true);
        checkValidation(12.3, {type: "number"}, true);
        checkValidation("12", {type: "number"}, false, "num", errs.NOT_NUMBER);
        checkValidation(null, {type: "number"}, false, "num", errs.NOT_NUMBER);
        checkValidation(null, {type: "number"}, false, "num", errs.NOT_NUMBER);

        checkValidation(0, {type: "number", minimum: 0}, true);
        checkValidation(1, {type: "number", minimum: 0, exclusiveMinimum: true}, true);

        checkValidation(0, {type: "number", minimum: 1}, false, "num", errs.NUM_TOO_SMALL);
        checkValidation(0, {type: "number", minimum: 0, exclusiveMinimum: true}, false, "num", errs.NUM_TOO_SMALL);

        checkValidation(1, {type: "number", minimum: 2}, false, "num", errs.NUM_TOO_SMALL);
        checkValidation(1, {type: "number", minimum: 1, exclusiveMinimum: true}, false, "num", errs.NUM_TOO_SMALL);

        checkValidation(0, {type: "number", maximum: 0}, true);
        checkValidation(1, {type: "number", maximum: 2, exclusiveMaximum: true}, true);

        checkValidation(3, {type: "number", maximum: 1}, false, "num", errs.NUM_TOO_BIG);
        checkValidation(2, {type: "number", maximum: 0, exclusiveMaximum: true}, false, "num", errs.NUM_TOO_BIG);

        checkValidation(3, {type: "number", maximum: 2}, false, "num", errs.NUM_TOO_BIG);
        checkValidation(2, {type: "number", maximum: 1, exclusiveMaximum: true}, false, "num", errs.NUM_TOO_BIG);

        checkValidation(3, {type: "number", "enum": [3]}, true);
        checkValidation(3, {type: "number", "enum": [2, 3]}, true);

        checkValidation(3, {type: "number", "enum": []}, false, "num", errs.NOT_IN_ENUM);
        checkValidation(3, {type: "number", "enum": [1, 2]}, false, "num", errs.NOT_IN_ENUM);

        checkValidation(42, {type: "number", mod: 2}, true);
        checkValidation(42, {type: "number", mod: 9}, false, "num", errs.NOT_DIVISIBLE_BY);
    });

    test("validate boolean", function () {
        var validate = priv.validate, result,
            errs = defaults.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "field '" + name + "' " + msgCheck);
            }

            return result;
        }

        checkValidation(true, {type: "boolean"}, true);
        checkValidation(false, {type: "boolean"}, true);
        checkValidation(0, {type: "boolean"}, false, "check", errs.NOT_BOOLEAN);
        checkValidation(1, {type: "boolean"}, false, "check", errs.NOT_BOOLEAN);
        checkValidation("", {type: "boolean"}, false, "check", errs.NOT_BOOLEAN);

        checkValidation(true, {type: "boolean", "enum": [true]}, true);
        checkValidation(true, {type: "boolean", "enum": [false, true]}, true);
        checkValidation(false, {type: "boolean", "enum": [false]}, true);
        checkValidation(false, {type: "boolean", "enum": [false, true]}, true);

        checkValidation(false, {type: "boolean", "enum": [true]}, false, "check", errs.NOT_IN_ENUM);
    });

    /*
    test("", function () {
    });
    */
}());
