import Elysia, { Static, t } from "elysia"
import { _register } from "./register.type"
import { _login } from "./login.type"

// export const _profile = t.Object({
//     ...t.Omit(_register, ['password']).properties,
//     id: t.String(),
//     created_at: t.Optional(t.Date()),
//     updated_at: t.Optional(t.Date()),
//     age: t.Optional(t.String()),
// })

//todo: imprement upload feature

// export const _user = t.Object({
//     ..._profile.properties,

// })

export const _account = t.Object({
    token: t.String(),
    // user: _user,
})

export const AccountDto = new Elysia().model({
    //request
    register: _register,
    login: _login,
    //response
    account: _account,
})

//todo: edit this function
export const _restaurantReview = t.Object({
    id: t.String(),
    rating: t.Number({ minimum: 0, maximum: 5 }),
    review: t.String(),
    visit_date: t.Date(),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),
})

// export type user = Static<typeof _user> //user without token
export type register = Static<typeof _register>
export type login = Static<typeof _login>