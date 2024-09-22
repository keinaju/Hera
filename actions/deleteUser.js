'use server';

import dbConnect from '@/lib/dbConnect.js';
import Place from '@/models/place.js';
import Product from '@/models/product.js';
import User from '@/models/user.js';
import { verifySession } from '@/lib/session.js';

export async function deleteUser() {
    const { userId } = await verifySession();
    if (!userId) return;
    
    await dbConnect();

    // Delete all products and places referring to this user
    await Product.deleteMany({ createdBy: userId });
    await Place.deleteMany({ createdBy: userId });
    await User.deleteOne({ _id: userId });

    return { message: 'User and content was deleted.' };
}