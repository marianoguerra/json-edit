/*global window define*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.demos = factory());
        });
    } else {
        // Browser globals
        root.demos = factory();
    }
}(this, function () {
    "use strict";
    return [
        [
            "tabs hint (addon)",
            "",
            {
                "order": ["name", "location", "interests"],
                "required": ["name"],
                "je:hint": "tabs",
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    },
                    "location": {
                        "type": "object",
                        "title": "Location",
                        "order": ["city", "state", "country"],
                        "properties": {
                            "city": {
                                "type": "string",
                                "title": "City"
                            },
                            "state": {
                                "type": "string",
                                "title": "State"
                            },
                            "country": {
                                "type": "string",
                                "title": "Country"
                            }
                        }
                    },
                    "interests": {
                        "title": "Interests",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "order": ["name", "description"],
                            "required": ["name"],
                            "properties": {
                                "name": {"type": "string", "title": "Name"},
                                "description": {"type": "string", "title": "Description"}
                            }
                        }
                    }
                }
            }
        ],
        [
            "color hint (addon)",
            "",
            {
                "order": ["color"],
                "properties": {
                    "color": {
                        "type": "string",
                        "title": "Color",
                        "je:hint": "color"
                    }
                }
            }
        ],
        [
            "date hint (addon)",
            "",
            {
                "order": ["date"],
                "properties": {
                    "date": {
                        "type": "string",
                        "title": "Birthday",
                        "je:hint": "date"
                    }
                }
            }
        ],
        [
            "date hint with format (addon)",
            "",
            {
                "order": ["date"],
                "properties": {
                    "date": {
                        "type": "string",
                        "title": "Birthday",
                        "je:hint": "date",
                        "je:format": "dd-mm-yy"
                    }
                }
            }
        ],
        [
            "autocomplete hint (addon)",
            "",
            {
                "order": ["language"],
                "properties": {
                    "language": {
                        "type": "string",
                        "title": "Programming Language",
                        "je:hint": "autocomplete",
                        "je:availableValues": ["C", "C++", "Python", "Scheme", "Lisp"]
                    }
                }
            }
        ],
        [
            "tags hint (addon)",
            "",
            {
                "order": ["languages"],
                "properties": {
                    "languages": {
                        "type": "array",
                        "je:hint": "tags",
                        "default": ["C", "Python"],
                        "title": "Programming Languages",
                        "je:allowAdd": true,
                        "je:availableValues": ["C", "C++", "Python", "Scheme", "Lisp"],
                        "items": {
                            "type": "string"
                        }
                    }
                }
            }
        ],
        [
            "tags hint, max, min, don't allow add (addon)",
            "",
            {
                "order": ["languages"],
                "properties": {
                    "languages": {
                        "type": "array",
                        "je:hint": "tags",
                        "default": ["C", "Python"],
                        "title": "Programming Languages",
                        "maxItems": 3,
                        "minItems": 1,
                        "items": {
                            "type": "string",
                            "enum": ["C", "C++", "Python", "Scheme", "Lisp"]
                        }
                    }
                }
            }
        ],
        [
            "Password hint (addon)",
            "",
            {
                "order": ["password"],
                "properties": {
                    "password": {
                        "type": "string",
                        "je:hint": "password",
                        "title": "Password",
                        "default": "secret"
                    }
                }
            }
        ],
        [
            "Simple field",
            "",
            {
                "order": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    }
                }
            }
        ],
        [
            "Field with default",
            "",
            {
                "order": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name",
                        "default": "bob"
                    }
                }
            }
        ],
        [
            "Field with pattern",
            "",
            {
                "order": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name",
                        "default": "bob",
                        "pattern": "[a-zA-Z]+"
                    }
                }
            }
        ],
        [
            "Field with minLength and maxLength",
            "try writing more than 10 characters (minLength is checked on validation)",
            {
                "order": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name",
                        "default": "bob",
                        "minLength": 3,
                        "maxLength": 10
                    }
                }
            }
        ],
        [
            "Numeric required field",
            "",
            {
                "order": ["age"],
                "required": ["age"],
                "properties": {
                    "age": {
                        "type": "number",
                        "title": "Age"
                    }
                }
            }
        ],
        [
            "Numeric with maximum and minimum",
            "",
            {
                "order": ["age"],
                "required": ["age"],
                "properties": {
                    "age": {
                        "type": "number",
                        "title": "Age",
                        "maximum": 100,
                        "minimum": 18
                    }
                }
            }
        ],
        [
            "Numeric with exclusive maximum and minimum",
            "",
            {
                "order": ["age"],
                "required": ["age"],
                "properties": {
                    "age": {
                        "type": "number",
                        "title": "Age",
                        "maximum": 100,
                        "minimum": 18,
                        "exclusiveMaximum": true,
                        "exclusiveMinimum": true
                    }
                }
            }
        ],
        [
            "Boolean field",
            "",
            {
                "order": ["sure"],
                "properties": {
                    "sure": {
                        "type": "boolean",
                        "title": "Are you sure?"
                    }
                }
            }
        ],
        [
            "order not provided",
            "gets keys in any order",
            {
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    },
                    "city": {
                        "type": "string",
                        "title": "City",
                        "description": "city were you live",
                        "maxLength": 20
                    }
                }
            }
        ],
        [
            "nested objects",
            "",
            {
                "order": ["name", "location"],
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    },
                    "location": {
                        "type": "object",
                        "title": "Location",
                        "order": ["city", "state", "country"],
                        "properties": {
                            "city": {
                                "type": "string",
                                "title": "City"
                            },
                            "state": {
                                "type": "string",
                                "title": "State"
                            },
                            "country": {
                                "type": "string",
                                "title": "Country"
                            }
                        }
                    }
                }
            }
        ],
        [
            "more nested objects",
            "",
            {
                "order": ["name", "location", "interests"],
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    },
                    "location": {
                        "type": "object",
                        "title": "Location",
                        "order": ["city", "state", "country"],
                        "properties": {
                            "city": {
                                "type": "string",
                                "title": "City"
                            },
                            "state": {
                                "type": "string",
                                "title": "State"
                            },
                            "country": {
                                "type": "string",
                                "title": "Country"
                            }
                        }
                    },
                    "interests": {
                        "title": "Interests",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "order": ["name", "description"],
                            "required": ["name"],
                            "properties": {
                                "name": {"type": "string", "title": "Name"},
                                "description": {"type": "string", "title": "Description"}
                            }
                        }
                    }
                }
            }
        ],
        [
            "Two fields, required, description and maxLength",
            "",
            {
                "order": ["name", "city"],
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name"
                    },
                    "city": {
                        "type": "string",
                        "title": "City",
                        "description": "city were you live",
                        "maxLength": 20
                    }
                }
            }
        ],
        [
            "Field with enumerated values",
            "see how the empty option is at the top since it's not required",
            {
                "order": ["color"],
                "properties": {
                    "color": {
                        "type": "string",
                        "title": "Color",
                        "enum": ["red", "green", "blue"]
                    }
                }
            }
        ],
        [
            "Field with enumerated values and default",
            "",
            {
                "order": ["color"],
                "properties": {
                    "color": {
                        "type": "string",
                        "title": "Color",
                        "default": "green",
                        "enum": ["red", "green", "blue"]
                    }
                }
            }
        ],
        [
            "Field with required enumerated values and default",
            "",
            {
                "order": ["color"],
                "required": ["color"],
                "properties": {
                    "color": {
                        "type": "string",
                        "title": "Color",
                        "default": "green",
                        "enum": ["red", "green", "blue"]
                    }
                }
            }
        ],
        [
            "Array",
            "",
            {
                "order": [
                    "nums"
                ],
                "properties": {
                    "nums": {
                        "type": "array",
                        "title": "Nums",
                        "uniqueItems": true,
                        "items": {
                            "type": "number"
                        }
                    }
                }
            }
        ],
        [
            "Array with default",
            "",
            {
                "order": [
                    "nums"
                ],
                "properties": {
                    "nums": {
                        "type": "array",
                        "title": "Nums",
                        "default": [1, 2, 3],
                        "items": {
                            "type": "number"
                        }
                    }
                }
            }
        ],
        [
            "Array with minItems",
            "try removing an item when there are 3, try the same with clear",
            {
                "order": [
                    "nums"
                ],
                "properties": {
                    "nums": {
                        "type": "array",
                        "title": "Nums",
                        "minItems": 3,
                        "items": {
                            "type": "number"
                        }
                    }
                }
            }
        ],
        [
            "Array with minItems and default",
            "",
            {
                "order": [
                    "nums"
                ],
                "properties": {
                    "nums": {
                        "type": "array",
                        "title": "Nums",
                        "minItems": 2,
                        "default": [1, 2, 3],
                        "items": {
                            "type": "number"
                        }
                    }
                }
            }
        ],
        [
            "Array with minItems and maxItems",
            "try removing an item when there are 3 or adding more than 5 ",
            {
                "order": [
                    "nums"
                ],
                "properties": {
                    "nums": {
                        "type": "array",
                        "title": "Nums",
                        "minItems": 3,
                        "maxItems": 5,
                        "items": {
                            "type": "number"
                        }
                    }
                }
            }
        ]
    ];
}));
