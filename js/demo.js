/*global demos $ jsonEdit ace*/
(function () {
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
            jsonEditData = jsonEdit(outputId, data);
        }

        function validateForm() {
            var result = jsonEditData.collect();

            $("#" + id + "-data").html(JSON.stringify(result.data, null, 2));
            $("#" + id + "-validation").html(JSON.stringify(result.result, null, 2));
            console.log("validation result", result);
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
                                "class": "demo-validation"
                            }
                        },
                        {
                            "pre": {
                                "id": id + "-data",
                                "class": "demo-data"
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
        editor.getSession().setMode("ace/mode/json");
        updateDemo();

        return editor;
    }

    $(function () {
        var i;
        for (i = 0; i < demos.length; i += 1) {
            startEditor("editor" + i, demos[i][0], demos[i][1], demos[i][2]);
        }
    });
}());
