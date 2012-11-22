/*global window define document*/
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
        formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    formatHints.string.blockly = function (name, type, id, opts, required, priv, util) {
        var
            frameId = NsGen.id("blockly"),
            options = opts["je:blockly"] || {},
            rows = options.rows || 4,
            width = options.width || "99%",
            height = options.height || "20em",
            basePath = options.basePath || "",
            content = opts["default"] || "";

        window["init" + frameId] = function (Blockly) {
            var xmlDom;

            $("#" + frameId).data({blockly: Blockly});

            if (content !== "") {
                xmlDom = null;

                try {
                    xmlDom = Blockly.Xml.textToDom(content);
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
        };

        return {
            "iframe": {
                "id": frameId,
                "src": basePath + "frame.html?id=" + frameId,
                "style": "border: 0; width: " + width + "; height: " + height
            }
        };
    };

    collectHints.string = collectHints.string || {};

    collectHints.string.blockly = function (key, field, schema, priv) {
        var
            iframe = $(field).children("iframe:first"),
            blockly = iframe.data("blockly"),
            xmlDom = blockly.Xml.workspaceToDom(blockly.mainWorkspace),
            xmlText = blockly.Xml.domToPrettyText(xmlDom);

        return {result: JsonEdit.makeResult(true, "ok", xmlText), data: xmlText};
    };
}));
