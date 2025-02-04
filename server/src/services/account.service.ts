
import { User } from "../model/user.model"
import { login, register } from "../types/account.type"
import { user } from "../types/user.type"

export const AccountService = {
    createNewUser: async function (registerData: register): Promise<user> {
        const user = await User.findOne({ username: registerData.username }).exec()
        if (user)
            throw new Error(`${registerData.username}username is use already`)
        const newUser = await User.createUser(registerData)
        return newUser.toUser()
    },
    login: async function (loginData: login): Promise<user> {
        const user = await User.findOne({ username: loginData.username })
            .exec()
        if (!user)
            throw new Error("User does not Real")
        const verifyPassword = await user.verifyPassword(loginData.password)
        if (!verifyPassword)
            throw new Error("Password is incrroect")
        return user.toUser()
    }

}