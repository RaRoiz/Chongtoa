import Elysia, { Static, t } from "elysia"
import { _register } from "./register.type"


export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    username: t.String(),
    display_name: t.String(),
    phone: t.Optional(t.String()),
    email: t.Optional(t.String()),
    created_at: t.Optional(t.Date()),
    updated_at: t.Optional(t.Date()),
    age: t.Optional(t.String()),
})

export const _user = t.Object({
    ..._profile.properties,
})

export const UserDto = new Elysia().model({
    user: _user
})

export const _updateProfile = t.Omit(_profile, ['id', 'username', 'updated_at', 'created_at', 'age'])

export type updateProfile = Static<typeof _updateProfile>
export type user = Static<typeof _user>