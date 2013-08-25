/*global require module test deepEqual ok equal*/
require.config({
    baseUrl: "../js/",
    paths: {
        "json": "http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2",
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
        "qunit": "http://code.jquery.com/qunit/qunit-git",
        "legoparser": "http://marianoguerra.github.com/legojs/src/legoparser",
        "jquery.lego": "http://marianoguerra.github.com/legojs/src/jquery.lego",
        "json.edit": "../src/json.edit",
        "json.schema": "../src/json.schema",
        "nsgen": "../src/nsgen"
    },

    shim: {
        json: {
            exports: "JSON"
        },
        jquery: {
            exports: "jQuery"
        },
        qunit: {
            exports: "QUnit"
        }
    }
});

require(["json.edit", "json.schema", "jquery", "qunit", "json"], function (jsonEdit, JsonSchema, $, QUnit, JSON) {
    "use strict";
    var je = jsonEdit, priv = je.priv, ns = priv.ns, defaults = je.defaults;
    window.priv = priv;
    module("json edit");

    function hasClass(obj, cls) {
        return $.inArray(cls, obj["class"].split()) !== -1;
    }

    function deepEqualNoKey(objA, objB, name) {
        delete objA[name].$keyup;

        deepEqual(objA, objB);
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
        deepEqualNoKey(priv.input("fieldname", "string", "asd"), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname"
            }
        }, "input");

        deepEqualNoKey(priv.input("fieldname", "string", "asd", {"default": "foo"}), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo"
            }
        }, "input");

        deepEqualNoKey(priv.input("fieldname", "string", "asd", {"default": "foo"}, true), {
            "input": {
                "id": "asd",
                "type": "text",
                "name": "fieldname",
                "value": "foo",
                "required": true
            }
        }, "input");

        deepEqualNoKey(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "maxLength": 10
            }, true),
            {
                "input": {
                    "id": "asd",
                    "type": "text",
                    "name": "fieldname",
                    "value": "foo",
                    "required": true,
                    "maxlength": 10
                }
            }, "input");

        deepEqualNoKey(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "maxLength": 10,
                "description": "the asd field"
            }, true),
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
            }, "input"
        );

        deepEqualNoKey(
            priv.input("fieldname", "string", "asd", {
                "default": "foo",
                "maxLength": 10,
                "description": "the asd field",
                "pattern": "[1-9]+"
            }, true),
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
            }, "input"
        );

        deepEqualNoKey(
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
            }, "input"
        );

        deepEqualNoKey(
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
            }, "input"
        );
    });

    function checkInputType(type, expectedType) {
        deepEqualNoKey(
            priv.input("foo", type, "asd", {}),
            {
                "input": {
                    "id": "asd",
                    "name": "foo",
                    "type": expectedType
                }
            }, "input"
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

    function checkGeneratedField(field, id, title, startIndex, classes, opts, required) {
        var
            divId = "je0-" + id + "-" + startIndex,
            inputId = "je0-" + id + "-input-" + (startIndex + 1),
            input = priv.input(id, opts.type, inputId, opts, required);

        delete input.input.$keyup;

        deepEqual(field, {
            "div": {
                "id": divId,
                "class": classes,
                "$childs": [
                    // this should be tested separetely so we trust they work
                    priv.label(title, inputId),
                    input
                ]
            }
        });
    }

    function checkField(opts, classes, required) {
        priv.ns._reset();

        var field = priv.genField("name", opts, required);

        delete field.div.$childs[1].input.$keyup;
        checkGeneratedField(field, "name", "Name", 0, classes, opts, required);
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
            "title": "Name"
        }, "je-field je-name je-number je-required", true);
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

        delete fields[0].div.$childs[1].input.$keyup;
        delete fields[1].div.$childs[1].input.$keyup;

        checkGeneratedField(fields[0], "name", "Name", 0, "je-field je-name je-string", nameOpts);
        checkGeneratedField(fields[1], "age", "Age", 2, "je-field je-age je-number", ageOpts);
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

        equal(field.div.id, priv.ns.id("numbers", true, 0));
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
            "enum": ["red", "green", "blue"]
        }, true);

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
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck, required) {
            name = name || "name";
            required = (required === true);

            var result = validate(name, value, schema, required);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "Field '" + name + "' " + msgCheck);
            }

            return result;
        }

        checkValidation("foo", {type: "string"}, true);
        checkValidation("foo", {type: "string"}, true, "name", null, true);

        checkValidation("", {type: "string"}, false, "foo", errs.EMPTY, true);
        checkValidation(null, {type: "string"}, false, "foo", errs.NOT_STRING);

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
        checkValidation("", {type: "string", minLength: 0}, true, "num", null, true);

        checkValidation("a", {type: "string", minLength: 1}, true);
        checkValidation("aasda", {type: "string", minLength: 1}, true);
        checkValidation("a", {type: "string", minLength: 1}, true, "num", null, true);


        checkValidation("", {type: "string", minLength: 1}, false, "name", errs.TO_SMALL);
        checkValidation("a", {type: "string", minLength: 2}, false, "name", errs.TO_SMALL);

        checkValidation("", {type: "string", maxLength: 0}, true);

        checkValidation("a", {type: "string", maxLength: 1}, true);
        checkValidation("", {type: "string", maxLength: 1}, true);
        checkValidation("", {type: "string", maxLength: 0}, false, "num", errs.EMPTY, true);
        checkValidation("a", {type: "string", maxLength: 1}, true, "num", null, true);

        checkValidation("aa", {type: "string", maxLength: 1}, false, "name", errs.TO_BIG);
        checkValidation("a", {type: "string", maxLength: 0}, false, "name", errs.TO_BIG);

        checkValidation("a", {type: "string", "enum": ['a']}, true);
        checkValidation("b", {type: "string", "enum": ['a', 'b']}, true);
        checkValidation("c", {type: "string", "enum": ['a', 'b']}, false, errs.NOT_IN_ENUM);
    });

    test("validate number", function () {
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "Field '" + name + "' " + msgCheck);
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

    test("validate integer", function () {
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "Field '" + name + "' " + msgCheck);
            }

            return result;
        }

        checkValidation(12, {type: "integer"}, true);
        checkValidation(12.3, {type: "integer"}, false, "num", errs.NOT_INTEGER);
        checkValidation("12", {type: "integer"}, false, "num", errs.NOT_INTEGER);
        checkValidation(null, {type: "integer"}, false, "num", errs.NOT_INTEGER);

        checkValidation(0, {type: "integer", minimum: 0}, true);
        checkValidation(1, {type: "integer", minimum: 0, exclusiveMinimum: true}, true);

        checkValidation(0, {type: "integer", minimum: 1}, false, "num", errs.NUM_TOO_SMALL);
        checkValidation(0, {type: "integer", minimum: 0, exclusiveMinimum: true}, false, "num", errs.NUM_TOO_SMALL);

        checkValidation(1, {type: "integer", minimum: 2}, false, "num", errs.NUM_TOO_SMALL);
        checkValidation(1, {type: "integer", minimum: 1, exclusiveMinimum: true}, false, "num", errs.NUM_TOO_SMALL);

        checkValidation(0, {type: "integer", maximum: 0}, true);
        checkValidation(1, {type: "integer", maximum: 2, exclusiveMaximum: true}, true);

        checkValidation(3, {type: "integer", maximum: 1}, false, "num", errs.NUM_TOO_BIG);
        checkValidation(2, {type: "integer", maximum: 0, exclusiveMaximum: true}, false, "num", errs.NUM_TOO_BIG);

        checkValidation(3, {type: "integer", maximum: 2}, false, "num", errs.NUM_TOO_BIG);
        checkValidation(2, {type: "integer", maximum: 1, exclusiveMaximum: true}, false, "num", errs.NUM_TOO_BIG);

        checkValidation(3, {type: "integer", "enum": [3]}, true);
        checkValidation(3, {type: "integer", "enum": [2, 3]}, true);

        checkValidation(3, {type: "integer", "enum": []}, false, "num", errs.NOT_IN_ENUM);
        checkValidation(3, {type: "integer", "enum": [1, 2]}, false, "num", errs.NOT_IN_ENUM);

        checkValidation(42, {type: "integer", mod: 2}, true);
        checkValidation(42, {type: "integer", mod: 9}, false, "num", errs.NOT_DIVISIBLE_BY);
    });

    test("validate boolean", function () {
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "Field '" + name + "' " + msgCheck);
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

    test("validate null", function () {
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck) {
            name = name || "name";

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "Field '" + name + "' " + msgCheck);
            }

            return result;
        }

        checkValidation(null, {type: "null"}, true);
        checkValidation(12.3, {type: "null"}, false, "num", errs.NOT_NULL);
        checkValidation("12", {type: "null"}, false, "num", errs.NOT_NULL);
        checkValidation("", {type: "null"}, false, "num", errs.NOT_NULL);
    });

    test("validate array", function () {
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck, itemName) {
            name = name || "name";
            itemName = itemName || name;

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + value + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                equal(result.msg, "Field '" + itemName + "' " + msgCheck);
            }

            return result;
        }

        checkValidation([], {type: "array"}, true);

        $.each([null, 1, true, "asd", undefined, 1.2], function (i, item) {
            checkValidation(item, {type: "array"}, false, "items", errs.NOT_ARRAY);
        });

        checkValidation([], {type: "array", minItems: 0}, true);

        checkValidation([], {type: "array", minItems: 1}, false, "items", errs.ARRAY_TOO_SMALL);

        checkValidation([1], {type: "array", minItems: 2}, false, "items", errs.ARRAY_TOO_SMALL);

        checkValidation([], {type: "array", maxItems: 0}, true);

        checkValidation([1, 2, 3], {type: "array", maxItems: 1}, false, "items", errs.ARRAY_TOO_BIG);

        checkValidation([1, 2, 3], {type: "array", maxItems: 2}, false, "items", errs.ARRAY_TOO_BIG);

        checkValidation([], {type: "array", uniqueItems: true}, true);
        checkValidation([1], {type: "array", uniqueItems: true}, true);
        checkValidation([1, 2, 3], {type: "array", uniqueItems: true}, true);

        checkValidation([1, 2, 3, 3], {type: "array", uniqueItems: true}, false, "items", errs.DUPLICATED_ITEMS);
        checkValidation([1, 2, 3], {
            type: "array",
            items: {
                type: "number"
            }
        }, true);
        checkValidation([1, 2, 3, "4"], {
            type: "array",
            items: {
                type: "number"
            }
        }, false, "items", errs.NOT_NUMBER, "items 4");

        checkValidation([1, "4"], {
            type: "array",
            items: [
                {type: "number"},
                {type: "boolean"}
            ]
        }, false, "items", errs.NOT_BOOLEAN, "items 2");

        checkValidation([1, false], {
            type: "array",
            items: [
                {type: "number"},
                {type: "boolean"}
            ]
        }, true, "items");

        checkValidation([1, false, "foo"], {
            type: "array",
            additionalItems: false,
            items: [
                {type: "number"},
                {type: "boolean"}
            ]
        }, false, "items", errs.ADDITIONAL_ITEMS);

        checkValidation([1, false, "foo", "bar", "baz"], {
            type: "array",
            additionalItems: {type: "string"},
            items: [
                {type: "number"},
                {type: "boolean"}
            ]
        }, true);

        checkValidation([1, false, "foo", "bar", 12], {
            type: "array",
            additionalItems: {type: "string"},
            items: [
                {type: "number"},
                {type: "boolean"}
            ]
        }, false, "items", errs.NOT_STRING, "items 5");

        checkValidation([1, false, 12, "foo", "bar"], {
            type: "array",
            additionalItems: {type: "string"},
            items: [
                {type: "number"},
                {type: "boolean"}
            ]
        }, false, "items", errs.NOT_STRING, "items 3");
    });

    test("validate object", function () {
        var validate = JsonSchema.validate, result,
            errs = JsonSchema.msgs.err;

        function checkValidation(value, schema, eStatus, name, msgCheck, itemName) {
            name = name || "name";
            itemName = itemName || name;

            var result = validate(name, value, schema);
            equal(result.ok, eStatus, "status for '" + JSON.stringify(value) + "' should be " + eStatus + "(" + result.msg + ")");

            if (msgCheck) {
                if (itemName) {
                    equal(result.msg, "Field '" + itemName + "' " + msgCheck);
                } else {
                    equal(result.msg, msgCheck);
                }
            }

            return result;
        }

        function checkChildValidation(value, schema, msgCheck, expectedData) {
            var result = validate(name, value, schema);

            if (msgCheck) {
                equal(result.msg, msgCheck);
            }

            deepEqual(result.data, expectedData);

            return result;
        }

        checkValidation({}, {type: "object"}, true);

        $.each([null, [], 1, true, "asd", undefined, 1.2], function (i, item) {
            checkValidation(item, {type: "object"}, false, "obj", errs.NOT_OBJECT);
        });

        checkValidation({}, {type: "object", minProperties: 0}, true);
        checkValidation({}, {type: "object", maxProperties: 0}, true);

        checkValidation({}, {type: "object", minProperties: 1}, false, "obj", errs.TOO_FEW_PROPERTIES);
        checkValidation({a: 1}, {type: "object", minProperties: 2}, false, "obj", errs.TOO_FEW_PROPERTIES);

        checkValidation({a: 1}, {type: "object", maxProperties: 0}, false, "obj", errs.TOO_MANY_PROPERTIES);
        checkValidation({a: 1, b: 2}, {type: "object", maxProperties: 1}, false, "obj", errs.TOO_MANY_PROPERTIES);

        checkValidation({a: 1, b: 2}, {
            type: "object",
            properties: {
                a: {type: "number"},
                b: {type: "number"}
            }
        }, true);

        checkValidation({a: 1}, {
            type: "object",
            properties: {
                a: {type: "number"},
                b: {type: "number"}
            }
        }, true);

        checkChildValidation({a: 1, b: 2}, {
            type: "object",
            properties: {
                a: {type: "number"},
                b: {type: "string"}
            }
        }, errs.ERRORS_IN_OBJ, {"b": {"data": {}, "msg": "Field 'b' should be of type string", "ok": false, isRoot: true}});
    });

    test("isType", function () {
        function check(value, type, expected) {
            equal(JsonSchema.isType(value, type), expected, "checking " + value + " for type " + type + " should return " + expected);
        }

        check(1, "integer", true);
        check(1, "number", true);
        check(1.2, "number", true);
        check(true, "boolean", true);
        check(false, "boolean", true);
        check("asd", "string", true);
        check([], "array", true);
        check([1], "array", true);

        check(1, "string", false);
        check(1, "array", false);
        check(1, "boolean", false);

        check(false, "string", false);
        check(false, "array", false);
        check(false, "integer", false);
        check(false, "number", false);

        check("asd", "boolean", false);
        check("asd", "array", false);
        check("asd", "integer", false);
        check("asd", "number", false);

        check(1.2, "string", false);
        check(1.2, "array", false);
        check(1.2, "integer", false);
        check(1.2, "boolean", false);

        check([], "boolean", false);
        check([], "string", false);
        check([], "integer", false);
        check([], "number", false);
    });

    test("castSingleToType", function () {
        function check(value, type, expected) {
            var result = priv.castSingleToType(value, type);

            ok(result.ok);
            equal(result.data, expected, "" + value + " casted to " + type + " should be " + expected);
        }

        function checkFail(value, type, msg) {
            var result = priv.castSingleToType(value, type);

            ok(!result.ok);
            equal(result.msg, msg);
        }

        check("1", "integer", 1);
        check("1.2", "number", 1.2);
        check("true", "boolean", true);
        check("true", "boolean", true);
        check("hello", "string", "hello");

        checkFail("1.2", "integer", "expected integer got 1.2");
        checkFail("true", "integer", "expected integer got true");
        checkFail("true", "number", "expected number got true");
        checkFail("1", "boolean", "expected boolean got 1");
    });

    test("castToType", function () {
        function check(value, type, expected) {
            var result = priv.castToType(value, type);

            ok(result.ok);
            deepEqual(result.data, expected, "" + value + " casted to " + type + " should be " + expected);
        }

        function checkFail(value, type, msg) {
            var result = priv.castToType(value, type);

            ok(!result.ok);
            equal(result.msg, msg, "expect: " + msg);
        }

        check([], "integer", []);
        check(["1", "2", "3"], "integer", [1, 2, 3]);
        check(["1", "2", "3"], "number", [1, 2, 3]);
        check(["1.2", "2.2", "3"], "number", [1.2, 2.2, 3]);
        check(["1.2", "2.2", "3.2"], "number", [1.2, 2.2, 3.2]);

        check(["true", "false", "true"], "boolean", [true, false, true]);
        check(["1.2", "2.2", "3.2"], "string", ["1.2", "2.2", "3.2"]);

        checkFail(["1.2"], "integer", "expected integer got 1.2");
        checkFail(["true"], "integer", "expected integer got true");
        checkFail(["true"], "number", "expected number got true");
        checkFail(["1"], "boolean", "expected boolean got 1");
    });

    /*
    test("", function () {
    });
    */
});
