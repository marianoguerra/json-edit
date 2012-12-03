/*global define document window*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return (root.ColorPicker = factory());
        });
    } else {
        root.ColorPicker = factory();
    }
}(this, function () {
    "use strict";
    var
        toHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B",
            "C", "D", "E", "F"],
        SVG_NS = "http://www.w3.org/2000/svg",
        hueGradientStops = [
            {"offset": "0", "stop-color": "#ffef15", "stop-opacity": "1"},
            {"offset": "0.16105497", "stop-color": "#60ff18", "stop-opacity": "1"},
            {"offset": "0.35173747", "stop-color": "#02fff9", "stop-opacity": "1"},
            {"offset": "0.48789391", "stop-color": "#0202ff", "stop-opacity": "1"},
            {"offset": "0.70091939", "stop-color": "#fd00ca", "stop-opacity": "1"},
            {"offset": "0.83720928", "stop-color": "#ff1c1c", "stop-opacity": "1"},
            {"offset": "1", "stop-color": "#ff0000", "stop-opacity": "1"}
        ];

    function newSvgElement(name, attrs, parent) {
        var key, e = document.createElementNS(SVG_NS, name);

        for (key in attrs) {
            e.setAttribute(key, attrs[key]);
        }

        if (parent) {
            parent.appendChild(e);
        }

        return e;
    }

    function newHandle(id, x, y, width, height, stroke, fill, strokeWidth) {
        width = width || 5;
        height = height || 12;
        stroke = stroke || "#000000";
        fill = fill || "#ffffff";
        strokeWidth = strokeWidth || 1;

        return newSvgElement("rect", {
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
            style: "stroke: " + stroke + "; fill: " + fill +
                "; stroke-width: " + strokeWidth + "; cursor: pointer;"
        });
    }

    function byId(id, parent) {
        return (parent || document).getElementById(id);
    }

    function LinearGradient(id, stops) {
        var that = this;

        this.gradient = newSvgElement("linearGradient", {
            id: id
        });

        stops.forEach(function (stopAttrs) {
            that.gradient.appendChild(newSvgElement("stop", stopAttrs));
        });
    }

    LinearGradient.prototype = {
        addToParent: function (parent) {
            parent.appendChild(this.gradient);
        }
    };

    function Handle(id, x, y, xMin, xMax, onMove, width, height, parentX) {
        var
            dx,
            that = this;

        this.handle = newHandle(id, x, y, width, height);
        this.id = id;
        this.x = x;
        this.y = y;
        this.xMin = xMin;
        this.xMax = xMax;
        this.range = this.xMax - this.xMin;
        this.onMove = onMove;
        this.parentX = parentX;

        function mousemoveListener(evt) {
            that.setX(evt.clientX - parentX);
        }

        function mouseupListener(evt) {
            document.removeEventListener("mousemove", mousemoveListener, true);
            document.removeEventListener("mouseup", mouseupListener, true);
        }

        function mousedownListener(evt) {
            dx = that.handle.x.baseVal.value - evt.clientX;
            document.addEventListener("mousemove", mousemoveListener, true);
            document.addEventListener("mouseup", mouseupListener, true);
        }

        this.handle.addEventListener("mousedown", mousedownListener, false);
    }

    Handle.prototype = {
        addToParent: function (parent) {
            parent.appendChild(this.handle);
        },
        setX: function (x) {
            var id;

            if (x > this.xMax || x < this.xMin) {
                return;
            }

            id = this.handle.ownerSVGElement.suspendRedraw(1000);
            this.handle.x.baseVal.value = x;
            this.handle.ownerSVGElement.unsuspendRedraw(id);
            this.onMove(x);
        },
        setValue: function (value) {
            this.setX(this.x + (value / 100.0 * this.range));
        },
        getValue: function () {
            return (this.handle.x.baseVal.value - this.x) / this.range;
        }
    };

    function Range(id, x, y, width, height, onHandleMove, gradientId,
                   parentX, stroke, strokeWidth) {

        var that = this;

        this.handle = new Handle(id + "-handle", x, y - 1, x, x + width - 5,
                                 onHandleMove, 5, height + 2, parentX);

        stroke = stroke || "#000000";
        strokeWidth = strokeWidth || 1;

        this.range = newSvgElement("rect", {
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
            style: "fill:url(#" + gradientId + "); stroke: " + stroke +
                "; stroke-width: " + strokeWidth + ";",
            onmousedown: "return false"
        });

        this.range.addEventListener("mouseup", function (event) {
            that.handle.handle.x.baseVal.value = event.clientX - parentX;
            onHandleMove(event.clientX - parentX);
        });
    }

    Range.prototype = {
        addToParent: function (parent) {
            parent.appendChild(this.range);
            this.handle.addToParent(parent);
        },
        setValue: function (position) {
            this.handle.setValue(position);
        },
        getValue: function () {
            return this.handle.getValue();
        }
    };

    function ColorPicker(container, x, y, newHue, newSaturation, newLightness,
                         width, height) {
        var
            that = this,
            stamp = Date.now(),
            defs,
            parentX = parseInt(container.getAttribute("x") || "0", 10),

            hueGradient,

            lightGradient,
            lightGradientMiddle,

            saturationGradient,
            saturationGradientMiddle,
            saturationGradientEnd;

        function ns(id) {
            return id + "-" + stamp;
        }

        width = width || 320;
        height = height || 10;
        newHue = (newHue === undefined) ? 0 : newHue;
        newLightness = (newLightness === undefined) ? 50 : newLightness;
        newSaturation = (newSaturation === undefined) ? 100 : newSaturation;

        this.currentColor = newSvgElement("rect", {
            x: x + width + height,
            y: y,
            width: height * 3,
            height: height * 5,
            style: "stroke: #000000; fill: hsl(60, 100%, 50%); stroke-width: 1;",
            onmousedown: "return false"
        });

        container.appendChild(this.currentColor);

        function updateCurrentColor() {
            var color = "hsl(" + newHue + ", " + newSaturation + "%, " +
                newLightness + "%)";

            that.currentColor.style.fill = color;
        }

        function onHueHandleMove(newX) {
            newHue = ((newX - x) / width * 320) + 55;
            lightGradientMiddle.setAttribute("stop-color",
                                      "hsl(" + newHue + ", 100%, 50%)");
            saturationGradientMiddle.setAttribute("stop-color",
                                      "hsl(" + newHue + ", 50%, 50%)");
            saturationGradientEnd.setAttribute("stop-color",
                                      "hsl(" + newHue + ", 100%, 50%)");
            updateCurrentColor();
        }

        function onLightHandleMove(newX) {
            newLightness = (newX - x) / width * 100;
            updateCurrentColor();
        }

        function onSaturationHandleMove(newX) {
            newSaturation = (newX - x - 2) / width * 100;
            updateCurrentColor();
        }

        this.hueBar = new Range(ns("hue-bar"), x, y, width, height,
                                  onHueHandleMove, ns("hue-gradient"),
                                  parentX);
        this.lightBar = new Range(ns("light-bar"), x, y + (height * 2),
                                  width, height,
                                  onLightHandleMove, ns("light-gradient"),
                                  parentX);
        this.saturationBar = new Range(ns("saturation-bar"),
                                  x, y + (height * 4), width, height,
                                  onSaturationHandleMove,
                                  ns("saturation-gradient"),
                                  parentX);

        defs = newSvgElement("defs", {}, container);

        lightGradient = new LinearGradient(ns("light-gradient"), [
            {
                id: ns("light-gradient-start"),
                offset: "0",
                "stop-color": "hsl(60, 100%, 0%)",
                "stop-opacity": "1"
            },
            {
                id: ns("light-gradient-middle"),
                offset: "0.5",
                "stop-color": "hsl(60, 100%, 50%)",
                "stop-opacity": "1"
            },
            {
                id: ns("light-gradient-end"),
                offset: "1",
                "stop-color": "hsl(60, 100%, 100%)",
                "stop-opacity": "1"
            }
        ]);

        saturationGradient = new LinearGradient(ns("saturation-gradient"), [
            {
                id: ns("saturation-gradient-start"),
                offset: "0",
                "stop-color": "hsl(60, 0%, 50%)",
                "stop-opacity": "1"
            },
            {
                id: ns("saturation-gradient-middle"),
                offset: "0.5",
                "stop-color": "hsl(60, 50%, 50%)",
                "stop-opacity": "1"
            },
            {
                id: ns("saturation-gradient-end"),
                offset: "1",
                "stop-color": "hsl(60, 100%, 50%)",
                "stop-opacity": "1"
            }
        ]);

        hueGradient = new LinearGradient(ns("hue-gradient"), hueGradientStops);

        hueGradient.addToParent(defs);
        lightGradient.addToParent(defs);
        saturationGradient.addToParent(defs);

        lightGradientMiddle      = byId(ns("light-gradient-middle"), container);
        saturationGradientMiddle = byId(ns("saturation-gradient-middle"), container);
        saturationGradientEnd    = byId(ns("saturation-gradient-end"), container);

        this.hueBar.addToParent(container);
        this.lightBar.addToParent(container);
        this.saturationBar.addToParent(container);

        this.setHSL(newHue, newSaturation, newLightness);
    }

    ColorPicker.prototype = {
        _getFillColor: function () {
            return this.currentColor.style.fill;
        },
        getColorRGBArray: function () {
            var red, green, blue, fillColor = this._getFillColor();

            if (fillColor.charAt(0) === "#") {
                red = fillColor.slice(1, 3);
                green = fillColor.slice(3, 5);
                blue = fillColor.slice(5, 7);

                return [parseInt(red, 16),
                    parseInt(green, 16),
                    parseInt(blue, 16)];
            } else {
                return this._getFillColor()
                    .slice(4, -1)
                    .split(", ")
                    .map(function (item) {
                        return parseInt(item, 10);
                    });
            }
        },
        getColorRGB: function () {
            var fillColor = this._getFillColor();

            if (fillColor.charAt(0) === "#") {
                return fillColor;
            } else {
                return "#" + this.getColorRGBArray()
                    .map(function (item) {
                        var
                            value = parseInt(item, 10),
                            first = value % 16,
                            second = Math.floor(value / 16);

                        return toHex[second] + toHex[first];
                    })
                    .join("");
            }
        },

        getColorHSLArray: function () {
            return [this.hueBar.getValue(), this.saturationBar.getValue(),
                this.lightBar.getValue()];
        },
        getColorHSL: function () {
            var hue, saturation, light, array;
            array = this.getColorHSLArray();
            hue = ("" + (array[0] * 100)).slice(0, 8);
            saturation = ("" + (array[1] * 100)).slice(0, 8) + "%";
            light = ("" + (array[2] * 100)).slice(0, 8) + "%";

            return "hsl(" + [hue, saturation, light].join(", ") + ")";
        },
        setHSL: function (hue, saturation, lightness) {
            this.hueBar.setValue(hue);
            this.lightBar.setValue(lightness);
            this.saturationBar.setValue(saturation);
        }
    };

    return ColorPicker;
}));
