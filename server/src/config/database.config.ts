import mongoose from "mongoose"

const user = Bun.env.MONGO_USER || 'name_mongo'
const password = Bun.env.MONGO_PASSWORD || 'password_mongo'
const db_name = Bun.env.MONGO_DB_NAME || 'Chong-Toa'

const url = `mongodb+srv://${user}:${password}@cluster0.y4nom.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const Database = {
    connect: async () => {
        try {
            await mongoose.connect(url)
            console.log('-- Database connected ✅ --')
        } catch (error) {
            console.error('Database connection error ❎:', error)
            console.error('error', error)
        }
    }
}