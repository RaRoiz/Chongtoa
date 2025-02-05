import Elysia from "elysia"
import { AuthMiddleWare } from "../middlewares/auth.middleware"

export const UserController = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(AuthMiddleWare)
    .get('/all', () => {
        return {
            username: "",
            password: "",
            display_name: "",
            date_of_birth: "",
            phone: "",
            email: ""
        }
    })