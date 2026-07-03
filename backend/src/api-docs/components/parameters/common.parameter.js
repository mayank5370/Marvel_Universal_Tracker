module.exports = {

    IdParam: {
        name: "id",
        in: "path",
        required: true,
        schema: {
            type: "string",
        },
        description: "Unique resource identifier",
        example: "cmqv7392n0002uex0ao8d46cp",
    },

    PageParam: {
        name: "page",
        in: "query",
        required: false,
        schema: {
            type: "integer",
            default: 1,
            minimum: 1,
        },
        description: "Page number",
    },

    LimitParam: {
        name: "limit",
        in: "query",
        required: false,
        schema: {
            type: "integer",
            default: 10,
            minimum: 1,
            maximum: 100,
        },
        description: "Number of records per page",
    },

    SearchParam: {
        name: "q",
        in: "query",
        required: false,
        schema: {
            type: "string",
        },
        description: "Search keyword",
    },

    SortParam: {
        name: "sort",
        in: "query",
        required: false,
        schema: {
            type: "string",
            enum: [
                "latest",
                "importance",
            ],
        },
        description: "Sort order",
    },

};