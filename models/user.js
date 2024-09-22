import mongoose from 'mongoose';

//Include virtual properties in JSON outputs
const options = { toJSON: { virtuals: true } };

const userSchema = mongoose.Schema({
    firstName: {
        minLength: [1, 'First name can\'t have less than 1 characters.'],
        maxLength: [100, 'First name can\'t have more than 100 characters.'],
        required: [true, 'First name is required.'],
        type: String,
    },
    lastName: {
        minLength: [1, 'Last name can\'t have less than 1 characters.'],
        maxLength: [100, 'Last name can\'t have more than 100 characters.'],
        required: [true, 'Last name is required.'],
        type: String,
    },
    email: {
        minLength: [3, 'Email can\'t have less than 3 characters.'],
        maxLength: [100, 'Email can\'t have more than 100 characters.'],
        required: [true, 'Email is required.'],
        type: String,
        unique: [true, 'Email is in use.'],
    },
    hashedPassword: {
        required: [true, 'Hashed password is required.'],
        type: String,
    },
}, options);

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

export default mongoose.models.User || mongoose.model('User', userSchema);