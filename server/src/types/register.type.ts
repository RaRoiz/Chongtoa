import { t } from "elysia"

export const _register = t.Object({
    username: t.String(),
    password: t.String(),
    display_name: t.String(),
    phone: t.String(),
    email: t.String(),
    date_of_birth: t.Optional(t.Date()),
})