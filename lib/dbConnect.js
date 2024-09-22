import mongoose from 'mongoose';

const connString = process.env.MONGODB_URI;
if (!connString) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

let cached = { conn: null, promise: null };

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(connString, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default dbConnect;