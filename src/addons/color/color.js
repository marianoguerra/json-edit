/*global window define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen',
               'colorPicker'],
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
            var content, color, contrastColor, input = $("#" + id);

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

        });

        return JsonEdit.defaults.formatters.default_(name, type, id, opts, required, util);
    };

    // no need for collectHints since it's a common input field
    return JsonEdit;
}));
