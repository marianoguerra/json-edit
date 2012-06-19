/*global require */
require.config({
    baseUrl: "js/",
    paths: {
        "json": "http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2",
        "ace": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/ace",
        "ace.json": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/mode-json",
        "ace.theme": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/theme-merbivore_soft",
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
        "jquery.lego": "https://raw.github.com/marianoguerra/legojs/master/jquery.lego.web",
        "prettyPrint": "http://cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify"
    },

    shim: {
        json: {
            exports: "JSON"
        },
        ace: {
            exports: "ace",
            deps: ["ace.json", "ace.theme"]
        },
        jquery: {
            exports: "jQuery"
        },
        "jquery.lego": {
            deps: ["jquery"],
            exports: "jQuery"
        },
        prettyPrint: {
            exports: "prettyPrint"
        }
    }
});

require(["json.edit", "demos", "ace", "jquery.lego", "prettyPrint", "json"], function (mJsonEdit, demos, ace, $, prettyPrint, JSON) {
    "use strict";
    function startEditor(id, title, description, content) {
        var editor, outputId = id + "-out",
            jsonEditData;

        function updateDemo() {
            var content = editor.getSession().getDocument().getValue(),
                data;

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
            var result = jsonEditData.collect();

            $("#" + id + "-data").html(JSON.stringify(result.data, null, 2));
            $("#" + id + "-validation").html(JSON.stringify(result.result, null, 2));
            prettyPrint();
        }

        $("body").append($.lego({
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
                                "$childs": JSON.stringify(content, null, 2)
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

        editor = ace.edit(id);
        editor.setTheme("ace/theme/merbivore_soft");
        //editor.getSession().setMode("ace/mode/json");
        editor.setFontSize("1em");
        updateDemo();

        return editor;
    }

    $(function () {
        var i;
        for (i = 0; i < demos.length; i += 1) {
            startEditor("editor" + i, demos[i][0], demos[i][1], demos[i][2]);
        }
    });
});
