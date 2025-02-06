import Elysia from "elysia"
import { AuthMiddleWare, AuthPlayload } from "../middlewares/auth.middleware"

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
// .patch('/', async ({ body, set, Auth }) => {
//     try {
//         const user_id = (Auth.payload as AuthPlayload).id //get user_id from token
//         await UserService.updateProfile(body, (Auth.payload as AuthPlayload).id)
//         set.status = 204 //success
//     } catch (error) {
//         set.status = 400 //bad request
//         if (error instanceof Error)
//             throw new Error(error.message)
//         set.status = 500 // internal server error
//         throw new Error('Something went wrong, try agian later')
//     }
// }, {
//     detail: { summary: 'Update profile' },
//     body: "update_profile",
//     // response: "user",
//     isSignIn: true,
// })