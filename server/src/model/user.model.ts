import mongoose from "mongoose"
import { IUserDocument, IUserModel } from "../interface/user.interface"
import { user } from "../type/accouny.type"
import { calculateAge } from "../helper/date.helper"

const schema = new mongoose.Schema<IUserDocument, IUserModel>({
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    display_name: { type: String },
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
