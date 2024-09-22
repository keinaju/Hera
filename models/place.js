import mongoose from 'mongoose';

function isLengthTwo(array) {
    return array.length == 2;
}

//Include virtual properties in JSON outputs
const options = { toJSON: { virtuals: true } };

const placeSchema = mongoose.Schema({
    city: {
        minLength: [1, 'City must have at least 1 character.'],
        maxLength: [100, 'City can\'t have more than 100 characters.'],
        required: [true, 'City is required.'],
        type: String,
    },

    coordinates: {
        index: '2d',
        required: [true, 'Coordinates are required.'],
        type: [Number], // [longitude, latitude]
        validate: [isLengthTwo, 'Coordinates must be array of 2 items.'],
    },

    country: {
        minLength: [1, 'Country must have at least 1 character.'],
        maxLength: [100, 'Country can\'t have more than 100 characters.'],
        required: [true, 'Country is required.'],
        type: String,
    },

    createdBy: {
        ref: 'User',
        required: [true, 'Created by is required.'],
        type: mongoose.Schema.Types.ObjectId,
    },

    name: {
        minLength: [1, 'Name must have at least 1 character.'],
        maxLength: [100, 'Name can\'t have more than 100 characters.'],
        required: [true, 'Name is required.'],
        type: String,
    },

    phoneNumber: {
        maxLength: [100, 'Phone number can\'t have more than 100 characters.'],
        type: String,
    },

    picture: {
        minLength: [1, 'Picture must have at least 1 character.'],
        maxLength: [500, 'Picture can\'t have more than 500 characters.'],
        type: String,
    },

    postalCode: {
        maxLength: [15, 'Postal code can\'t have more than 15 characters.'],
        type: String,
    },

    streetAddress: {
        minLength: [1, 'Street address must have at least 1 character.'],
        maxLength: [100, 'Street address can\'t have more than 100 characters.'],
        required: [true, 'Street address is required.'],
        type: String,
    },

}, options);

placeSchema.virtual('fullAddress').get(function () {
    return `${this.streetAddress} ${this.postalCode || ''} ${this.city} ${this.country}`;
});

export default mongoose.models.Place || mongoose.model('Place', placeSchema);