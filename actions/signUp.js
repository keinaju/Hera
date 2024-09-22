'use server';

import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect.js';
import { SignUpFormSchema } from '@/lib/validation/user';
import User from '@/models/user.js';

export async function signUp(state, formData) {
    // Validate
    const validatedFields = SignUpFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
    });
    
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    // Create user in database
    const { firstName, lastName, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
    });

    return {
        message: 'Sign up succeeded. Proceed to sign in.',
    };
}