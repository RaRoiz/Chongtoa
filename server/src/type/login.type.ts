import { t } from "elysia"

export const _login = t.Object({
    username: t.String(),
    password: t.String(),
})
