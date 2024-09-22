import dbConnect from '@/lib/dbConnect.js';
import Product from '@/models/product.js';
import { verifySession } from '@/lib/session';

// Return array of products from session data
export async function findProducts() {
    const { userId } = await verifySession();
    if (!userId) return null;

    await dbConnect();
    const products = await Product
        .find({ createdBy: userId })
        .exec();
    return products;
}