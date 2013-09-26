/*global window define alert*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['module', 'jquery', 'jqueryui', 'json.edit', 'json.schema', 'nsgen',
               'dustjs'],
               function (module, $, $ui, JsonEdit, JsonSchema, NsGen, Dust) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.JsonEdit = factory(module, $, $ui, JsonEdit,
                                            JsonSchema, NsGen, Dust));
        });
    } else {
        // Browser globals
        // TODO: send module.uri in some way
        root.JsonEdit = factory(null, root.$, root.$, root.JsonEdit,
                                root.JsonSchema, root.NsGen, root.dust);
    }
}(this, function (module, $, $ui, JsonEdit, JsonSchema, NsGen, Dust) {
    "use strict";
    var formatHints = JsonEdit.defaults.hintedFormatters,
        collectHints = JsonEdit.defaults.hintedCollectors;

    formatHints.array = formatHints.array || {};

    formatHints.array.summarylist = function (name, type, id, opts, required,
                                              priv, util) {
        var
            modulePath = module.uri,
            moduleBasePath = modulePath.slice(0, modulePath.lastIndexOf("/") + 1),
            i,
            minItems,
            conf = opts["je:summarylist"],
            templateName = "summary" + (new Date()).getTime(),
            template = Dust.compile(conf.template, templateName),
            $cont,
            $list,
            $buttons,
            $emptyMsg,
            editImgPath   = moduleBasePath + "img/edit.png",
            removeImgPath = moduleBasePath + "img/remove.png",
            workingImgPath = moduleBasePath + "img/loading.gif",
            defaultValues = opts["default"] || [],
            addButton,
            widgetChilds;

        id = (typeof id === "string") ? id + "-sl" : id.attr("id") + "-sl";
        Dust.loadSource(template);

        if (typeof opts.minItems !== "number") {
            minItems = 1;
        } else {
            minItems = opts.minItems;
        }

        // if there are more default values than minItems then use that size to
        // initialize the items
        if (defaultValues.length > minItems) {
            minItems = defaultValues.length;
        }

        function linkButton(path, alt, onClick) {
            return {
                "a": {
                    "href": "#",
                    "$click": onClick,
                    "$childs": [
                        {
                            "img": {
                                "src": path,
                                "alt": alt,
                                "title": alt
                            }
                        }
                    ]
                }
            };
        }

        function button(label, onClick) {
            return {
                "button": {
                    "$click": onClick,
                    "$childs": label
                }
            };
        }

        function collectEditItem(schema, isEdit, showItemsAfterCollect, onEditSucceeded) {
            var
                errors,
                editor = $cont.children(".summary-item-editor"),
                result = priv.collectField(name, editor, schema),
                newData = result.data;

            if (result.result.ok) {
                onEditSucceeded(newData, function () {
                    editor.remove();

                    if (showItemsAfterCollect) {
                        $list.show();
                        $buttons.show();
                        $emptyMsg.show();
                    }
                });
            } else {
                errors = priv.getErrors(result.result);
                JsonEdit.defaults.displayError(errors.join("\n"));
                JsonEdit.defaults.log("summary list error", result);
            }
        }

        function editItem(schema, isEdit, onEditOkClick, onEditCancelClick) {
            var
                editor = $.lego(priv.input(name, opts.items.type, id + "-item", schema, false, util)),
                buttons = {
                    "div": {
                        "class": "summary-edit-buttons",
                        "$childs": [
                            button("Ok", onEditOkClick),
                            button("Cancel", onEditCancelClick)
                        ]
                    }
                },
                cont = {
                    "div": {
                        "class": "summary-item-editor",
                        "$childs": [
                            editor,
                            buttons
                        ]
                    }
                };

            $list.hide();
            $buttons.hide();
            $emptyMsg.hide();
            $cont.prepend($.lego(cont));
        }

        function onEditCancelClick() {
            $cont.children(".summary-item-editor").remove();
            $list.show();
            $buttons.show();
            $emptyMsg.show();
        }

        function setWorking(isWorking, withErrors) {
            // they don't control the means of production
            var workingClass = "summarylist-working";

            if (isWorking) {
                if (!$cont.hasClass(workingClass)) {
                    $cont.children().hide();
                    $cont
                        .prepend("<img src='" + workingImgPath + "' alt='working' class='summarylist-working-image'>")
                        .addClass(workingClass);
                }
            } else if ($cont.hasClass(workingClass)) {
                $(".summarylist-working-image").remove();

                $cont.removeClass(workingClass);

                if (withErrors) {
                    $cont.children(".summary-item-editor").show();
                } else {
                    $cont.children(".summary-item-editor").remove();
                    $cont.children().show();
                }
            }
        }

        function addItem(itemId, data, schema, onItemAdded) {

            function onEditOkClick(id) {
                var showListAfterCollect = conf.onEdit === undefined;

                collectEditItem(schema, true, showListAfterCollect, function (newData, closeForm) {
                    var
                        storedData = $("#" + id).data("data"),
                        mergedData = $.extend({}, storedData, newData);

                    function defaultHandler(add, userNewData) {
                        if (add) {
                            var
                                dataToSet,
                                dataItem = $("#" + id),
                                itemData = dataItem.data("data");

                            if (userNewData !== undefined) {
                                dataToSet = userNewData;
                            } else {
                                dataToSet = newData;
                            }

                            // attach the new data
                            // extend an empty object with the old data and then the
                            // new to preserve fields that are in the original object
                            // but not in the form
                            dataItem.data("data", $.extend({}, itemData, dataToSet));

                            // rerender the list item summary text and replace it
                            Dust.render(templateName, newData, function (err, text) {
                                dataItem.find(".summary-text").html(text);
                            });

                            util.events.array.item.edited.fire(name, newData, itemData, schema, {listItem: dataItem});
                        }

                        setWorking(false);
                        closeForm();
                    }

                    if (conf.onEdit) {
                        conf.onEdit(name, mergedData, defaultHandler, setWorking, schema);
                    } else {
                        defaultHandler(true);
                    }
                });
            }

            function onEditClick(event, id) {
                var
                    itemData = $("#" + id).data("data"),
                    itemOpts = $.extend({}, opts.items, {"default": itemData});

                editItem(itemOpts, true, function () {
                    onEditOkClick(id);
                }, onEditCancelClick);

                event.preventDefault();
            }

            function onRemoveClick(event, id) {
                var
                    dataItem = $("#" + id),
                    itemData = dataItem.data("data");

                function defaultHandler(remove) {
                    if (remove) {
                        dataItem.remove();

                        util.events.array.item.removed.fire(name, itemData, schema, {listItem: dataItem});
                    }

                    setWorking(false);
                }

                if (conf.onRemove) {
                    conf.onRemove(name, itemData, defaultHandler, setWorking, schema);
                } else {
                    defaultHandler(true);
                }

                event.preventDefault();
            }

            Dust.render(templateName, data, function (err, text) {
                var
                    listItem,
                    id = "summary-item-" + itemId,
                    summary = {
                        "span": {
                            "class": "summary-text",
                            "$childs": text
                        }
                    },
                    editButton = linkButton(editImgPath, "edit", function (event) {
                        onEditClick(event, id);
                        util.events.rendered.fire();
                    }),
                    removeButton = linkButton(removeImgPath, "remove", function (event) {
                        onRemoveClick(event, id);
                    }),
                    buttonChilds = [],
                    buttons = {
                        "span": {
                            "class": "summary-buttons",
                            "$childs": buttonChilds
                        }
                    },
                    tpl = {
                        "div": {
                            "id": id,
                            "@data": data,
                            "class": "summary-item",
                            "$childs": [
                                summary,
                                buttons
                            ]
                        }
                    };

                if (conf.allowEdit !== false) {
                    buttonChilds.push(editButton);
                }

                if (conf.allowRemove !== false) {
                    buttonChilds.push(removeButton);
                }

                listItem = $.lego(tpl);

                $list.append(listItem);

                if (onItemAdded) {
                    onItemAdded(listItem);
                }

                // remove the empty message if it's there
                $list.parent().find(".summary-empty-msg").remove();
            });
        }

        function onAddClick(schema) {
            function onEditOkClick() {
                var showListAfterCollect = conf.onAdd === undefined;

                collectEditItem(schema, false, showListAfterCollect, function (newData, closeForm) {
                    function defaultHandler(add, userNewData) {
                        var
                            dataToSet,
                            itemId = id + "_" + (new Date()).getTime();

                        if (userNewData !== undefined) {
                            dataToSet = userNewData;
                        } else {
                            dataToSet = newData;
                        }

                        if (add) {
                            addItem(itemId, dataToSet, schema, function (listItem) {
                                util.events.array.item.created.fire(name,
                                                        dataToSet, schema,
                                                        {listItem: listItem});
                            });
                        }

                        setWorking(false);
                        closeForm();
                    }

                    if (conf.onAdd) {
                        conf.onAdd(name, newData, defaultHandler, setWorking, schema);
                    } else {
                        defaultHandler(true);
                    }
                });
            }

            editItem(schema, true, onEditOkClick, onEditCancelClick);
        }

        util.events.rendered.handleOnce(function () {
            var i;

            $cont = $("#" + id);
            $list = $("#" + id + "-list");
            $buttons = $cont.children(".summary-action-buttons");
            $emptyMsg = $cont.children(".summary-empty-msg");

            for (i = 0; i < defaultValues.length; i += 1) {
                addItem(id + "_" + i, defaultValues[i], opts.items);
            }
        });

        widgetChilds = [{
            "div": {
                "class": "summary-list",
                "id": id + "-list",
                "$childs": []
            }
        }];

        if (conf.allowAdd !== false) {
            addButton = button("Add", function () {
                onAddClick(opts.items);
                util.events.rendered.fire();
            });

            widgetChilds.unshift({
                "div": {
                    "class": "summary-action-buttons",
                    "style": "display: table; width: 100%; text-align: right;",
                    "$childs": addButton
                }
            });
        }

        if (defaultValues.length === 0 && conf.noItemsMsg) {
            widgetChilds.unshift({
                "div": {
                    "class": "summary-empty-msg",
                    "style": "display: table; width: 100%; text-align: center;",
                    "$childs": conf.noItemsMsg
                }
            });
        }

        return {
            "div": {
                "id": id,
                "class": "je-hint-summarrylist-cont je-custom-cont",
                "$childs": widgetChilds
            }
        };
    };

    collectHints.array = collectHints.array || {};

    collectHints.array.summarylist = function (key, field, schema, priv) {
        var
            data = field.find(".summary-list:first>.summary-item")
                .map(function (i, item) {
                    return $(item).data("data");
                }).toArray(),
            arrayResult = JsonSchema.validate(key, data, schema, false);

        return {result: arrayResult, data: data};
    };

    return JsonEdit;
}));
