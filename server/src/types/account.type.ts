import Elysia, { Static, t } from "elysia"
import { _register } from "./register.type"
import { _login } from "./login.type"
import { _user } from "./user.type"

export const _account = t.Object({
    token: t.String(),
    user: _user
})

export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),
    age: t.Optional(t.String()),
})

export const AccountDto = new Elysia().model({
    register: _register,
    login: _login,
    account: _account
})



export type user = Static<typeof _user> //user without token
export type register = Static<typeof _register>
export type login = Static<typeof _login>