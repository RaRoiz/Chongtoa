import swagger from "@elysiajs/swagger"

export const SwaggerConfig = swagger({
    path: '/api-doc',
    documentation: {
        info: {
            title: 'Elysia API',
            description: 'Elysia API Documentation',
            version: '1.0.0',
        },
        tags: [
            {
                name: 'Example API',
                description: 'Example API',
            }
        ]
    }
})