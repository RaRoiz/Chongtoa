import Elysia from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"
import { UserService } from "../services/user.service"
import { AccountDto } from "../types/account.type"
import { UserDto } from "../types/user.type"

export const UserController = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(AuthMiddleWare)
    .use(UserDto)

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPlayload).id // get user_id from token
            await UserService.updateProfile(body, user_id)
            set.status = 204 // success
        } catch (error) {
            set.status = 400 // bad request
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500 // internal server error
            throw new Error('Something went wrong, try again later')
        }
    }, {
        detail: { summary: 'Update profile' },
        body: "update_profile",
        isSignIn: true,
    })