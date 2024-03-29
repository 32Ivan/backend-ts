const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tasks API",
            version: "1.0.0",
            description: "A simple express library API"
        },
        servers: [
            {
                url: `http://localhost:${SERVER_PORT}`
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
};
