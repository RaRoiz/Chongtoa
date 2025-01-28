import Elysia from "elysia"

export const ExampleController = new Elysia({
    prefix: '/api/example',
    tags: ['Example API'],
})
    .get('/', () => {
        return {
            id: 456,
            content: 'Hello, Elysia!',
        }
    }, {
        details: {
            description: 'Get example data',
            summary: 'Get example data',
            tags: ['Example API'],
        }
    })