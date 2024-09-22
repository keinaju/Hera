import countries from '@/common/countries.js';
import { z } from 'zod';

function isCountry(input) {
    return countries.includes(input);
}

function isNotZero(input) {
    return input != 0;
}

export const CreatePlaceSchema = z.object({
    city: z.string()
        .trim()
        .min(1, { message: 'City must contain at least 1 character.' })
        .max(100, { message: 'City can contain only 100 characters.' }),
    country: z.string()
        .refine(isCountry, { message: 'Country must be valid.' }),
    latitude: z.number()
        .safe()
        .gte(-90, { message: 'Latitude must be greater than or equal to -90.' })
        .lte(90, { message: 'Latitude must be less than or equal to 90.' })
        .refine(isNotZero, { message: 'Latitude can\'t be 0.' }),
    longitude: z.number()
        .safe()
        .gte(-180, { message: 'Longitude must be greater than or equal to -180.' })
        .lte(180, { message: 'Longitude must be less than or equal to 180.' })
        .refine(isNotZero, { message: 'Longitude can\'t be 0.' }),
    name: z.string()
        .trim()
        .min(1, { message: 'Name must contain at least 1 character.' })
        .max(100, { message: 'Name can contain only 100 characters.' }),
    phoneNumber: z.string()
        .trim()
        .max(50, { message: 'Phone number can contain only 50 characters.' }),
    postalCode: z.string()
        .trim()
        .max(15, { message: 'Postal code can contain only 15 characters.' }),
    streetAddress: z.string()
        .trim()
        .min(1, { message: 'Street address must contain at least 1 character.' })
        .max(100, { message: 'Street address can contain only 100 characters.' }),
});