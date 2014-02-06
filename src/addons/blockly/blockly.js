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
        },
        colors = [
            "#c82829", "#f5871f", "#eab700", "#718c00", "#3e999f", "#4271ae",
            "#8959a8",
            "#cc6666", "#de935f", "#f0c674", "#b5bd68", "#8abeb7", "#81a2be",
            "#b294bb",
            "#111111", "#3B3131", "#463E3F", "#504A4B", "#5C5858", "#666362",
            "#726E6D", "#837E7C", "#B6B6B4", "#BCC6CC", "#000080", "#15317E",
            "#0000A0", "#0041C2", "#1569C7", "#1F45FC", "#1589FF", "#82CAFF",
            "#78C7C7", "#6CC417", "#52D017", "#54C571", "#85BB65", "#B2C248",
            "#CCFB5D", "#BCE954", "#EDE275", "#FFFF00", "#FFEBCD", "#ECE5B6",
            "#FFDB58", "#FDD017", "#F2BB66", "#FBB117", "#E9AB17", "#DEB887",
            "#C9BE62", "#EE9A4D", "#D4A017", "#F87431", "#FF8040", "#FF7F50",
            "#F9966B", "#E18B6B", "#F75D59", "#E55B3C", "#F70D1A", "#E42217",
            "#DC381F", "#C34A2C", "#C24641", "#7F4E52", "#C5908E", "#EDC9AF",
            "#E38AAE", "#F6358A", "#F535AA", "#CA226B", "#C12283", "#4B0082",
            "#6A287E", "#6C2DC7", "#7F38EC", "#A23BEC", "#9E7BFF", "#C8A2C8",
            "#F9B7FF", "#E3E4FA", "#FFFFFF", "#FEFEFE"
        ];

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

        window["init" + frameId] = function (Blockly, _id, childDocument) {
            var xmlDom,
                domParser = new window.DOMParser(),
                clipboard = window[globalClipboardKey];

            Blockly.inject(childDocument.body,
                           {path: './', toolbox: options.toolbox});

            Blockly.FieldColour.COLOURS = colors;
            Blockly.HSV_VALUE = 0.75;
            Blockly.HSV_SATURATION = 0.30;
            Blockly.Language.TEXT_TYPE_HUE = 79;
            Blockly.Language.LOGIC_TYPE_HUE = 358;
            Blockly.Language.COLOUR_TYPE_HUE = 191;

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
