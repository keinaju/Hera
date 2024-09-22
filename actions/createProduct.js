'use server';

import dbConnect from '@/lib/dbConnect.js';
import { CreateProductSchema } from '@/lib/validation/product.js';
import Product from '@/models/product.js';
import { sendToBucket } from '@/lib/bucket.js';
import { verifySession } from '@/lib/session';

export async function createProduct(state, formData) {
    const {userId} = await verifySession();
    if (!userId) return null;

    // Validate
    const fields = {
        place: formData.get('place'),
        title: formData.get('title'),
    };
    if (formData.get('tags')) {
        // Convert CSV to array
        fields.tags = formData.get('tags').split(',');
    }
    const validatedFields = CreateProductSchema.safeParse(fields);

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }
    
    // Store to cloud
    const picture = formData.get('picture');
    const extension = picture.name.split('.').pop();
    const filename = `${Date.now()}.${extension}`;
    await sendToBucket(picture, filename);

    // Store to database
    const { place, tags, title } = validatedFields.data;
    await dbConnect();
    const product = await Product.create({
        createdBy: userId,
        picture: filename,
        place,
        tags,
        title,
    });

    return {
        message: 'Product was created.',
    };
}