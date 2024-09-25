import swaggerJsdoc from "swagger-jsdoc";

export const swaggerDocument = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Master",
            version: "1.0.0",
            description:
                "Essa API suportar vários projetos desenvolvidos com várias funcionalidades por causa do banco de dados aceitar apenas um servidor",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
});
