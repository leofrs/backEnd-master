import swaggerJsdoc from "swagger-jsdoc";

export const swaggerDocument = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Master",
            version: "1.0.0",
            description:
                "Essa API tem o intuito de ser uma central para projetos desenvolvidos em modo de teste. Ela vai conter vários recursos para diferentes aplicações",
        },
        servers: [
            {
                url: "https://back-end-master.vercel.app/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
});
