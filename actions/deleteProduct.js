'use server';

import dbConnect from '@/lib/dbConnect.js';
import Product from '@/models/product';
import { verifySession } from '@/lib/session.js';

export async function deleteProduct(id) {
    const { userId } = await verifySession();
    if (!userId) return;

    await dbConnect();

    await Product.deleteOne({
        createdBy: userId,
        _id: id,
    });

    return { message: 'Product was deleted.' };
}