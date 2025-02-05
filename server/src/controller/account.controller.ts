import Elysia from "elysia"
import { jwtConfig } from "../config/jwt.config"
import { AccountDto } from "../types/account.type"
import { AccountService } from "../services/account.service"

export const AccountController = new Elysia({
    prefix: '/api/account',
    tags: ['Account']
})
    .use(jwtConfig)
    .use(AccountDto)

    .post('/login', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.login(body)
            const token = await jwt.sign({ id: user.id })
            return { token, user }
        } catch (error) {
            if (error instanceof Error) {
                set.status = 400
                throw new Error(error.message)
            }
            set.status = 500
            throw new Error('Internal server error')
        }
    }, {
        detail: { summary: 'Login', description: 'Login to the system' },
        body: 'login',
        response: 'account'
    })

    .post('/register', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.createNewUser(body)
            const token = await jwt.sign({ id: user.id })
            return { token, user }
        } catch (error) {
            if (error instanceof Error) {
                set.status = 400
                throw new Error(error.message)
            }
            set.status = 500
            throw new Error('Internal server error')
        }
    }, {
        body: "register",
        response: "account",
        detail: {
            summary: "Create new user 🤓"
        },
        beforeHandle: ({ body: { username, password }, set }) => {
            const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,9}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
            if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
                set.status = 400
                throw new Error(`Invalid username or password`)
            }
        },
    })
