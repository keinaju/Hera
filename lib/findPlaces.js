import dbConnect from '@/lib/dbConnect.js';
import Place from '@/models/place.js';
import { verifySession } from '@/lib/session';

// Return array of places from session data
export async function findPlaces() {
    const { userId } = await verifySession();
    if (!userId) return null;

    await dbConnect();
    const places = await Place
        .find({ createdBy: userId })
        .select('name streetAddress postalCode city country picture')
        .exec();
    return places;
}