'use server';

import { CreatePlaceSchema } from '@/lib/validation/place.js';
import dbConnect from '@/lib/dbConnect.js';
import Place from '@/models/place.js';
import { sendToBucket } from '@/lib/bucket.js';
import { verifySession } from '@/lib/session.js';

export async function createPlace(state, formData) {
    const { userId } = await verifySession();
    if (!userId) return;
    
    // Validate
    const validatedFields = CreatePlaceSchema.safeParse({
        city: formData.get('city'),
        country: formData.get('country'),
        name: formData.get('name'),
        latitude: Number(formData.get('latitude')),
        longitude: Number(formData.get('longitude')),
        phoneNumber: formData.get('phoneNumber'),
        postalCode: formData.get('postalCode'),
        streetAddress: formData.get('streetAddress'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    // Store to cloud
    const picture = formData.get('picture');
    let filename;
    if (picture.size > 0) {
        const extension = picture.name.split('.').pop();
        filename = `${Date.now()}.${extension}`;
        await sendToBucket(picture, filename);        
    }

    // Store to database
    const {
        name,
        streetAddress,
        postalCode,
        city,
        latitude,
        longitude,
        country,
        phoneNumber
    } = validatedFields.data;
    await dbConnect();
    const place = await Place.create({
        city,
        coordinates: [longitude, latitude],
        country,
        createdBy: userId,
        name,
        phoneNumber,
        picture: filename,
        postalCode,
        streetAddress,
    });

    return {
        message: 'Place was created.',
    };
}