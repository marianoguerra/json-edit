/*global require alert setTimeout*/
require.config({
    baseUrl: "js/",
    paths: {
        "json": "http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2",
        "ace": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/ace",
        "ace.json": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/mode-json",
        "ace.theme": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/theme-merbivore_soft",
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
        "jqueryui": "http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.8.19/jquery-ui.min",
        "legoparser": "http://marianoguerra.github.com/legojs/src/legoparser",
        "jquery.lego": "http://marianoguerra.github.com/legojs/src/jquery.lego",
        "prettyPrint": "http://cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify",
        "jquery.taghandler": "https://raw.github.com/ioncache/Tag-Handler/master/js/jquery.taghandler",
        "json.edit": "../src/json.edit",
        "json.schema": "../src/json.schema",
        "nsgen": "../src/nsgen",

        // hints
        "hint.tags": "../src/addons/tags",
        "hint.autocomplete": "../src/addons/autocomplete",
        "hint.date": "../src/addons/date",
        "hint.color": "../src/addons/color/color",
        "hint.tabs": "../src/addons/tabs",
        "hint.password": "../src/addons/password",
        "hint.textarea": "../src/addons/textarea",
        "hint.readonly": "../src/addons/readonly",
        "hint.enumlabels": "../src/addons/enumlabels",
        "hint.squim": "../src/addons/squim",
        "hint.tabarray": "../src/addons/tabarray",
        "hint.summarylist": "../src/addons/summarylist/addon",

        // needed by hints
        // by color hint
        "colorPicker": "../src/addons/color/picker/colorPicker",

        // by squide hint
        "squim": "http://marianoguerra.github.com/squim/src/squim",
        "squim.types": "http://marianoguerra.github.com/squim/src/squim.types",
        "squim.parser": "http://marianoguerra.github.com/squim/src/squim.parser",
        "squim.error": "http://marianoguerra.github.com/squim/src/squim.error",
        "squim.ground": "http://marianoguerra.github.com/squim/src/squim.ground",
        "squim.util": "http://marianoguerra.github.com/squim/src/squim.util",

        "squide": "http://marianoguerra.github.com/squide/src/squide",
        "squide.types": "http://marianoguerra.github.com/squide/src/squide.types",
        "squide.ui": "http://marianoguerra.github.com/squide/src/squide.ui",

        // by summarylist
        "dustjs": "http://linkedin.github.com/dustjs/dist/dust-full-1.0.0"
    },

    shim: {
        json: {
            exports: "JSON"
        },
        ace: {
            exports: "ace",
            deps: ["ace.json", "ace.theme"]
        },
        prettyPrint: {
            exports: "prettyPrint"
        },
        colorPicker: {
            exports: "colorPicker"
        },
        dustjs: {
            exports: "dust"
        }
    }
});

require(["jquery", "json.edit", "demos", "ace", "jquery.lego", "prettyPrint", "json",

        "hint.tags", "hint.autocomplete", "hint.date", "hint.color", "hint.tabs",
        "hint.password", "hint.readonly", "hint.enumlabels", "hint.squim", "hint.tabarray",
        "hint.summarylist", "hint.textarea"],

        function ($, mJsonEdit, demos, ace, legojs, prettyPrint, JSON) {
    "use strict";

    function makeUser(username, email, nick) {
        return {
            username: username,
            email: email,
            nick: nick
        };
    }

    function showMessageIfFail(fail) {
        if (fail) {
            alert("one out of two fails, this failed");
        }
    }

    function summaryListHandlers(outputId) {
        var
            fail = true,
            jsonEditData,
            users = [
                makeUser("mariano", "mariano@mariano.org", "marianoguerra"),
                makeUser("ignacio", "ignacio@ignacio.org", "ignacioguerra"),
                makeUser("pablo", "pablo@pablo.org", "pabloguerra")
            ],
            data = {
                "type": "object",
                "properties": {
                    "users": {
                        "type": "array",
                        "default": users,
                        "je:hint": "summarylist",
                        "je:summarylist": {
                            "template": "{username} {nick} {email}",
                            "noItemsMsg": "No users, click add to create one",
                            "onEdit": function (name, itemData, defaultHandler, setWorking, schema) {
                                setWorking(true);
                                setTimeout(function () {
                                    defaultHandler(!fail);
                                    showMessageIfFail(fail);
                                    fail = !fail;
                                }, 3000);
                            },
                            "onAdd": function (name, itemData, defaultHandler, setWorking, schema) {
                                setWorking(true);
                                setTimeout(function () {
                                    defaultHandler(!fail);
                                    showMessageIfFail(fail);
                                    fail = !fail;
                                }, 3000);
                            },
                            "onRemove": function (name, itemData, defaultHandler, setWorking, schema) {
                                setWorking(true);
                                setTimeout(function () {
                                    defaultHandler(!fail);
                                    showMessageIfFail(fail);
                                    fail = !fail;
                                }, 3000);
                            }
                        },
                        "items": {
                            "title": "Add User",
                            "order": ["username", "nick", "email"],
                            "required": ["username", "nick", "email"],
                            "type": "object",
                            "properties": {
                                "username": {
                                    "title": "Username",
                                    "type": "string"
                                },
                                "nick": {
                                    "title": "Nick",
                                    "type": "string"
                                },
                                "email": {
                                    "title": "Email",
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            };

        jsonEditData = mJsonEdit(outputId, data);

    }

    function summaryListNoHandlers(outputId) {
        var
            jsonEditData,
            users = [
                makeUser("mariano", "mariano@mariano.org", "marianoguerra"),
                makeUser("ignacio", "ignacio@ignacio.org", "ignacioguerra"),
                makeUser("pablo", "pablo@pablo.org", "pabloguerra")
            ],
            data = {
                "type": "object",
                "properties": {
                    "users": {
                        "type": "array",
                        "default": users,
                        "je:hint": "summarylist",
                        "je:summarylist": {
                            "template": "{username} {nick} {email}",
                            "noItemsMsg": "No users, click add to create one"
                        },
                        "items": {
                            "title": "Add User",
                            "order": ["username", "nick", "email"],
                            "required": ["username", "nick", "email"],
                            "type": "object",
                            "properties": {
                                "username": {
                                    "title": "Username",
                                    "type": "string"
                                },
                                "nick": {
                                    "title": "Nick",
                                    "type": "string"
                                },
                                "email": {
                                    "title": "Email",
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            };

        jsonEditData = mJsonEdit(outputId, data);

    }
    $(function () {
        summaryListHandlers("summarylisthandlers");
        summaryListNoHandlers("summarylist-nohandlers");
    });
});
