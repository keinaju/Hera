'use server';

import dbConnect from '@/lib/dbConnect';
import Place from '@/models/place.js';
import Product from '@/models/product.js';
import mongoose from 'mongoose';

async function findPlaces({ blacklist, latitude, longitude }) {
    // Convert strings to Mongoose ObjectIds
    blacklist = blacklist.map(id => new mongoose.Types.ObjectId(id));

    await dbConnect();
    const places = await Place.aggregate([
        {
            $geoNear: {
                distanceField: 'distance',
                near: [longitude || 0, latitude || 0],
                query: { _id: { $nin: blacklist } },
            }
        }
    ]).exec();

    for (const place of places) {
        // Find 0 to 3 random products
        const products = await Product.aggregate([
                { $match: { place: place._id } },
                { $sample: { size: 3 }, }
            ]).exec();
        
        place.mealPictures = products.map(product => product.picture);
    }
    
    const output = places.map(place => ({
        id: place._id.toString(),
        name: place.name,
        streetAddress: place.streetAddress,
        postalCode: place.postalCode,
        phoneNumber: place.phoneNumber,
        city: place.city,
        country: place.country,
        placePicture: place.picture,    
        mealPictures: place.mealPictures,
        distance: place.distance,
        points: Math.ceil(Math.random() * 500),
    }));

    return output;
}

// Respond to client with JSON array that represents places
// Blacklist defined by client prevents sending same places twice
export async function feedAction({ blacklist, latitude, longitude, userTags }) {
    latitude = Number(latitude);
    longitude = Number(longitude);
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        latitude = 0;
    }
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        longitude = 0;
    }

    let places = [];
    places = await findPlaces({ blacklist, latitude, longitude });

    if (!places) return [];

    return places;
}