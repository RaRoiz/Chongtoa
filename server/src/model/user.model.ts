import mongoose from "mongoose"
import { IUserDocument, IUserModel } from "../interface/user.interface"
import { register } from "../types/account.type"
import { calculateAge } from "../helper/date.helper"
import { user } from "../types/user.type"

const schema = new mongoose.Schema<IUserDocument, IUserModel>({
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    display_name: { type: String },
    email: { type: String },
    date_of_birth: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

schema.methods.toUser = function (): user {
    let ageString = 'N/A'

    if (this.date_of_birth) {
        ageString = `${calculateAge(this.date_of_birth)}`
    }
    return {
        id: this.id.toString(),
        display_name: this.display_name,
        username: this.username,
        created_at: this.created_at,
        updated_at: this.updated_at,
        age: ageString,
        phone: this.phone,
        // date_of_birth: this.date_of_birth,
        email: this.email
    }
}

schema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return await Bun.password.verify(password, this.password_hash)
}
schema.statics.createUser = async function (registerData: register): Promise<IUserDocument> {
    const newUser = await new this({
        display_name: registerData.display_name,
        username: registerData.username,
        password_hash: await Bun.password.hash(registerData.password),
        date_of_birth: registerData.date_of_birth,
    })
    await newUser.save()
    return newUser
}

export const User = mongoose.model<IUserDocument, IUserModel>("User", schema)
