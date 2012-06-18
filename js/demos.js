var demos = [
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
