'use server';

import { Client } from "@googlemaps/google-maps-services-js";
const client = new Client();

export async function findLocation(userInput) {
    const args = {
        params: {
            key: process.env.GOOGLE_API_KEY,
            address: userInput,
        }
    };

    const gcResponse = await client.geocode(args);
    const response = gcResponse.data.results[0];
    if (!response) return;
    return {
        address: response.formatted_address,
        latitude: response.geometry.location.lat,
        longitude: response.geometry.location.lng,
    };
}