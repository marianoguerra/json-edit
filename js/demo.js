/*global require, window, console, alert*/
require.config({
    baseUrl: "js/",
    paths: {
        "json": "http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2",
        "ace": "../libs/ace",
        "ace.json": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/mode-json",
        "ace.theme": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/theme-merbivore_soft",
        "jquery": "../libs/jquery",
        "jqueryui": "../libs/jquery-ui",
        "legoparser": "http://marianoguerra.github.com/legojs/src/legoparser",
        "jquery.lego": "http://marianoguerra.github.com/legojs/src/jquery.lego",
        "prettyPrint": "http://cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify",
        "jquery.taghandler": "../libs/jquery.taghandler",
        "json.edit": "../src/json.edit",
        "json.schema": "../src/json.schema",
        "nsgen": "../src/nsgen",

        // hints
        "hint.tags": "../src/addons/tags",
        "hint.autocomplete": "../src/addons/autocomplete",
        "hint.date": "../src/addons/date",
        "hint.color": "../src/addons/color/color",
        "hint.tabs": "../src/addons/tabs",
        "hint.tabsobject": "../src/addons/tabsobject",
        "hint.password": "../src/addons/password",
        "hint.textarea": "../src/addons/textarea",
        "hint.readonly": "../src/addons/readonly",
        "hint.enumlabels": "../src/addons/enumlabels",
        "hint.squim": "../src/addons/squim",
        "hint.tabarray": "../src/addons/tabarray",
        "hint.summarylist": "../src/addons/summarylist/addon",
        "hint.adsafe": "../src/addons/adsafe/adsafe",
        "hint.blockly": "../src/addons/blockly/blockly",
        "hint.optional": "../src/addons/optional",
        "hint.codemirror": "../src/addons/codemirror",
        "hint.htmleditor": "../src/addons/htmleditor/htmleditor",

        // needed by hints
        // by color hint
        "colorPicker": "../src/addons/color/picker/colorPicker",
        "spectrum": "../src/addons/color/picker/spectrum",
        // by adsafe hint
        "jslint": "../src/addons/adsafe/lib/jslint",

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
        "dustjs": "http://linkedin.github.io/dustjs/dist/dust-full.min"
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
        spectrum: {
            exports: "spectrum",
            deps: ["jquery", "jqueryui"]
        },
        dustjs: {
            exports: "dust"
        }
    }
});

require(["jquery", "json.edit", "demos", "ace", "jquery.lego", "prettyPrint",
        "json",

        "hint.tags", "hint.autocomplete", "hint.date", "hint.color",
        "hint.tabs", "hint.tabsobject", "hint.password", "hint.readonly", "hint.enumlabels",
        "hint.squim", "hint.tabarray", "hint.summarylist", "hint.textarea",
        "hint.adsafe", "hint.blockly", "hint.optional", "hint.codemirror",
        "hint.htmleditor"],

        function ($, mJsonEdit, demos, ace, legojs, prettyPrint, JSON) {
    "use strict";
    var hideEditor = (window.location.search.indexOf("hideEditor=true") !== -1); // lazy :)

    function startEditor(id, title, description, content) {
        var editor, outputId = id + "-out",
            jsonEditData;

        function updateDemo() {
            var content,
                data;

            if (hideEditor || !ace) {
                content = $("#" + id).text();
            } else {
                content = editor.getSession().getDocument().getValue();
            }


            try {
                data = JSON.parse(content);
            } catch (error) {
                alert(error);
                return;
            }

            $("#" + outputId).html("");
            jsonEditData = mJsonEdit(outputId, data);
        }

        function validateForm() {
            var
                result = jsonEditData.collect(),
                errors;

            if (result.ok) {
                errors = [];
            } else {
                errors = jsonEditData.getErrors(result.result);
            }

            $("#" + id + "-data").text(JSON.stringify(result.data, null, 2));
            $("#" + id + "-validation").text(JSON.stringify(result.result, null, 2));
            prettyPrint();
            console.log(errors);
        }

        $("#demo-cont").html($.lego({
            "div": {
                "class": "demo-wrapper",
                "$childs": [{
                    "div": {
                        "class": "demo-box",
                        "$childs": [{
                            "h3": title
                        }, {
                            "p": {
                                "class": "demo-desc",
                                "$childs": description
                            }
                        }, {
                            "pre": {
                                "id": id,
                                "class": "editor",
                                "$childs": mJsonEdit.escape(JSON.stringify(content, null, 2))
                            }
                        }, {
                            "div": {
                                "id": outputId,
                                "class": "demo-out"
                            }
                        }]
                    }
                }, {
                    "div": {
                        "class": "demo-outputs",
                        "$childs": [{
                            "pre": {
                                "id": id + "-validation",
                                "class": "demo-validation prettyprint"
                            }
                        },
                        {
                            "pre": {
                                "id": id + "-data",
                                "class": "demo-data prettyprint"
                            }
                        }]
                    }
                }, {
                    "div": {
                        "class": "demo-actions",
                        "$childs": [{
                            "button": {
                                "id": id + "-action",
                                "class": "demo-validate",
                                "$childs": "validate",
                                "$click": function () {
                                    validateForm();
                                }
                            }
                        }, {
                            "button": {
                                "id": id + "-action",
                                "class": "demo-run",
                                "$childs": "run",
                                "$click": function () {
                                    updateDemo();
                                }
                            }
                        }]
                    }
                }]
            }
        }));

        if (!hideEditor && ace) {
            editor = ace.edit(id);
            editor.setTheme("ace/theme/merbivore_soft");
            //editor.getSession().setMode("ace/mode/json");
            editor.setFontSize("1em");
        }

        updateDemo();

        return editor;
    }

    $(function () {
        var i, id, title, option,
            select = $("#demo-selector");

        for (i = 0; i < demos.length; i += 1) {
            id = "editor" + i;
            title = demos[i][0];
            option = $("<option>" + title + "</option>");
            option.data("demo-index", i);
            option.data("demo-id", id);
            select.append(option);
        }

        select.change(function () {
            var selected = $(this).children(":selected"),
                id = selected.data("demo-id"),
                index = selected.data("demo-index");

            startEditor(id, demos[index][0], demos[index][1], demos[index][2]);
        });

        startEditor("editor0", demos[0][0], demos[0][1], demos[0][2]);
    });
});
