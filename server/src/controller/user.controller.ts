import Elysia from "elysia"
import { AuthMiddleWare } from "../middlewares/auth.middleware"

export const UserController = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(AuthMiddleWare)
    .get('/all', () => {
        return {
            username: "muhaha",
            password: "P@ssw0rd",
            display_name: "Kai",
            date_of_birth: "1990-01-01",
            phone: "1234567890",
            email: "your_email@example.com"
        }
    })