import Elysia, { Static, t } from "elysia"
import { _register } from "./register.type"
import { _profile } from "./account.type"

export const _user = t.Object({
    ..._profile.properties,
})

export const UserDto = new Elysia().model({
    user: _user
})

export type user = Static<typeof _user>