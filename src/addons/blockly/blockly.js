/*global window, define, document*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'json.edit', 'nsgen'],
               function ($, JsonEdit, NsGen) {
            return (root.JsonEdit = factory($, JsonEdit, NsGen));
        });
    } else {
        root.JsonEdit = factory(root.$, root.JsonEdit, root.JsonSchema, root.NsGen);
    }
}(this, function ($, JsonEdit, NsGen) {
    "use strict";
    var
        globalClipboardKey = "jsoneditblocklyclipboard__",
        formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors,
        baseCloseOverlayStyle = {
            float: "right",
            "font-size": "small",
            color: "#333",
            "text-decoration": "none"
        },
        baseOverlayStyle = {
            position: "fixed",
            width: "96%",
            left: 0,
            top: 0,
            height: "90%",
            border: "1px solid #DFDFDF",
            "background-color": "#fff",
            margin: "1%",
            padding: "1%",
            "z-index": 10000
        };

    formatHints.string = formatHints.string || {};

    formatHints.string.blockly = function (name, type, id, opts, required, priv, util) {
        var
            frameId = NsGen.id("blockly"),
            overlayId = frameId + "-overlay",
            options = opts["je:blockly"] || {},
            onBlocklyLoaded = options.onBlocklyLoaded,
            inOverlay = options.overlay === true,
            userOverlayStyle = options.overlayStyle || {},
            userCloseOverlayStyle = options.closeOverlayStyle || {},
            rows = options.rows || 4,
            width = options.width || "99%",
            height = options.height || "20em",
            basePath = options.basePath || "",
            content = opts["default"];

        window["init" + frameId] = function (Blockly) {
            var xmlDom,
                clipboard = window[globalClipboardKey];

            if (clipboard) {
                Blockly.clipboard_ = clipboard;
            }

            $("#" + frameId).data({blockly: Blockly});

            if (content) {
                xmlDom = null;

                try {
                    xmlDom = Blockly.Xml.textToDom(content.xml);
                } catch (e) {
                    if (window.console && window.console.error) {
                        window.console.error("error loading xml for blocky", e);
                    }

                    return;
                }

                if (xmlDom) {
                    Blockly.mainWorkspace.clear();
                    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
                }
            }

            if (onBlocklyLoaded) {
                onBlocklyLoaded(Blockly);
            }
        };

        if (inOverlay) {

            return {
                "button": {
                    "id": frameId,
                    "$childs": "Edit",
                    "$click": function (event) {
                        var
                            style, closeStyle, closeOverlay, iframe,

                            overlay = $("#" + overlayId);

                        if (overlay.size() !== 0) {
                            overlay.show();
                        } else {
                            style = $.extend(true, {}, baseOverlayStyle, userOverlayStyle);
                            closeStyle = $.extend(true, {}, baseCloseOverlayStyle, userCloseOverlayStyle);
                            closeOverlay = $("<a>")
                                .css(closeStyle)
                                .attr({"href": "#", "class": "je-blockly-close-overlay"})
                                .append("close");

                            iframe = {
                                "iframe": {
                                    "class": "je-blockly-overlay-editor",
                                    "src": basePath + "frame.html?id=" + frameId,
                                    "style": "border: 0; width: 100%; height: 90%"
                                }
                            };

                            closeOverlay.click(function () {
                                var clipboard = $("#" + frameId)
                                    .data("blockly")
                                    .clipboard_;

                                if (clipboard) {
                                    window[globalClipboardKey] = clipboard;
                                }

                                $("#" + overlayId).hide();
                                return false;
                            });

                            $("<div>")
                                .attr({"class": "je-blockly-overlay", "id": frameId + "-overlay"})
                                .append(closeOverlay)
                                .append($.lego(iframe))
                                .css(style)
                                .appendTo($("body"));
                        }

                        event.preventDefault();
                    }
                }
            };
        } else {
            return {
                "iframe": {
                    "id": frameId,
                    "class": "je-blockly-editor",
                    "src": basePath + "frame.html?id=" + frameId,
                    "style": "border: 0; width: " + width + "; height: " + height
                }
            };
        }
    };

    collectHints.string = collectHints.string || {};

    collectHints.string.blockly = function (key, field, schema, priv) {
        var
            xmlDom, xmlText, data,

            options = schema["je:blockly"] || {},
            inOverlay = options.overlay === true,
            compileToJs = (typeof options.compileToJsField === "string"),
            editor = (inOverlay) ? $(field).children("button:first")
                                 : $(field).children("iframe:first"),
            blockly = editor.data("blockly");

        if (blockly) {
            xmlDom = blockly.Xml.workspaceToDom(blockly.mainWorkspace);
            xmlText = blockly.Xml.domToPrettyText(xmlDom);

        } else {
            xmlText = schema["default"] || "<xml></xml>";
        }

        data = {xml: xmlText};
        if (compileToJs) {
            data[options.compileToJsField] = blockly.Generator
                .workspaceToCode('JavaScript');
        }

        $("#" + editor.attr("id") + "-overlay").remove();

        return {result: JsonEdit.makeResult(true, "ok", xmlText), data: data};
    };
}));
