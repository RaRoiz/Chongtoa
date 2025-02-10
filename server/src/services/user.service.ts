import { User } from "../model/user.model"
import { updateProfile, user } from "../types/user.type"

export const UserService = {

    getByUserName: async function (username: string): Promise<user> {
        const user = await User.findOne({ username })
            .populate("photos")
            .exec()
        if (user)
            return user.toUser()
        throw new Error(`username: "${username}" is not found !!`)
    },

    updateProfile: async function (newProfile: updateProfile, user_id: string): Promise<user> {
        const user = await User.findByIdAndUpdate(user_id, { $set: newProfile }, { new: true, runValidators: true })
        if (user)
            return user.toUser()
        throw new Error('Something went wrong,try agian later !!')
    }
}