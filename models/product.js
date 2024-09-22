import mongoose from 'mongoose';

function arrayLimit(array) {
    return array.length <= 10;
}

const productSchema = new mongoose.Schema({
    createdBy: {
        ref: 'User',
        required: [true, 'Created by is required.'],
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        minLength: [1, 'Title must have at least 1 character.'],
        maxLength: [200, 'Title can\'t have more than 200 characters.'],
        required: [true, 'Title is required.'],
        type: String,
    },
    picture: {
        minLength: [1, 'Picture must have at least 1 character.'],
        maxLength: [500, 'Picture can\'t have more than 500 characters.'],
        required: [true, 'Picture is required.'],
        type: String,
    },
    place: {
        ref: 'Place',
        required: [true, 'Place is required.'],
        type: mongoose.Schema.Types.ObjectId,
    },
    tags: {
        type: [String],
        validate: [arrayLimit, 'Can\'t have more than 10 tags.'],
    }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);