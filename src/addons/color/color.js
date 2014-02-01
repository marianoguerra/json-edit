/*global window, define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen',
               'colorPicker', 'spectrum'],
               function ($, $ui, JsonEdit, JsonSchema, NsGen, ColorPicker) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory($, $ui, JsonEdit, JsonSchema, NsGen, ColorPicker));
        });
    } else {
        // Browser globals
        root.JsonEdit = factory(root.$, root.$, root.JsonEdit, root.JsonSchema, root.NsGen, root.ColorPicker);
    }
}(this, function ($, $ui, JsonEdit, JsonSchema, NsGen, mColorPicker) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.string = formatHints.string || {};

    function normalizeRGB(c) {
        var
            red, green, blue,
            rnum, gnum, bnum;

        // remove the # if it's there
        c = (c.charAt(0) === "#") ? c.slice(1) : c;

        if (c.length === 3) {
            c = c.charAt(0) + c.charAt(0) + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2);
        } else if (c.length !== 6) {
            return {
                str: c,
                hex: {},
                num: {},
                ok: false
            };
        }

        red   = c.charAt(0) + c.charAt(1);
        green = c.charAt(2) + c.charAt(3);
        blue  = c.charAt(4) + c.charAt(5);

        rnum = parseInt(red, 16);
        gnum = parseInt(green, 16);
        bnum = parseInt(blue, 16);

        return {
            str: c,
            hex: {
                red: red,
                green: green,
                blue: blue
            },
            num: {
                red: rnum,
                green: gnum,
                blue: bnum
            },
            // check if some of the numbers is NaN
            ok: rnum === rnum && gnum === gnum && bnum === bnum
        };
    }

    function contrastTextColor(red, green, blue) {
        var brightness;

        brightness = (red * 299) + (green * 587) + (blue * 114);
        brightness = brightness / 255000;

        // values range from 0 to 1
        // anything greater than 0.5 should be bright enough for dark text
        if (brightness >= 0.5) {
            return "#333";
        } else {
            return "#f5f5f5";
        }
    }

    formatHints.string.color = function (name, type, id, opts, required, priv, util) {
        util.events.rendered.handleOnce(function () {
            var content, color, contrastColor, input = $("#" + id),
            colors = [
                ["#c82829", "#f5871f", "#eab700", "#718c00", "#3e999f", "#4271ae", "#8959a8"],
                ["#cc6666", "#de935f", "#f0c674", "#b5bd68", "#8abeb7", "#81a2be", "#b294bb"],
                ["#111111", "#3B3131", "#463E3F", "#504A4B", "#5C5858", "#666362", "#726E6D"],
                ["#837E7C", "#B6B6B4", "#BCC6CC", "#000080", "#15317E", "#0000A0", "#0041C2"],
                ["#1569C7", "#1F45FC", "#1589FF", "#82CAFF", "#78C7C7", "#6CC417", "#52D017"],
                ["#54C571", "#85BB65", "#B2C248", "#CCFB5D", "#BCE954", "#EDE275", "#FFFF00"],
                ["#FFEBCD", "#ECE5B6", "#FFDB58", "#FDD017", "#F2BB66", "#FBB117", "#E9AB17"],
                ["#DEB887", "#C9BE62", "#EE9A4D", "#D4A017", "#F87431", "#FF8040", "#FF7F50"],
                ["#F9966B", "#E18B6B", "#F75D59", "#E55B3C", "#F70D1A", "#E42217", "#DC381F"],
                ["#C34A2C", "#C24641", "#7F4E52", "#C5908E", "#EDC9AF", "#E38AAE", "#F6358A"],
                ["#F535AA", "#CA226B", "#C12283", "#4B0082", "#6A287E", "#6C2DC7", "#7F38EC"],
                ["#A23BEC", "#9E7BFF", "#C8A2C8", "#F9B7FF", "#E3E4FA", "#FFFFFF", "#FEFEFE"]
            ];

            if (opts.picker === "colorPicker") {
                input.click(function (event) {
                    mColorPicker.size = 3;
                    mColorPicker(event);
                });

                content = $.trim(input.val());
                if (content !== "") {
                    color = normalizeRGB(content);

                    if (color.ok) {
                        contrastColor = contrastTextColor(color.num.red,
                                                          color.num.green,
                                                          color.num.blue);

                        input.css({"background-color": "#" + color.str, "color": contrastColor});
                    }
                }
            } else {
                input.spectrum({
                    showInput: true,
                    allowEmpty: opts.allowEmpty,
                    showPaletteOnly: opts.showPaletteOnly,
                    showPalette: opts.showPalette,
                    showInitial: opts.showInitial,
                    palette: opts.palette || colors
                });
            }

        });

        return JsonEdit.defaults.formatters.default_(name, type, id, opts, required, util);
    };

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
