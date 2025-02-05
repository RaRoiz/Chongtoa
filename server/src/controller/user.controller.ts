import Elysia from "elysia"
import { AuthMiddleWare } from "../middlewares/auth.middleware"

export const UserController = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(AuthMiddleWare)
    .get('/all', () => {
        return {
            user: [
                {id:'1', name: 'Kai'},
                {id:'2', name: 'mairu'},
            ]
        }
    })