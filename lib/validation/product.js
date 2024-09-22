import { z } from 'zod';
import mongoose from 'mongoose';
import tags from '@/common/tags.js';

function isMongoId(input) {
    return mongoose.Types.ObjectId.isValid(input);
}

function isTag(input) {
    return tags.includes(input);
}

export const CreateProductSchema = z.object({
    title: z.string()
        .trim()
        .min(1, { message: 'Title must contain at least 1 character.' })
        .max(200, { message: 'Title can contain only 200 characters.' }),
    place: z.string()
        .refine(isMongoId, { message: 'Place must be valid.' }),
    tags: z.array(
            z.string().refine(isTag, { message: 'Tag must be valid.' })
        )
        .max(10, { message: 'Tags can contain only 10 items.' })
        .optional(),
    
    // picture
});