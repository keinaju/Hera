'use server';

import dbConnect from '@/lib/dbConnect.js';
import Place from '@/models/place.js';
import Product from '@/models/product.js';
import { verifySession } from '@/lib/session.js';

export async function deletePlace(id) {
    const { userId } = await verifySession();
    if (!userId) return;

    await dbConnect();

    // Delete all products referring to this place
    await Product.deleteMany({
        createdBy: userId,
        place: id,
    });
    
    await Place.deleteOne({
        createdBy: userId,
        _id: id,
    });

    return { message: 'Place was deleted.' };
}